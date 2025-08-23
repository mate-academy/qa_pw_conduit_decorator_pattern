import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';

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
    const logger = Logger.getInstance();

    const startTime = Date.now();
    const result = await fn(...args);
    const endTime = Date.now();

    const duration = endTime - startTime;

    logger.info(`Function "${fn.name}" executed in ${duration}ms`);

    return result;
  };
}

export { expect } from '@playwright/test';
