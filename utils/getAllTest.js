const fs = require('fs');
const path = require('path');

// get all the reports
const getTestFilePaths = (testFolderPath) => {
  return new Promise((resolve, reject) => {
    const REPORT_DIR_PATH = path.join(__dirname, '../', testFolderPath);
    
    fs.readdir(REPORT_DIR_PATH, function(err, files) {
      if (err) {
        return reject(err)
      }
      console.log(files, ' files printed here')
      resolve(files);
    })
  })
};

module.exports = {
  getTestFilePaths
};
