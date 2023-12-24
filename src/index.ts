import { Plugin } from 'vite';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { Options } from './types';

const biomePlugin = (options: Options = {lintPath: "."}): Plugin => {
  return {
    name: 'vite-plugin-biome',
    buildStart() {
      // Get the directory name of the current module
      const __dirname = path.dirname(fileURLToPath(import.meta.url));

      // Construct the path to the local biome installation
      const biomePath = path.resolve(__dirname, '..', 'node_modules', '.bin', 'biome');
      const lintPath = options.lintPath;

      // Use the local biome command
      exec(`${biomePath} lint ${lintPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return;
        }
        console.log(`Biome Linter Output:\n${stdout}`);
      });
    },
  };
};

export default biomePlugin;

