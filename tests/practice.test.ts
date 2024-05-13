import { chromium, test, Browser, BrowserContext, Page, Locator, expect, } from '@playwright/test'
import path from 'path';

test('alert1', async () => {

    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' })
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage()
    await page.goto("https://letcode.in/dropdowns");

    await page.selectOption("#country", "Brazil");
    await page.waitForTimeout(3000)
    const text = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value)
    console.log(text);
    expect(text).toBe("Brazil");
    



})


test('alert2', async () => {

    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' })
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage()
    await page.goto("https://letcode.in/alert")

    const confirmalert = page.locator('#prompt')
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt')
        expect(dialog.message()).toBe('Enter your name')
        await page.waitForTimeout(2000);
        dialog.dismiss()


    })
    await confirmalert.click()
    await page.close();
    await context.close();
    await browser.close();

})