'use strict';

const path = require('path');
const minimist = require('minimist');
const fse =require('fs-extra')

const argv = minimist(process.argv.slice(2));
function getRunConfig() {
  return new Promise((resolve, reject) => {
    console.log('argv',argv)
    if (argv.config) {
      const configPath = path.resolve(process.cwd(), typeof argv.config === 'string' ? argv.config : "proxy.config.js");
      
      fse
        .stat(configPath)
        .then(
          stat => {
            const isFile = stat.isFile();
            if (isFile) {
              return configPath;
            } else {
              reject('配置文件不存在');
              process.exit(1);
            }
          },
          err => {
            console.log('配置路径不存在', err);
          }
        )
        .then(path => {
          resolve(require(path));
        });
    } else {
      resolve({})
    }
  })

}
module.exports = getRunConfig;
