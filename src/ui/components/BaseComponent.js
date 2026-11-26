import {
  decorateWithUserId,
  decorateWithTitleFromFunction,
  decorateWithTiming,
} from '../../common/helpers/pw';
import { test } from '@playwright/test';

export class BaseComponent {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.step = decorateWithTiming(test.step);
    this.step = decorateWithUserId(this.step, this.userId);
    this.step = decorateWithTitleFromFunction(this.step);
  }
}
