### Trigger Mocha tests programmatically
This package allows you to run your Mocha tests programmatically, without any human intervention..

### Features
* Allows triggering mocha tests programmatically
* Supports parallel mode of execution
* Allows testing single/multiple files or entire folder which needs to be tested
* Reports are generated in xml format

### Usage

1. Add `trigger-mocha-tests` to your project

```
npm install trigger-mocha-tests --save
```
2. Tell the runner, about the test folder path or files and the reports folder path inside a `.js` file

**Note:Specifying the testFiles is optional, if not specified will pick all the files under the test folder**

```
const triggerMochaTest = require("trigger-mocha-tests");

const config = {
  reportFolderPath: './reports',
  testFolderPath: './tests',
  testFiles: ['test1', 'test2']
};

triggerMochaTest(config);
```
3. Finally, run your tests with the below command

```
node <fileName>
```

### Output 
Output in the terminal would show the status of test, and reports would be stored in `.xml` within the `reports` folder.
