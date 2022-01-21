const Mocha = require('mocha');

const path = require('path');
const fs = require('fs');

const { getTestFilePaths } = require('./getAllTest');

const triggerMochaTest = config => {

  return new Promise(async (resolve, reject) => {
    const mocha = new Mocha({
      parallel: true
    });

    // fetch the test files
    let testFilePaths;
    if (config.testFiles && config.testFiles.length) {
      testFilePaths = config.testFiles;
    } else {
      testFilePaths = await getTestFilePaths(config.testFolderPath); 
    };

    const constructedTestFolderPath = path.join(__dirname, '../', config.testFolderPath);

    const exactFilePaths = testFilePaths.map((testFilePath) => {
      if (testFilePath.includes('.js')) {
        return `${constructedTestFolderPath}/${testFilePath}`;
      } 
      return `${constructedTestFolderPath}/${testFilePath}.js`;
    });

    const timeStamp = +new Date();
    exactFilePaths.forEach((testFilePath) => {
      mocha.addFile(testFilePath);
    })
    mocha.cleanReferencesAfterRun(false);
    mocha.reporter('xunit', {
      output: `${config.reportFolderPath}/${timeStamp}-test.xunit.xml`
    });
    mocha
      .run(() => {
        exactFilePaths.forEach((testFilePath) => {
          delete require.cache[
            testFilePath
          ];
        })
      resolve();
      })
      .on('test', function(test) {
        console.log('Test started: ' + test.title);
      })
      .on('test end', function(test) {
        console.log('Test done: ' + test.title);
      })
      .on('pass', function(test) {
        console.log('Test passed');
      })
      .on('fail', function(test, err) {
        console.log('Test fail');
      })
      .on('end', function() {
        console.log('All done');
      });
  });
};



module.exports = triggerMochaTest;
