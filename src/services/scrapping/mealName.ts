import { Page } from 'puppeteer-core';

export const getMealName = async (page: Page) => {
  const title = await page.waitForSelector('h1');
  const fullTitle = await title?.evaluate((el) => el.textContent);

  if (!fullTitle) {
    return '';
  }

  return fullTitle;
};
