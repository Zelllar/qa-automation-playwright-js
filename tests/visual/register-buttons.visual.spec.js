import { test, expect } from '@playwright/test';

test('Visual: register buttons layout regression', async ({ page }) => {
  await page.goto('https://demoqa.com/register');

  const buttonsContainer = page.locator('.buttonWrap');
  await buttonsContainer.scrollIntoViewIfNeeded();

  // ИСКУССТВЕННО ЛОМАЕМ ВЁРСТКУ
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('.buttonWrap button');
    buttons.forEach(btn => {
      btn.style.marginTop = '20px';
    });
  });

  await expect(buttonsContainer).toHaveScreenshot('register-buttons.png');
});