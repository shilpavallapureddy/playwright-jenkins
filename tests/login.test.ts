import {test,expect,Browser, Page, Locator, chromium, firefox}from '@playwright/test'

    test('login test1',async()=>{
     const browser=  await chromium.launch({headless:false,channel:'msedge'})
     const context = await browser.newContext()
     const page=await context.newPage()
     await page.goto("https://letcode.in/")
     await page.click("text=Log in")
     await page.fill("input[name='email']","dshilpareddy92@gmail.com")
     await page.fill("input[name='password']","Shilpa@123")
     await page.click("button:text('LOGIN')")
     await page.click('"Sign out1"')
     await page.close();
     await context.close();
     await browser.close();

    });
    test('login test2', async()=>{
        //launch the browser
       const browser:Browser=await chromium.launch({headless: false,channel:'chrome'})
       //create page
       const context = await browser.newContext()
       const page=await context.newPage()
       //enter the url
       await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
       const emailId:Locator =  page.locator('#input-email');
       const password:Locator =  page.locator('#input-password');
       const loginButton:Locator = page.locator("[value='Login']");
    
       await emailId.fill("pwtest@opencart.com");
       await password.fill("playwright@123");
       await loginButton.click();
    
       const title = await page.title();
       console.log("home page title: ", title);
       await page.screenshot({path: 'homepage.png'});
       expect(title).toEqual('Account Login');
       await page.waitForTimeout(5000);
        await page.close();
        await context.close();
        await browser.close();
        //await new Promise(() => {}); // prevents your script from exiting! 

    });

