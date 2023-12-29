import ShopPage from '../pages/shop.page'
import { fillShopPageForm, 
    navigateToHighestValueVehicle, 
    fillContactPageFormAndCheckErrors, 
    checkSubmissionErrorMessage } from '../utils/helpers';

describe('Vehicle Inquiry', () => {
    before(async () => {
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