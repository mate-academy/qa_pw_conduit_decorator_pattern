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

export function decorateWithTiming(decoratedFn) {
  return async function (...args) {
    const logger = Logger.getInstance();
    const startTime = Date.now();

    try {
      return await decoratedFn.apply(this, args);
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
