import { expect, test } from "@playwright/test";

test("find broken images", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/broken_images");
    await page.waitForLoadState("domcontentloaded")
    const images = page.locator('img')
    console.log("images count is", await images.count())
    const allimages = await images.all();
    for await (const img of allimages) {
        const imagsrc = await img.getAttribute('src')
        expect.soft(imagsrc?.length).toBeGreaterThan(1)
        if (imagsrc?.length) { 
        const res = await page.request.get("https://the-internet.herokuapp.com/" + imagsrc)
        expect.soft(res.status(),'Failed to load image src'+imagsrc).toBe(200)
        }
    }
})