import { test, expect } from '@playwright/test';

test('Login: should show error for invalid credentials', async ({ page }) => {
  await page.goto('https://demoqa.com/login');

  const username = page.locator('#userName');
  const password = page.locator('#password');
  const loginButton = page.locator('#login');
  const errorMessage = page.locator('#name');
  const form = page.locator('#userForm');

  await expect(username).toBeVisible();
  await expect(password).toBeVisible();

  await username.fill('wronguser');
  await password.fill('wrongpass123');
  await loginButton.click();

  await expect(errorMessage).toHaveText('Invalid username or password!');
  await expect(page).toHaveURL(/login/);

  await expect(form).toHaveScreenshot('login-error.png');
});
