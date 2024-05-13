import { Locator, Page, test } from "@playwright/test";

test("Simple web table", async ({ page }) => {


    await page.goto("https://letcode.in/table");
    const table = page.locator("#simpletable");
    const headers = table.locator("thead");
    console.log(await headers.allTextContents());

    const rows = table.locator("tbody tr");
    console.log("Rows count: " + await rows.count());
    const cols = rows.first().locator("td")
    console.log("Cols count: " + await cols.count());

    for (let i = 0; i < await rows.count(); i++) {
        const row = rows.nth(i);
        const tds = row.locator("td");
        for (let j = 0; j < await tds.count(); j++) {
            if (await tds.nth(j).textContent() == "Koushik") {
                console.log(await tds.nth(2).textContent());
                //await tds.last().locator("input").check();
                await tds.nth(3).locator("input").check()
            }
        }
    }

    await checkInput(rows,page,'Man')
    await checkInput(rows,page,'Raj')
    await page.waitForTimeout(2000)

})
async function checkInput(rows: Locator, page: Page, name: string) {
    const nameMatch = rows.filter({
        has: page.locator("td"),
        hasText: name
    });
    await nameMatch.locator("input").check();
}