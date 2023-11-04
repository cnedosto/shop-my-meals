export const getMealName = async (page) => {
  const title = await page.waitForSelector('h1');
  const fullTitle = await title?.evaluate((el) => el.textContent);

  return fullTitle;
};
