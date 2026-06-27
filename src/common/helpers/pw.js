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

export function decorateWithTiming(fn) {
  return async function (stepTitle, stepToRun) {
    const startTime = Date.now();
    const logger = Logger.getInstanse(process.env.LOG_LEVEL);
    
    const result = fn.apply(stepTitle, stepToRun);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    logger.info(`Execution time: ${duration}ms`);

    return await result;
  }
}

export { expect } from '@playwright/test';
