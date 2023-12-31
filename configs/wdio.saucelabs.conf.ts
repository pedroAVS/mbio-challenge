import type { Options } from '@wdio/types'
import { getSauceCredentials } from '../src/utils/index';
import { TEST_DATA } from '../src/utils/constants';
const allure = require('@wdio/allure-reporter').default;
import * as fs from 'fs';

let sauceUsername: string;
let sauceAccessKey: string;

(async () => {
    const credentials = await getSauceCredentials();
    sauceUsername = credentials.sauceUsername;
    sauceAccessKey = credentials.sauceAccessKey;
})();

export const config: Options.Testrunner = {
    get user() {
        return sauceUsername;
    },
    get key() {
        return sauceAccessKey;
    },
    set user(value) {
        sauceUsername = value;
    },
    set key(value) {
        sauceAccessKey = value;
    },
    services: [
        'sauce',
        [
            '@saucelabs/wdio-sauce-visual-service',
            {
              buildName: 'Mercedes Benz Shop',
              branch: 'main',
              project: 'MBio Challenge',
            },
        ]
    ],
    region: 'eu', 
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
        platformName: 'Windows 11',
        browserVersion: 'latest',
        'sauce:options': {
            screenResolution: '1200x1690'
        }
    }, {
        browserName: 'firefox',
        platformName: 'Windows 11',
        browserVersion: 'latest',
        'sauce:options': {
            screenResolution: '1200x1690'
        }
    }, {
        browserName: 'chrome',
        platformName: 'macOS 13.00',
        browserVersion: 'latest',
        'sauce:options': {
            screenResolution: '1200x1690'
        }
    }, {
        browserName: 'firefox',
        platformName: 'macOS 13.00',
        browserVersion: 'latest',
        'sauce:options': {
            screenResolution: '1200x1690'
        }
    }],
    runner: 'local',
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
    specFileRetries: 3,
    specFileRetriesDelay: 1000,
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
}