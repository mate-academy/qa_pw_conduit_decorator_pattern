import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';
export { expect } from '@playwright/test';
export { Logger } from '../logger/Logger';


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


export function decorateWithTiming(fn, Logger) {
  const logger = Logger.getInstance();
  return async function (title, stepToRun) {
    const startTime = Date.now();

    const result = await fn(title, stepToRun);

    const endTime = Date.now();
    const duration = endTime - startTime;

    logger.info(`Step "${title}" took ${duration} ms`);

    return result;
  };

}