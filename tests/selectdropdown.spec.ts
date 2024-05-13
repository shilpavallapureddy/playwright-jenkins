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
    await page.goto("https://letcode.in/dropdowns");
});
test('Select a dropdown based on value', async () => {

    const fruitsDropDown = 'select#fruits';
    await page.locator(fruitsDropDown).selectOption("Banana")
    const msg = await page.$("div.notification.is-success");
    if (msg) {
        expect(await msg.textContent()).toContain("Banana");
    }

    await page.waitForTimeout(2000);
})

test("Select multiple", async () => {
    const heros = await page.$("#superheros");
    heros?.selectOption([
        { label: "Aquaman" }, { value: "bt" }, { index: 8 }
    ])
})
test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
    console.log('After tests');

})

test("Count of the select", async () => {
    const langdropdown= 'select#lang'
    const allOptions = await page.$$(langdropdown + ' > option');
    console.log(allOptions.length);
    for (const e of allOptions) {
        const text = await e.textContent();
        console.log(text);
        
    }
})  

test("get selected text", async () => {
        await page.selectOption("#country", "India");
        const text = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value)
        console.log(text);
        expect(text).toBe("India");
   

})
