import { SELECTORS } from "../utils/constants";

export class FilterComponent {
    get filterToggle() { return $(SELECTORS.FILTER_TOGGLE); }
    get preOwnedFilter() { return $(SELECTORS.PRE_OWNED_FILTER); }
    get colourFilter() { return $(SELECTORS.COLOUR_FILTER); }
    get colour() { return $(SELECTORS.COLOUR); }
    get colourOption() { return $(SELECTORS.COLOUR_OPTION); }
    get loader() { return $(SELECTORS.LOADER); }

    async filterByColour(): Promise<void> {
        await this.loader.waitForDisplayed({ reverse: true });
        await this.openPreOwnedFilter();
        await this.openColourFilter();
        await this.selectColour();
    }

    async selectColour(): Promise<void> {
        const colourDropdown = await this.colour;
        const colourOption = await this.colourOption;
        await colourDropdown.scrollIntoView();
        await colourDropdown.waitForClickable();
        await colourDropdown.click();
        await colourOption.waitForClickable();
        await colourOption.click();
        await colourDropdown.waitForClickable();
        await colourDropdown.click();
    }

    async openColourFilter(): Promise<void> {
        const colourFilter = await this.colourFilter;
        await colourFilter.waitForDisplayed();
        await colourFilter.waitForClickable();
        await colourFilter.click();
    }

    async openPreOwnedFilter(): Promise<void> {
        const preOwnedFilter = await this.preOwnedFilter;
        try {
            await preOwnedFilter.waitForDisplayed();
        } catch (error) {
            await this.filterToggle.waitForDisplayed();
            await this.filterToggle.waitForClickable();
            await this.filterToggle.click();
            await preOwnedFilter.waitForDisplayed();
        }
        await preOwnedFilter.waitForClickable();
        await preOwnedFilter.click();
    }
}