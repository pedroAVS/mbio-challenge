import { SELECTORS } from "../utils/constants";

export class AuthComponent {
    get stateDropdown() { return $(SELECTORS.STATE_DROPDOWN); }
    get postalCodeInput() { return $(SELECTORS.AUTH_POSTAL_CODE_INPUT); }
    get purposeTypeRadio() { return $(SELECTORS.PURPOSE_TYPE_RADIO); }
    get continueBtn() { return $(SELECTORS.CONTINUE_BUTTON); }

    async clickContinueBtn(): Promise<void> {
        const continueBtn = await this.continueBtn;
        /*
        * This is a workaround.
        * Noticed that sometimes the radio button wasn't selected after the click.
        */
        try {
            await continueBtn.waitForEnabled();
            await continueBtn.click();
        } catch (error) {
            console.log('Continue button not enabled, retrying selectPurposeType');
            await this.selectPurposeType();
            await continueBtn.waitForEnabled();
            await continueBtn.click();
        }
    }

    async selectState(state: string): Promise<void> {
        const stateDropdown = await this.stateDropdown;
        await stateDropdown.waitForDisplayed();
        await stateDropdown.selectByVisibleText(state);
    }

    async enterPostalCode(postalCode: string): Promise<void> {
        const postalCodeInput = await this.postalCodeInput;
        /* 
        * This is a workaround.
        * Sometimes the text box returns an error
        * Added delay to simulate real user input. 
        */
        for (const char of postalCode) {
            await postalCodeInput.addValue(char);
            await browser.pause(100);
        }
    }

    async selectPurposeType(): Promise<void> {
        const purposeTypeRadio = await this.purposeTypeRadio;
        await purposeTypeRadio.waitForDisplayed();
        await purposeTypeRadio.waitForClickable();
        await purposeTypeRadio.click();
    }
}