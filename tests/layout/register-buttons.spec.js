import { test, expect } from '@playwright/test';

test('Layout: register and go-to-login buttons are aligned horizontally', async ({ page }) => {
  await page.goto('https://demoqa.com/register');

  const registerButton = page.locator('#register');
  const goToLoginButton = page.locator('#gotologin');

  await registerButton.waitFor({ state: 'visible' });
  await goToLoginButton.waitFor({ state: 'visible' });

  const registerBox = await registerButton.boundingBox();
  const loginBox = await goToLoginButton.boundingBox();

  expect(registerBox).not.toBeNull();
  expect(loginBox).not.toBeNull();

  const registerY = registerBox.y;
  const loginY = loginBox.y;

  console.log('Register Y:', registerY);
  console.log('Login Y:', loginY);

  const difference = Math.abs(registerY - loginY);

  await registerButton.scrollIntoViewIfNeeded();
  await goToLoginButton.scrollIntoViewIfNeeded();

  await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';
  });

  await page.locator('.buttonWrap').screenshot({
    path: 'layout-buttons-misaligned.png'
  });

  expect(registerY).toBeCloseTo(loginY, 1);
});