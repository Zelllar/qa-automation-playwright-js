import { test, expect } from '@playwright/test';

test.describe('API Login Tests', () => {

  const baseURL = 'https://demoqa.com';

  test('Successful login returns token', async ({ request }) => {
    const response = await request.post(`${baseURL}/Account/v1/Login`, {
      data: {
        userName: 'demoUser',
        password: 'Demo@123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Successful login response:', body);

    expect(body).toHaveProperty('token');
  });

});