import { test } from "@playwright/test";

test("Color Scheme", async ({ page }) => {
    await page.goto("https://playwright.dev")
    console.log(await page.title());
    let gitlocator = page.locator("text=GitHub");
    const box = await gitlocator.boundingBox();
    if (box) {
        const y = box.y;
        await page.mouse.wheel(0, y);
    }
    //await gitlocator.scrollIntoViewIfNeeded()
    await page.waitForTimeout(3000);
})