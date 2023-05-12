import express from 'express';
import death from 'death';
import bunyan from 'bunyan';
import expressBunyan from 'express-bunyan-logger';
import cors from 'cors';
import { Server } from 'http';
import bodyParser from 'body-parser';
import config from '#src/config';
import BackExplorer from '#src/class/BackExplorer';
import Emulator from '#src/class/Emulator';
import { pkg } from '#src/package';

const app = express();
const appServer = Server(app);

const logConfig = {
  name: pkg.name,
  streams: [{ level: 'debug', stream: process.stdout }],
};

const expressLogger = expressBunyan(logConfig);
const expressErrorLogger = expressBunyan.errorLogger(logConfig);
const log = bunyan.createLogger(logConfig);
const info = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
};

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.json({ limit: '50Mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLogger);
app.use('/', express.static('static'));

const backExplorer = new BackExplorer(config.folder);

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(info);
});

app.get('/folder', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  backExplorer.getSorting().then((items) => {
    res.send(JSON.stringify(items));
  });
});

app.get('/emulators', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const emulators = Emulator.getEmulators();
  res.send(JSON.stringify(emulators));
});

app.get('/emulators/kill', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  Emulator.killAll()
    .finally(() => {
      res.sendStatus(200);
    });
});

app.post('/run', (req, res) => {
  Emulator.run(req.body.emulator, req.body.file)
    .catch(() => {
      res.sendStatus(500);
    });
  res.sendStatus(200);
});

app.post('/folder', (req, res) => {
  backExplorer.setCurrentPath(req.body.folder);
  backExplorer.getSorting().then((items) => {
    res.send(JSON.stringify(items));
  });
});

app.use((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendStatus(404);
});

app.use(expressErrorLogger);

appServer.listen(config.port, () => { log.info('Backend started on PORT:', config.port); });
death(() => { appServer.close(); });
