import LoginPage from "@pages/Login.page"
import HeaderPage from "@pages/Header.page"
import CommonFunctions from "@pages/common.page"
import { test as baseTest } from '@playwright/test'
// type pages=  {
//     loginPage: LoginPage;
//     headerPage: HeaderPage;
//     commonPage: CommonFunctions;
// }

const test = baseTest.extend<{
    
    loginPage: LoginPage;
    headerPage: HeaderPage;
    commonPage: CommonFunctions
}>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    headerPage: async ({ page }, use) => {
        await use(new HeaderPage(page));
    },
    commonPage: async ({ page }, use) => {
        await use(new CommonFunctions(page));
    },
})
export default test;
export const expect = test.expect;