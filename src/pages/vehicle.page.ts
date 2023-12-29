import * as fs from 'fs';
import * as path from 'path';
import { VehicleComponent } from '../components';
import { SELECTORS } from "../utils/constants";

class VehiclePage {

    get vehicleDetails() { return $(SELECTORS.VEHICLE_DETAILS); }
    get vehicleDetailsListItems() { return $$(SELECTORS.VEHICLE_DETAILS_LIST); }
    get contactSellerButton() { return $(SELECTORS.CONTACT_SELLER_BUTTON); }

    async clickContactSellerButton(): Promise<void> {
        await this.contactSellerButton.waitForDisplayed();
        await this.contactSellerButton.waitForClickable();
        await this.contactSellerButton.click();
    }

    async getVehicleDetails(): Promise<void> {
        await this.vehicleDetails.waitForDisplayed();
        const vehicle = new VehicleComponent(await this.vehicleDetails);

        const modelYear = await vehicle.getModelYear();
        const modelVin = await vehicle.getVin();
        const data = `\nModel Year: ${modelYear} \nVIN: ${modelVin}`;
        const dir = path.resolve(__dirname, '..', '..', 'results');
        fs.appendFile(path.join(dir, 'highestValueVehicle.txt'), data, (err: any) => {
            if (err) { console.log('Error writing file: ', err)};
        });
    }
}

export default new VehiclePage();