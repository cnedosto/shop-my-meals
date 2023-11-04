import { getIngredients } from '@/services/scrapping/ingredients';
import { getKCal } from '@/services/scrapping/kCal';
import { getMealImage } from '@/services/scrapping/mealImage';
import { getMealName } from '@/services/scrapping/mealName';
import { getPrepTime } from '@/services/scrapping/prepTime';
import { getTagsList } from '@/services/scrapping/tagsList';
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

type Data = {
  title: string;
  image: string;
  ingredients: { quantity: string; ingredient: string | null; imgSrc: string | null }[];
  tags: string[];
  prepTime: string | null;
  kCal: string | null;
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

    const title = await getMealName(page);
    const image = await getMealImage(page);
    const ingredients = await getIngredients(page);
    const tags = await getTagsList(page);
    const prepTime = await getPrepTime(page);
    const kCal = await getKCal(page);

    await browser.close();

    return {
      title: title || '',
      image: image || '',
      ingredients: ingredients.map((ingredient) => ({
        quantity: ingredient.quantity,
        ingredient: ingredient.ingredient || '',
        imgSrc: ingredient.imgSrc || '',
      })),
      tags,
      prepTime: prepTime || '',
      kCal: kCal || '',
    };
  })();

  if (scrappedData) {
    res.status(200).json(scrappedData);
  } else {
    res.status(500).json({ error: 'Failed to scrape data' } as unknown as Data);
  }
}
