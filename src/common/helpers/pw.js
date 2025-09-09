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

export function decorateWithTiming(decoratedFn) {
  return async function (...args) {
    const startTime = Date.now();
    let result;
    try {
      result = await decoratedFn.apply(this, args);
      return result;
    } finally {
      const endTime = Date.now();
      const executeFunctionTime = endTime - startTime;
      logger.info(
        `Execute function time: ${
          executeFunctionTime} ms`
      );
    }
  };
}




export { expect } from '@playwright/test';
