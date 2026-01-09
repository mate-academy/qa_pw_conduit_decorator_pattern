# Practice working with Decorator pattern

## Table of contents

- [Description](#description)
- [Preparation](#preparation)
- [Main Task](#main-task)
- [Task Reporting](#task-reporting)

## Description

In this task you will create the decorator function `decorateWithTiming`. in the  `src/common/helpers/pw.js` file. This decorator will wrap the `test.step` function and measure how long it takes to execute, then log the duration.

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

   - `npm ci`
   - `npx playwright install`

## Main Task

1. Open the `src/common/helpers/pw.js` file and familarize the code of the decorator functions `decorateWithUserId` & `decorateWithTitleFromFunction`;
2. Review the `src/ui/pages/BasePage.js` & `src/ui/components/BaseComponent.js` constuctors where the wrapped `this.step` is defined with the help of decorators. 
3. Create the decorator function `decorateWithTiming`. in the  `src/common/helpers/pw.js` file. 
- Decorator function accepts another function as input `(fn)`;
- Returns a new function that wraps original function and measure how long it takes to execute, then log the duration.
- Use `const startTime = Date.now();` and `const endTime = Date.now();` to log the start and end of the function execution. 
- User singleton logger instance `const logger = Logger.getInstance()`;
- Log the duration of the `fn` function execution with `logger.info()` method.
4. Decorate the `this.step` with new decorator function in the `src/ui/pages/BasePage.js` & `src/ui/components/BaseComponent.js` constructors.
5. Change the `LOG_LEVEL` to `info` in the `env/.env.staging` file.
6. Run the tests and make sure the logs with each step execution are present in the console.
7. Change the `LOG_LEVEL` back to `error` info in the `env/.env.staging` file.
8. Run the tests and make sure the logs with each step execution are NOT present in the console.


## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
