import { Browser, BrowserContext, Page, chromium, test } from '@playwright/test'
import path from 'path';

test('Single File Upload ', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context:BrowserContext = await browser.newContext()
    const page:Page = await context.newPage()
    await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html");

    //single upload:
    await page.locator("input[name='upfile']").setInputFiles("C:/Users/dshil/Downloads/P7S1_Automation Backend QA 2.docx");

    //deselect files:
    await page.locator("input[name='upfile']").setInputFiles([]);
    //upload file from buffer memory:
    await page.locator("input[name='upfile']").setInputFiles({
        name: 'shilpa_resume.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is shilpa resume')
    });

    await page.waitForTimeout(5000);
    await page.close();
    await context.close();
    await browser.close();

});

test('Multiple File Upload ', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

    //multiple files:
    await page.locator("input[name='filesToUpload']")
        .setInputFiles([
            path.join("C:/Users/dshil/Downloads/Shilpa-Automation Engineer.pdf"),
            path.join("C:/Users/dshil/Downloads/github-recovery-codes.txt"),
            path.join("C:/Users/dshil/Downloads/Git-2.44.0-64-bit.exe"),
            path.join("C:/Users/dshil/Downloads/template1.yaml")]);

    //deselect files:
    await page.locator("input[name='filesToUpload']").setInputFiles([]);

    //single file
    await page.locator("input[name='filesToUpload']")
        .setInputFiles([
            path.join("C:/Users/dshil/Downloads/Shilpa-Automation Engineer.pdf"),
        ]);

    await page.waitForTimeout(4000);
    await page.close();
    await context.close();
    await browser.close();

})

test('Multiple File Upload with popup ', async () => {
    const filePath0 = 'C:/Users/dshil/Downloads/Shilpa-Automation Engineer.pdf';
    const filePath1 = 'C:/Users/dshil/Downloads/Git-2.44.0-64-bit.exe';
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/upload');
        page.on("filechooser", async (filechooser) => {
             //console.log(filechooser.isMultiple());
            await filechooser.setFiles([filePath0, filePath1])
        })
        await page.click(".example + div#drag-drop-upload", { force: true })

    await page.waitForTimeout(4000);
    await page.close();
    await context.close();
    await browser.close();

})
