import type { Options } from '@wdio/types'
import { TEST_DATA } from '../src/utils/constants';
const allure = require('@wdio/allure-reporter').default;
import * as fs from 'fs';

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: '../tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        '../src/tests/**.test.ts'
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.HEADLESS === 'true' ? ['headless', 'disable-gpu', 'window-size=1920,1080'] : ['window-size=1920,1080']
        } 
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: TEST_DATA.BASE_URL,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
    specFileRetries: 3,
    specFileRetriesDelay: 1000,

    afterTest: async (test, { passed }) => {
        if(!passed) {
            const screenshot = await browser.takeScreenshot();
            const dir = './errorShots';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            const screenshotPath = `./errorShots/${test.title.replace(/ /g, '_')}_${Date.now()}.png`;
            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    }
}
