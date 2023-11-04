export const getPrepTime = async (page) => {
  return await page.evaluate(() => {
    const recipeDescriptionElement = document.querySelector('[data-test-id="recipe-description"]');
    const allSpans = recipeDescriptionElement?.querySelectorAll('div div span');

    if (!allSpans) {
      return [];
    }

    const filteredSpans = Array.from(allSpans).filter((span) => {
      const text = span.textContent;
      if (!text) {
        return;
      }
      return /\d+ minutes/.test(text);
    });

    let totalMinutes = 0;
    filteredSpans.forEach((span) => {
      const text = span.textContent;
      if (!text) {
        return;
      }
      const minutesMatch = text.match(/(\d+) minutes/);
      if (minutesMatch) {
        totalMinutes += parseInt(minutesMatch[1], 10);
      }
    });

    return `${totalMinutes} minutes`;
  });
};
