import { config as sharedConfig } from './wdio.conf';

export const config = {
    ...sharedConfig,
    capabilities: [
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: process.env.HEADLESS === 'true' ? ['-headless'] : ['--window-size=1920,1080']
            }
        }
    ]
};