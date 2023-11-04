export const getKCal = async (page) => {
  return await page.evaluate(() => {
    const itemsPerServingElement = document.querySelector('[data-test-id="items-per-serving"]');
    const spanElements = itemsPerServingElement?.querySelectorAll('div span');

    if (!spanElements) {
      return '';
    }

    let kcalValue = '';

    spanElements.forEach((span) => {
      const text = span.textContent;

      if (text?.includes('kcal')) {
        kcalValue = text;
      }
    });

    return kcalValue;
  });
};
