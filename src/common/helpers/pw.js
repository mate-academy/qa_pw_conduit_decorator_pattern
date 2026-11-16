import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';
import { Logger } from '../logger/Logger';

const logger = Logger.getInstance(process.env.LOG_LEVEL);

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
    const label =
      typeof args[0] === 'string' ? args[0] : fn.name || 'anonymous function';

    const startTime = Date.now();
    try {
      return await fn.apply(this, args);
    } finally {
      const endTime = Date.now();

      logger.info(`"${label}" took ${endTime - startTime} ms`);
    }
  };
}

export { expect } from '@playwright/test';
