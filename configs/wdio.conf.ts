import type { Options } from '@wdio/types'
import { TEST_DATA } from '../src/utils/constants';
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
        browserName: 'firefox' 
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: TEST_DATA.BASE_URL,
    waitforTimeout: 10000,
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

    before: function () {
        browser.setWindowSize(1920, 1080);
    }

}
