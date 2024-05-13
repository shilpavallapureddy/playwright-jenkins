import { test, expect, Browser, Page, Locator, FrameLocator, BrowserContext } from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

test('No Incognito test', async () => {
    //incognito mode
    const browser: BrowserContext = await chromium.launchPersistentContext('', { headless: false, channel: 'chrome' });
    //an extra unncecessary problem one is default and actual test page
    //const page1:Page= await browser.newPage()
    const pages = browser.pages();//2- 0 to 1
    console.log('pages are',pages.length)
    const page: Page = pages[0];
    //enter the url
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    const emailId: Locator = page.locator('#input-email');
    const password: Locator = page.locator('#input-password');
    await page.waitForTimeout(3000);

})