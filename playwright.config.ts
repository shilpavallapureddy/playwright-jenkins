import { PlaywrightTestConfig, devices } from '@playwright/test';
const config: PlaywrightTestConfig = {

   //workers: 4,
    //fullyParallel: true,
     /*projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
        {
            name: 'Pixel',
            use: { ...devices['Pixel 5'] },
        },
     {
         name: 'firefox',
         use: { ...devices['Desktop Firefox'] },
    },
    {
         name: 'webkit',
        use: { ...devices['Desktop Safari'] },
    },
     ],*/
  use: {
    viewport: null,
    headless: false,
    //channel: "chrome",
    screenshot: "on",
    video: "retain-on-failure",
    trace: "on",
    baseURL: "https://www.letcode.in",
    launchOptions: {
      args: ["--start-maximized"],

      // logger: {
      //     // isEnabled: (name, severity) => true,
      //     // log: (name, severity, message, args) => console.log(name, severity)
      // }
  }

  },

  retries: 0,
  // grep: [new RegExp("@smoke")],
  //grep: [new RegExp("@smoke"),new RegExp("@reg")],
  //grepInvert: [new RegExp("@smoke")],
  testMatch: ["tests/sampletest/*.ts"],
  //reporter: "./tests/customreports/Myreporter.ts"
  reporter: [
    ["dot"], // -> console
    ["json", { outputFile: "test-result.json" }], //  -> JSON
    ['html', { open: "always" }],// -> html
    //['html', { open: "never" }],// -> // globalTeardown: './helper/globalsetup.ts'
    ["allure-playwright"] // -> allure
  ],
 // globalTeardown: './helper/globalsetup.ts'
 

}
export default config;