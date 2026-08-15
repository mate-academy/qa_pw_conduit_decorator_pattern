import { camelCaseToPhrase, capitalize } from './stringHelpers';
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
    return async function (functionName, stepToRun) {
      const logger = Logger.getInstanse();
      const startTime = Date.now();
      const stepTitle = capitalize(camelCaseToPhrase(functionName));
      const result = await fn(stepTitle, stepToRun);
      const endTime = Date.now();
      logger.info(`Step "${stepTitle}" took ${endTime - startTime}ms`);
      return result;
    }
}

export { expect } from '@playwright/test';
