import ShopPage from '../pages/shop.page'
import { fillShopPageForm, 
    navigateToHighestValueVehicle, 
    fillContactPageFormAndCheckErrors, 
    checkSubmissionErrorMessage } from '../utils/helpers';

describe('Vehicle Inquiry', () => {
    before(async () => {
        /* 
        * had to increase the script timeout, since the test will take more than 60 seconds
        * to complete. This is because the test will load 64 vehicles, to ensure that the
        * highest value vehicle is selected.
        */
        await browser.setTimeout({ 'script': 120000 }) 
        await ShopPage.open();
        await ShopPage.acceptCookies();
    })

    it('should show error on invalid inquiry for highest value vehicle', async () => {
        await fillShopPageForm();
        await navigateToHighestValueVehicle();
        await fillContactPageFormAndCheckErrors();
        await checkSubmissionErrorMessage();
    })
})