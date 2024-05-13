import { test ,expect } from '@playwright/test'

    test("open letcode and verify title", async ({ page }) => {
    await page.goto("https://letcode.in/edit")
    const name = await page.$("#fullName") 
    // await page.type("id=fullName", "Koushik Chatterjee") // it will append the value
    // if (name != null) {
    //     name.type("") //the bolow ? is  same optional chaining
    // }
    name?.fill('Shilpa') //name?.type('Shilpa') // it will clear the field and enter the value
    
    await page.waitForTimeout(1000);

    const join = await page.$("#join")
    await join?.focus();
    await page.keyboard.press('End')
    await join?.type('Hanuman')
    await page.waitForTimeout(1000);
    await join?.fill(" Human")
    await page.waitForTimeout(1000);
    const text = await page.getAttribute("id=getMe", "value")
    console.log(text);
    await page.waitForTimeout(1000);
    await page.fill("//input[@value='Koushik Chatterjee']", "")
    await page.waitForTimeout(4000);
    expect(await page.isDisabled('#noEdit')).toBe(true)
    expect(await page.isEditable('#dontwrite')).toBe(true)
    await page.close();
})