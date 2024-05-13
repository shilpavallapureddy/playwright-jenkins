import { test, expect, Browser, BrowserContext, Page, Locator, FrameLocator } from '@playwright/test'
import { log } from 'console';
import { webkit, chromium, firefox } from 'playwright'


let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
    console.log('Before tests');
    browser = await chromium.launch({
        headless: false
    });
    context = await browser.newContext()
    page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
});
test('general alert ', async () => {

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('I am an alert box!')
        await page.waitForTimeout(2000);
        await dialog.dismiss()
    })

    const f1: Locator = page.locator('xpath=//button[text()="Alert"]')
    await f1.click()
    await page.waitForTimeout(2000);
})

test('confirm alert', async () => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain('Press a button!')
        await page.waitForTimeout(2000);
        await dialog.dismiss()


    })
    const f2: Locator = page.locator('xpath=//button[text()="Confirm Box"]')
    await f2.click()
    await page.waitForTimeout(2000);
})

test('prompt alert', async () => {
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt')
        expect(dialog.message()).toContain('Please enter your name:')
        expect(dialog.defaultValue()).toContain('Harry Potter')
        await page.waitForTimeout(2000);
        await dialog.accept('shilpa')
    })
    const f3: Locator = page.locator('xpath=//button[text()="Prompt"]')
    await f3.click()
    await expect(page.locator('#demo')).toHaveText("Hello shilpa! How are you today?"

    )
    await page.waitForTimeout(3000);
})
test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
    console.log('After tests');

})
