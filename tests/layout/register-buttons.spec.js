import { test, expect } from '@playwright/test';

test.describe('Layout bug validation', () => {
  test('BUG: register and login buttons are not aligned vertically', async ({ page }) => {
    await page.goto('https://demoqa.com/register');

    const registerButton = page.locator('#register');
    const loginButton = page.locator('#gotologin');
    const buttonsWrapper = page.locator('.buttonWrap');

    await expect(registerButton).toBeVisible();
    await expect(loginButton).toBeVisible();

    const registerBox = await registerButton.boundingBox();
    const loginBox = await loginButton.boundingBox();

    expect(registerBox).not.toBeNull();
    expect(loginBox).not.toBeNull();

    expect(Math.abs(registerBox.y - loginBox.y)).toBeLessThan(2);

    await expect(buttonsWrapper).toHaveScreenshot('register-buttons-misalignment.png');
  });
});
