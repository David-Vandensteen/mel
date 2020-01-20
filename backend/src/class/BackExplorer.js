// import { log, error } from 'console';
import { promises as fs, lstatSync } from 'fs';
import path from 'path';

export default class BackExplorer {
  constructor(fullPath) {
    this.setCurrentPath(fullPath);
  }

  setCurrentPath(fullPath) {
    this.currentPath = fullPath;
  }

  getCurrentPath() {
    return this.currentPath;
  }

  get() {
    return new Promise((resolve) => {
      fs.readdir(this.currentPath)
        .then((readdirs) => {
          const response = [];
          readdirs.forEach((readdir) => {
            const fullPath = path.join(this.currentPath, readdir);
            const stat = lstatSync(fullPath);
            if (stat.isFile()) response.push({ name: readdir, path: fullPath, directory: false });
            if (stat.isDirectory()) response.push({ name: readdir, path: fullPath, directory: true });
          });
          resolve(response);
        });
    });
  }
}
