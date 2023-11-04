import { Page } from 'puppeteer';

export const getIngredients = async (page: Page) => {
  const ingredientsSelector = await page.$$('[data-test-id="ingredient-item-shipped"]');
  const ingredientList = [];

  for (const ingredients of ingredientsSelector) {
    const childElements = await ingredients.$$('p');
    const imgElement = await ingredients.$('img');
    const imgSrc = await imgElement?.evaluate((el) => el.getAttribute('src'));

    let quantity = null;

    for (const child of childElements) {
      const text = await page.evaluate((child) => child.textContent, child);

      if (!quantity) {
        quantity = text;
      } else {
        const ingredient = text;
        ingredientList.push({ quantity, ingredient, imgSrc });
        quantity = null;
      }
    }
  }

  return ingredientList;
};
