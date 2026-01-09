import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';
import Logger from '../logger/Logger.js';

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
    const logger = Logger.getInstance();
    const startTime = Date.now();

    try {
      return await fn(title, stepToRun);
    } finally {
      const endTime = Date.now();

      const duration = endTime - startTime;

      logger.info(`Step "${title}" executed in ${duration} ms`);
    }
  };
}
export { expect } from '@playwright/test';
