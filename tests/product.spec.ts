import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import * as dotenv from 'dotenv';

dotenv.config();
test('can create product', async ({ page }) => {
    const randomTitle = faker.color.human() + ' ' + faker.animal.type() + ' spotted in ' + faker.location.city();
    const randomAbstract = faker.lorem.paragraphs({ min: 1, max: 3 });
    const randomDOI = faker.number.int({ max: 999 }) + '.' + faker.number.int({ max: 999 }) + '.' + faker.number.int({ max: 999 });
    // login
    await page.goto('https://login.microsoftonline.com/7687313d-2aa3-4d92-87ce-6bfad84a5f9f/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAAGWk5ehBgBHvjksADTqOFvtJL3LN8VQ63DFFECGDN_yBelF2puL3LlLYOQUaFQenjwEAAAABAAAACS5yZWRpcmVjdFlodHRwczovL29yZ2RmNDMyODkxLmNybS5keW5hbWljcy5jb20vbWFpbi5hc3B4P2FwcGlkPThiZWQzOTQ5LWY2NDUtZWYxMS1hMzE2LTYwNDViZDA0NzQ2Mg%26RedirectTo%3DMAAAAGWk5ehBgBHvjksADTqOFvtYN6K2KAOU7nqsGXHH%252bMV1JeoXVL6rjg9Ao5WvNHWCM2h0dHBzOi8vb3JnZGY0MzI4OTEuY3JtLmR5bmFtaWNzLmNvbS8%253d%26RedirectToForMcas%3Dhttps%253a%252f%252forgdf432891.crm.dynamics.com%252fmain.aspx%253fappid%253d8bed3949-f645-ef11-a316-6045bd047462&response_mode=form_post&nonce=638575289284249704.NGMxMzE2M2ItYjVkYS00ZGRhLWE0YWUtNDQ2NjE3MjY0OGIzNDEwZWYyMzktNzdlMS00NDgxLWE0NzMtYzIwMWE0YzRiMWI4&redirect_uri=https%3A%2F%2Fby2--namcrmlivesg741.crm.dynamics.com%2F&max_age=86400&x-client-SKU=ID_NET472&x-client-ver=7.5.0.0');
    await page.goto('https://login.microsoftonline.com/7687313d-2aa3-4d92-87ce-6bfad84a5f9f/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAAGWk5ehBgBHvjksADTqOFvtJL3LN8VQ63DFFECGDN_yBelF2puL3LlLYOQUaFQenjwEAAAABAAAACS5yZWRpcmVjdFlodHRwczovL29yZ2RmNDMyODkxLmNybS5keW5hbWljcy5jb20vbWFpbi5hc3B4P2FwcGlkPThiZWQzOTQ5LWY2NDUtZWYxMS1hMzE2LTYwNDViZDA0NzQ2Mg%26RedirectTo%3DMAAAAGWk5ehBgBHvjksADTqOFvtYN6K2KAOU7nqsGXHH%252bMV1JeoXVL6rjg9Ao5WvNHWCM2h0dHBzOi8vb3JnZGY0MzI4OTEuY3JtLmR5bmFtaWNzLmNvbS8%253d%26RedirectToForMcas%3Dhttps%253a%252f%252forgdf432891.crm.dynamics.com%252fmain.aspx%253fappid%253d8bed3949-f645-ef11-a316-6045bd047462&response_mode=form_post&nonce=638575289284249704.NGMxMzE2M2ItYjVkYS00ZGRhLWE0YWUtNDQ2NjE3MjY0OGIzNDEwZWYyMzktNzdlMS00NDgxLWE0NzMtYzIwMWE0YzRiMWI4&redirect_uri=https%3A%2F%2Fby2--namcrmlivesg741.crm.dynamics.com%2F&max_age=86400&x-client-SKU=ID_NET472&x-client-ver=7.5.0.0&sso_reload=true');
    await page.getByPlaceholder('Email, phone, or Skype').click();
    await page.getByPlaceholder('Email, phone, or Skype').fill(process.env.USER_ID || 'USER_ID');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD || 'USER_PASSWORD');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.goto('https://orgdf432891.crm.dynamics.com/main.aspx?appid=8bed3949-f645-ef11-a316-6045bd047462');
    await page.getByRole('tab', { name: 'Copilot' }).click();
    // create a new product
    await page.getByLabel('New', { exact: true }).click();
    await page.waitForTimeout(2000);
    // fill out form
    await page.getByLabel('DOI').click();
    await page.getByLabel('DOI').fill(randomDOI);
    await page.getByLabel('Rich Text Editor Control iris_product iris_title').getByRole('paragraph').click();
    await page.getByLabel('Rich Text Editor Control iris_product iris_title').getByRole('paragraph').fill(randomTitle);
    await page.getByLabel('Rich Text Editor Control iris_product iris_abstract').getByRole('paragraph').click();
    await page.getByLabel('Rich Text Editor Control iris_product iris_abstract').getByRole('paragraph').fill(randomAbstract);
    await page.waitForTimeout(2000);
    await page.getByLabel('Save (CTRL+S)').click();
    await page.waitForTimeout(2000);
    // view created product in list
    await page.getByLabel('Press Enter to go back.').click();
    await page.waitForTimeout(2000);
    await expect(page.getByLabel(randomTitle)).toBeVisible();
    // cleanup created product
    await page.getByLabel('Products Active Products').getByText('').last().click();
    await page.getByLabel('More commands for Product').click();
    await page.getByLabel('Delete these Products. This').click();
    await page.getByRole('button', { name: 'Delete' }).click();
});
