import { SELECTORS } from "../utils/constants";

export class CookieComponent {
    get allowCookiesBtn() { 
        return $(SELECTORS.COOKIE_BANNER).shadow$(SELECTORS.ALLOW_COOKIES_BUTTON);
    }

    async acceptCookies(): Promise<void> {
        const allowCookiesButton = await this.allowCookiesBtn;
        await allowCookiesButton.waitForDisplayed();
        await allowCookiesButton.waitForClickable();
        await allowCookiesButton.click();
        await allowCookiesButton.waitForDisplayed({ reverse: true });
    }
}