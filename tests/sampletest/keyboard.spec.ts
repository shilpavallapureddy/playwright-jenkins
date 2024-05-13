import {test, expect, Browser, Page, Locator, FrameLocator} from '@playwright/test'
import { log } from 'console';
import { KeyObject } from 'crypto';
import { webkit, chromium, firefox } from 'playwright'

test('Type characters sequentially', async()=>{
    const browser:Browser =  await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
 
    await page.goto("https://www.flipkart.com/");

    const search= page.getByPlaceholder('Search for Products, Brands and More');
    await search.pressSequentially("macbook", {delay: 500})
    //await search.press('Control+A');
    await search.press('Enter');
    

    await page.waitForTimeout(5000);


  
})