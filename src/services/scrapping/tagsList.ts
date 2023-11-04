import { Page } from 'puppeteer';

export const getTagsList = async (page: Page) => {
  const tagsSelector = await page.$$('[data-test-id="recipe-description-tag"]');
  const tagList = [];

  for (const tags of tagsSelector) {
    const childTags = await tags.$$('span');
    const tagsText = [];

    for (const childTag of childTags) {
      const tag = await page.evaluate((el) => el.textContent, childTag);
      tagsText.push(tag);
    }

    tagList.push(tagsText);
  }

  const mealTags = tagList
    .flat()
    .filter((tag) => tag !== '•')
    .map((tag) => tag as string);

  return mealTags;
};
