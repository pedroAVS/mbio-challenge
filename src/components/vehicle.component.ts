import * as fs from 'fs';
import * as path from 'path';
import { SELECTORS, TEST_DATA } from '../utils/constants';

export class VehicleComponent {
    private element: WebdriverIO.Element;

    constructor(element: WebdriverIO.Element) {
        this.element = element;
    }

    get priceElement() { return this.element.$(SELECTORS.DCP_CARS_PRODUCT_TILE_PRICE); }
    get nameElement() { return this.element.$(SELECTORS.DCP_CARS_PRODUCT_TILE_MODEL); }
    get exploreBtn() { return this.element.$(SELECTORS.DCP_CARS_PRODUCT_TILE_EXPLORE); }
    get vehicleDetailsListItemVin() { return $(SELECTORS.VEHICLE_DETAILS_LIST_ITEM_VIN); }
    get vehicleDetailsListItemModelYear() { return $(SELECTORS.VEHICLE_DETAILS_LIST_ITEM_MODEL_YEAR); }

    async goToVehicle(): Promise<void> {
        const exploreBtn = await this.exploreBtn;
        await exploreBtn.scrollIntoView();
        await exploreBtn.waitForClickable();
        await exploreBtn.click();
    }

    async getPrice(): Promise<number> {
        const priceElement = await this.priceElement;
        const priceText = await priceElement.getText();

        if (priceText.startsWith(TEST_DATA.DCP_CARS_PRODUCT_TILE_PRICE_TEXT)) {
            return parseFloat(priceText.replace(TEST_DATA.DCP_CARS_PRODUCT_TILE_PRICE_TEXT, '').replace(',', ''));
        }

        throw new Error(`Unexpected price text format: ${priceText}`);
    }

    async getName(): Promise<string> {
        const nameElement = await this.nameElement;
        return nameElement.getText();
    }

    async getModelYear(): Promise<string> {
        await this.vehicleDetailsListItemModelYear.waitForDisplayed();
        return this.vehicleDetailsListItemModelYear.getText();
    }

    async getVin(): Promise<string> {
        await this.vehicleDetailsListItemVin.waitForDisplayed();
        return this.vehicleDetailsListItemVin.getText();
    }

    async writeVehicleToFile(): Promise<void> {
        const name = await this.getName();
        const price = await this.getPrice();
        const data = `${name} - ${price}`;
        const dir = path.resolve(__dirname, '..', '..', 'results');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFile(path.join(dir, 'highestValueVehicle.txt'), data, (err: any) => {
            if (err) { console.log('Error writing file: ', err)};
        });
    }
}