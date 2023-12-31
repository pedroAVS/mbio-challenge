import { config as sharedConfig } from './wdio.conf';

export const config = {
    ...sharedConfig,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: process.env.HEADLESS === 'true' ? [
                    '--no-sandbox',
                    '--disable-infobars',
                    '--headless',
                    '--disable-gpu',
                    '--window-size=1920,1080'
                ] : ['--window-size=1920,1080']
            }
        }
    ]
};