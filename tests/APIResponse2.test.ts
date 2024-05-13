import { test, expect, request } from '@playwright/test'

test("Read API response", async ({ page }) => {
    await page.goto("https://letcode.in/elements")

    const [response] = await Promise.all([
        page.waitForResponse(res =>
            res.status() == 200
            &&
            res.url()=='https://api.github.com/users/ortonikc'
        ),
        await page.fill('input[name=username]', "ortonikc"),
        await page.click("button")
    ])
    console.log(await  response.json())
})