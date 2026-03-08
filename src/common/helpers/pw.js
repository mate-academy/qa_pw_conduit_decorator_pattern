import { camelCaseToPhrase, capitalize } from '../helpers/stringHelpers';
import { Logger } from '../helpers/logger';

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

// Новый декоратор
export function decorateWithTiming(fn) {
  return async function (title, stepToRun) {
    const startTime = Date.now();
    const result = await fn(title, stepToRun);
    const endTime = Date.now();
    const logger = Logger.getInstanse();
    logger.info(`[Timing] "${title}" executed in ${endTime - startTime}ms`);
    return result;
  };
}

export { expect } from '@playwright/test';
