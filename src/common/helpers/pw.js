import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';
import { Logger } from '../logger/Logger';

const logger = Logger.getInstance();

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
  return async function (...args) {
    const startTime = Date.now();
    try {
      const result = await fn.apply(this, args);
      return result;
    } finally {
      const endTime = Date.now();
      const duration = endTime - startTime;
      logger.info(`[Timing] executed in ${duration} ms`);
    }
  };
}

export { expect } from '@playwright/test';
