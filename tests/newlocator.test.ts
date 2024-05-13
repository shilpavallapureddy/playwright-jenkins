import {test, expect, Browser, Page, Locator, FrameLocator, BrowserContext} from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

test('Aria Role locator test', async () => {

    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
     const page: Page = await browser.newPage();
     await page.goto("https://bookcart.azurewebsites.net/");
     await page.getByText('Login').first().click();
     await page.getByLabel('Username').fill('ortoni')
     await page.getByPlaceholder('Password').fill('pass1234')
     await page.locator("//span[text()='Login']").click()
     await page.getByPlaceholder('Search books or authors').fill('the hate u give')
     const options=page.getByRole('option')
     options.getByText('The Hate U Give').click()
     await page.getByAltText('Book cover image').click()

    await page.waitForTimeout(3000);
})