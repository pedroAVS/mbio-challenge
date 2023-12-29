import { faker } from '@faker-js/faker';
import { SELECTORS } from '../utils/constants';

class ContactPage {
    get fillFormModal() { return $(SELECTORS.FILL_FORM); }
    get firstNameInput() { return $(SELECTORS.FIRST_NAME_INPUT); }
    get lastNameInput() { return $(SELECTORS.LAST_NAME_INPUT); }
    get emailInput() { return $(SELECTORS.EMAIL_INPUT); }
    get phoneInput() { return $(SELECTORS.PHONE_INPUT); }
    get postalCodeInput() { return $(SELECTORS.POSTAL_CODE_INPUT); }
    get submitButton() { return $(SELECTORS.SUBMIT_BUTTON); }
    get formErrors() { return $$(SELECTORS.WB_CONTROL_ERRORS); }
    get formErrorMessage() { return $(SELECTORS.FORM_ERROR_MESSAGE); }

    async getSubmissionErrorMessage(): Promise<string> {
        await this.formErrorMessage.waitForDisplayed();
        return await this.formErrorMessage.getText();
    }

    async areErrorElementsVisible(): Promise<boolean> {
        const errorElements = await this.formErrors;
        for (const errorElement of errorElements) {
            if (!(await errorElement.isDisplayed())) {
                return false;
            }
        }
        return true;
    }

    async getFormErrors(): Promise<string[]> {
        const errors = [];
        const inputSelectors = [
            SELECTORS.FIRST_NAME_INPUT,
            SELECTORS.LAST_NAME_INPUT,
            SELECTORS.EMAIL_INPUT,
            SELECTORS.PHONE_INPUT,
            SELECTORS.POSTAL_CODE_INPUT,
        ];
        for (const selector of inputSelectors) {
            const errorSelector = selector.replace('input', 'wb-input + wb-control-error');
            const errorElement = await $(errorSelector);
            if (await errorElement.isDisplayed()) {
                errors.push(await errorElement.getText());
            }
        }
        return errors;
    }


    async fillForm() {
        await this.fillFormModal.waitForDisplayed();
        await this.firstNameInput.isClickable();
        await this.firstNameInput.setValue(faker.person.firstName());
        await this.lastNameInput.setValue(faker.person.lastName());
        await this.emailInput.setValue(faker.internet.email());
        await this.phoneInput.setValue(faker.phone.number());
        await this.postalCodeInput.setValue(faker.location.zipCode());
        await this.submitForm();
    }

    async submitForm() {
        await this.submitButton.waitForDisplayed();
        await this.submitButton.waitForClickable();
        await this.submitButton.click();
    }
}

export default new ContactPage();