import { Page } from 'puppeteer';

export const getPrepTime = async (page: Page) => {
  const prepTime = await page.evaluate(() => {
    const recipeDescriptionElement = document.querySelector('[data-test-id="recipe-description"]');
    const allSpans = recipeDescriptionElement?.querySelectorAll('div div span');

    if (!allSpans) {
      return null; // Return null when no valid prep time is found
    }

    const filteredSpans = Array.from(allSpans).filter((span) => {
      const text = span.textContent;
      if (!text) {
        return false;
      }
      return /\d+ minutes/.test(text);
    });

    let totalMinutes = 0;
    filteredSpans.forEach((span) => {
      const text = span.textContent;
      if (text) {
        const minutesMatch = text.match(/(\d+) minutes/);
        if (minutesMatch) {
          totalMinutes += parseInt(minutesMatch[1], 10);
        }
      }
    });

    return totalMinutes > 0 ? `${totalMinutes} minutes` : null; // Return null when no valid prep time is found
  });

  return prepTime;
};
