import { Page } from 'puppeteer-core';

export const getMealImage = async (page: Page) => {
  const recipeImageSelector = await page.waitForSelector('[data-test-id="recipe-hero-image"]');
  const recipeImage = await recipeImageSelector?.$('img');
  const recipeImageSrc = await recipeImage?.evaluate((el) => el.getAttribute('src'));

  if (!recipeImageSrc) {
    return '';
  }

  return recipeImageSrc;
};
