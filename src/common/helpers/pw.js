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
  return async function (title, stepToRun) {
    const logger = Logger.getInstance(process.env.LOG_LEVEL);
    const startTime = Date.now();
    const result = await fn(title, stepToRun);
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    logger.info(`${title} (Execution time: ${executionTime} ms)`);
    return result;
  };
}

export { expect } from '@playwright/test';
