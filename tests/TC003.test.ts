import test, { expect } from "@fixtures/basePages";
import * as data from "../data/login.cred.json";


test.describe("POM - TC003", () => {

    test("Login positive", async ({ headerPage, loginPage, commonPage, page }) => {
        await page.goto(data.url)
        expect(page.url()).toBe(data.url)
        await headerPage.clickLoginLink();
        await loginPage.enterUserName(data.email);
        await loginPage.enterUserPassword(data.pass);
        await loginPage.clickLoginBtn();
        const toaster = await commonPage.toaster();
        expect(await toaster?.textContent()).toContain("Welcome");
        await page.reload();
        await headerPage.clickSignOutLink();
        page.close()
    });
    test("Login again", async ({ headerPage, page, loginPage }) => {
        await page.goto(data.url)
        await headerPage.clickLoginLink();
        await loginPage.login(data.email, data.pass);
        await page.waitForNavigation();
        expect(page.url()).toBe(data.url)
        page.close()
    })
})