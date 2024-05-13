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
    await page.goto("https://letcode.in/frame")
});
test.skip("Interact with frames", async () => {
    const frame = page.frame({ name: "firstFr" });
    // frame?.fill("")
    if (frame != null) {
        await frame.fill("input[name='fname']", "Shilpa");
        await frame.fill("input[name='lname']", "Reddy");

        // inner frame
        const frames = frame.childFrames();
        console.log('No. of inner frames: ' + frames.length);
        if (frames != null)
            await frames[1].fill("input[name='email']", "koushik@mail.com")
        else {
            console.log("Wrong frame");
        }
        const parent = frames[1].parentFrame()
        await page.waitForTimeout(2000)
        await frame.fill("input[name='lname']", "Letcode");
        await page.waitForTimeout(2000)
        await parent?.fill("input[name='lname']", "Youtube");
        await page.waitForTimeout(2000)


    } else throw new Error("No such frame")
})
test.skip("Interact with New frame API", async () => {

    const frame = page.frameLocator("#firstFr");
    await frame.locator("input[name='fname']").fill("Shilpa");
    await frame.locator("input[name='lname']").fill("Reddy");
    const text = await frame.locator("p.title.has-text-info").textContent();
    console.log(text);
});

test("Inner frame", async () => {
    const frame = page.frameLocator("#firstFr");
    const innerFrame = frame.frameLocator("iframe.has-background-white");
    await page.waitForTimeout(2000)
    await innerFrame.locator("input[name='email']").fill("dshilpareddy92@gmail.com")
    await page.waitForTimeout(2000)
    await frame.locator("input[name='fname']").fill("shilpa");
    await page.waitForTimeout(2000)
    await page.click("'Log in'");
})

test.afterAll(async () => {
    await page.close()
    await context.close()
    await browser.close()
    console.log('After tests');

})
