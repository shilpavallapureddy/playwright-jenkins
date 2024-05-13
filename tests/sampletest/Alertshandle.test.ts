import {expect,chromium,test,Browser,BrowserContext,Page,Locator} from '@playwright/test'




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
        await page.goto("https://letcode.in/alert")
      });

    test("Handle dialogs", async () => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('prompt')
            expect(dialog.message()).toContain('Enter your name')
            await page.waitForTimeout(2000);
            await dialog.accept('shilpa')
            // dialog.dismiss()
        })
        
        const f3: Locator = page.locator("#prompt")
        await f3.click()

    })


    test.afterAll(async () => {
        await page.close()
        await context.close()
        await browser.close()
        console.log('After tests');
    })
