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
    await page.goto("https://letcode.in/elements")
});
test('multiple elements ', async () => {
    const ele = await page.locator('input[name=username]')
    await ele.fill('ortonikc')
    await ele.press('Enter')
    await page.waitForSelector('app-gitrepos li')
    const repos = await page.$$('app-gitrepos li')
    console.log(repos.length)
    /*for await (const repo of repos) {
        console.log(await repo.innerText())  
    }*/
     const allurls=  await Promise.all(repos.map(async (repo, i) =>{
        return await repo.innerText()
     }))
     console.log(allurls)
})

test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
    console.log('After tests');

})
