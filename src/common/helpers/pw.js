import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';
import { Logger } from '../logger/Logger';



export function decorateWithUserId(fn, userId = 0) {
  return async function (title, stepToRun) {
    let stepTitle = title;

    if (userId > 0) {
      stepTitle = `User${userId}: ${title}`;
    }

    return await fn(stepTitle, stepToRun);
  };
}

export function decorateWithTitleFromFunction(fn) {
  return async function (functionName, stepToRun) {
    const stepTitle = capitalize(camelCaseToPhrase(functionName));

    return await fn(stepTitle, stepToRun);
  };
}

export function decorateWithTiming(decoratedFn) {
  return async function(functionName, stepToRun) {
    const logger = Logger.getInstance();
    const startTime = Date.now();
    await decoratedFn(functionName, stepToRun);
    const endTime = Date.now();
    const executeFunctionTime = endTime - startTime;
    logger.info(
      `Finished step: "${functionName}" in ${executeFunctionTime} time`
    );
  }
}




export { expect } from '@playwright/test';
