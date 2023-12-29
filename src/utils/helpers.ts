import contactPage from '../pages/contact.page';
import ShopPage from '../pages/shop.page'
import VehiclePage from '../pages/vehicle.page';
import { TEST_DATA } from './constants';

export async function fillShopPageForm() {
    await ShopPage.fillForm(TEST_DATA.STATE, TEST_DATA.POSTAL_CODE);
    await ShopPage.filterByColour();
}

export async function navigateToHighestValueVehicle() {
    const highestValueVehicle = await ShopPage.findHighestValueVehicle();
    if (!highestValueVehicle) {
        throw new Error('No highest value vehicle found');
    }
    await ShopPage.navigateToVehicle(highestValueVehicle);
    await VehiclePage.getVehicleDetails();
}

export async function fillContactPageFormAndCheckErrors() {
    await VehiclePage.clickContactSellerButton();
    await contactPage.fillForm();

    const errorElementsVisible: Boolean = await contactPage.areErrorElementsVisible();
    await expect(errorElementsVisible).toBe(true);

    const formErrors: string[] = await contactPage.getFormErrors();
    await expect(formErrors.some(error => TEST_DATA.FORM_ERRORS.includes(error))).toBe(true);
}

export async function checkSubmissionErrorMessage() {
    const submissionErrorMessage = await contactPage.getSubmissionErrorMessage();
    TEST_DATA.EXPECTED_ERROR_MESSAGES.forEach(async (errorMessage) => {
        await expect(submissionErrorMessage).toContain(errorMessage);
    })
}