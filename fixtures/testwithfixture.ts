import test, { expect } from "./basePages"
 import * as data from "../data/login.cred.json";

 test.beforeEach(async ({ page }) => {
    await page.goto(data.url)
})

test('login with fixture',async({ headerPage, loginPage, commonPage,page })=>{
    await headerPage.clickLoginLink()
    expect(page.url()).toBe("https://letcode.in/signin")
    await loginPage.enterUserName(data.email);
    await loginPage.enterUserPassword(data.pass);
    await loginPage.clickLoginBtn();
    const toaster = await commonPage.toaster();
    expect(await toaster?.textContent()).toContain("Welcome");
    await headerPage.clickSignOutLink();




})