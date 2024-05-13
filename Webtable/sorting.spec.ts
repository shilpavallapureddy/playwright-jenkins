import { test } from "@playwright/test";

test("Web table sorting", async ({ page }) => {
    await page.goto("https://letcode.in/table");

    const table =  page.locator("table.mat-sort.table");
    const desserts =  table.locator("th[mat-sort-header='name']");

    const sortType = await desserts.getAttribute("aria-sort");//intial it is none by default


    const dessertsRow = page.locator("//table[contains(@class,'mat-sort table')]/tr/td[1]");
    const originalData = await dessertsRow.allTextContents();
    console.log("Original is -- " + originalData);

   
    await sortTable();
    await sortTable();
    await sortTable();

    async function sortTable() {
        await desserts.click();
        const sort = await desserts.getAttribute("aria-sort");
        if (sort === "descending") {
            console.log("Expecting des -- : " + sort);
            originalData.sort((a, b) => b.localeCompare(a));
            console.log("Expecting des -- " + await dessertsRow.allTextContents());
        }
        else if (sort === "ascending") {
            console.log("Expecting asc -- : " + sort);
            originalData.sort();
            console.log("Expecting asc -- " + await dessertsRow.allTextContents());
        }
        else {
            console.log("Expecting none -- " + await dessertsRow.allTextContents());
        }

    }


})

