import Page from "./page";
import { CookieComponent, 
        FilterComponent, 
        AuthComponent,
        VehicleComponent 
    } from "../components";
import { SELECTORS } from "../utils/constants";

class ShopPage extends  Page {
    cookieComponent = new CookieComponent();
    filterComponent = new FilterComponent();
    authComponent = new AuthComponent();

    get showMoreBtn() { return $(SELECTORS.SHOW_MORE_BUTTON) }
    get loader() { return $(SELECTORS.LOADER); }

    async open (): Promise<string> {
        return super.open('');
    }

    async navigateToVehicle(vehicle: VehicleComponent): Promise<void> {
        await vehicle.goToVehicle();
    }

    async loadAllVehicles(): Promise<void> {
        while (true) {
            try {
                if (await this.showMoreBtn.isDisplayed()) {
                    await this.showMoreBtn.scrollIntoView();
                    await this.showMoreBtn.waitForClickable();
                    await this.showMoreBtn.click();
                } else {
                    break;
                }
            } catch (error) {
                break;
            }
        }
    }

    async findHighestValueVehicle(): Promise<VehicleComponent | null> {
        await this.loader.waitForDisplayed({ reverse: true });
        await this.loadAllVehicles();
        const elements = await $$(SELECTORS.DCP_CARS_PRODUCT_TILE);
        let highestValue: number = 0;
        let highestValueVehicle: VehicleComponent | null = null;
        for (const element of elements) {
            const vehicle = new VehicleComponent(element);
            const price = await vehicle.getPrice();
            if (price > highestValue) {
                highestValue = price;
                highestValueVehicle = vehicle;
            }
        }
        if (highestValueVehicle) {await highestValueVehicle.writeVehicleToFile(); }
        return highestValueVehicle;
    }

    async acceptCookies(): Promise<void> {
        await this.cookieComponent.acceptCookies();
    }

    async filterByColour(): Promise<void> {
        await this.filterComponent.filterByColour();
    }

    async fillForm(state: string, postalCode: string): Promise<void> {
        await this.authComponent.selectState(state);
        await this.authComponent.enterPostalCode(postalCode);
        await this.authComponent.selectPurposeType();
        await this.authComponent.clickContinueBtn();
        await this.loader.waitForDisplayed({ reverse: true });
    }
    
}

export default new ShopPage();