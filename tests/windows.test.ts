import { test, expect, Browser, BrowserContext, Page,chromium } from '@playwright/test'

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
    await page.goto("https://letcode.in/windows")
});
test('single window ', async () => {

    const [newWindoW] = await Promise.all([
            context.waitForEvent('page'),
            await page.click('#home')
        ])
        await newWindoW.waitForLoadState();
        expect(newWindoW.url()).toContain("test")
        await newWindoW.click('"Log in"');
        await newWindoW.waitForNavigation();
        expect(newWindoW.url()).toContain("signin");
        await page.bringToFront()
        await page.locator("text=Watch tutorial").click()
})

test("Multipage handling", async () => {
    const [multipage] = await Promise.all([
        context.waitForEvent("page"),
        await page.click("#multi")
    ])
    await multipage.waitForLoadState();
    //const allwindows = page.context().pages();
    const allwindows = multipage.context().pages();
    console.log("no.of windows: " + allwindows.length);
    allwindows.forEach(page => {
        console.log(page.url());
    });
    await page.waitForTimeout(2000)
    await allwindows[1].bringToFront();
    allwindows[1].on("dialog", (dialog) => {
        console.log('Message: ' + dialog.message());
        dialog.accept();
    })
    await allwindows[1].click("id=accept")
    await page.waitForTimeout(2000)

    await allwindows[2].bringToFront();
    const fruitsDropDown = 'select#fruits';
    await allwindows[2].locator(fruitsDropDown).selectOption("Banana")
    const msg = await page.$("div.notification.is-success");
    if (msg) {
        expect(await msg.textContent()).toContain("Banana");
    }
    await page.waitForTimeout(2000);
    await allwindows[0].bringToFront();
    expect(allwindows[0].url()).toContain("windows")

})

test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
    console.log('After tests');

})
