import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

export const {
  name,
  version,
  description,
  author,
  license,
} = pkg;

export { pkg };

export default {
  name,
  version,
  description,
  author,
  license,
};
