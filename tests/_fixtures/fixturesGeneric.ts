import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';
import { UserFactory } from '../../src/factoryItems/UserFactory';

export const test = base.extend<
  {
    usersNumber;
    contextsNumber;
    pages;
    user;
    users;
    infoTestLog;
    addAllureTestHierarchy;
  },
  {
    logger;
  }
>({
  usersNumber: [1, { option: true }],
  contextsNumber: [1, { option: true }],
  pages: async ({ browser, contextsNumber }, use) => {
    let pages = Array(contextsNumber);

    for (let i = 0; i < contextsNumber; i++) {
      const context = await browser.newContext();

      pages[i] = await context.newPage();
    }
    await use(pages);
  },
  user: async ({ factories }, use) => {
    const user = factories.user.generateUser();

    await use(user);
  },
  users: async ({ factories, usersNumber }, use) => {
    const users = Array(usersNumber);
    const userFactory = factories.user;

    for (let i = 0; i < usersNumber; i++) {
      users[i] = userFactory.generateUser();
    }

    await use(users);
  },
  logger: [
    async ({}, use) => {
      const logger = new Logger(process.env.LOG_LEVEL);

      await use(logger);
    },
    { scope: 'worker' },
  ],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const normalizedFile = testInfo.file.replaceAll('\\', '/');
      const indexOfTestSubfolderStart =
        normalizedFile.indexOf('/tests') + 7;
      const fileName = normalizedFile.substring(indexOfTestSubfolderStart);

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
});
