
import { test, expect, Browser, Page, Locator, FrameLocator } from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'


test('drag and drop 1', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();
    await page.goto("https://letcode.in/dropable")
    //single:
    await page.locator('#draggable').dragTo(page.locator('#droppable'))

    await page.waitForTimeout(3000);

});
test('drag and drop 2', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();
    await page.goto("https://letcode.in/dropable")

    await page.locator('#draggable').hover();
    await page.mouse.down();
    await page.locator('#droppable').hover();
    await page.mouse.up();

    await page.waitForTimeout(3000);

})

test('doublic click ', async () => {

    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    const f1:Locator = page.locator('#field1')
     await f1.fill('shilpa')
    let text= await page.locator('#field1').inputValue()
    const f2:Locator = page.locator('#field2')

    //double click:
    const dbbuttton:Locator=page.locator('xpath=//button[text()="Copy Text"]');
    await dbbuttton.dblclick();

    await expect(f2).toHaveValue(text)
    await page.waitForTimeout(3000);

})

test('Right click', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();

    //right click or context click:
    await page.goto("https://demo.guru99.com/test/simple_context_menu.html");
    const acceptall = page.frameLocator('#gdpr-consent-notice').getByText('Accept All');
    await acceptall.click();
    await page.getByText('right click me').click({button:'right'})
    await page.waitForTimeout(3000);

 
})

test('shift click', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();

    //shift + click:
    await page.goto('https://the-internet.herokuapp.com/shifting_content');
    await page.getByText('Example 1: Menu Element').click({ modifiers: ["Shift"] });
    await page.waitForTimeout(3000);
    
})
test('move to element', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page: Page = await browser.newPage();


    //mouse hover or move to the element
    await page.goto("https://www.spicejet.com/");
    await page.getByText('Add-ons').first().hover();
    await page.waitForTimeout(3000);
    await page.getByText('Visa Services').first().click();
    await page.waitForTimeout(3000);
 
})
test('Focus Element Test ', async()=>{
    const browser:Browser =  await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
 
     await page.goto("https://www.orangehrm.com/30-day-free-trial/");
     await page.getByText("Accept Cookies").focus();
     await page.getByText("Accept Cookies").click();
 
     const fullName = await page.locator("#Form_getForm_Name");
     await fullName.focus();
     await fullName.fill("testing automation");
 
     await page.waitForTimeout(5000);
 
 });

