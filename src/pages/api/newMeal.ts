import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

type Data = {
  title: string;
  image: string;
  ingredients: { quantity: string; ingredient: string; imgSrc: string }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { url } = req.body;

  let scrappedData = null;

  scrappedData = await (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(`${url}?locale=fr-BE`);

    await page.setViewport({ width: 1080, height: 1024 });
    await page.click('button[aria-label="2"]');

    const title = await page.waitForSelector('h1');
    const fullTitle = await title?.evaluate((el) => el.textContent);

    const recipeImageSelector = await page.waitForSelector('[data-test-id="recipe-hero-image"]');
    const recipeImage = await recipeImageSelector?.$('img');
    const recipeImageSrc = await recipeImage?.evaluate((el) => el.getAttribute('src'));

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

    await browser.close();

    return {
      title: fullTitle,
      image: recipeImageSrc,
      ingredients: ingredientList,
    };
  })();

  if (scrappedData && scrappedData.title) {
    const ingredients = scrappedData.ingredients.map((ingredient) => ({
      ...ingredient,
      ingredient: ingredient.ingredient ?? '',
      imgSrc: ingredient.imgSrc ?? '',
    }));

    res.status(200).json({
      title: scrappedData.title ?? '',
      image: scrappedData.image ?? '',
      ingredients,
    });
  } else {
    res.status(500).json({ error: 'Failed to scrape data' } as unknown as Data);
  }
}
