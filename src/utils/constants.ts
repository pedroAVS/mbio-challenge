export const COOKIE_BANNER = {
    COOKIE_BANNER: 'cmm-cookie-banner',
    ALLOW_COOKIES_BUTTON: '[data-test="handle-accept-all-button"]',
    LOADER: '.dcp-loader',
};

export const AUTH = {
    STATE_DROPDOWN: '//option[@selected="selected"]/ancestor::select',
    AUTH_POSTAL_CODE_INPUT: '[aria-labelledby="postal-code-hint"]',
    PURPOSE_TYPE_RADIO: '//input[@value="P"]/ancestor::wb-radio-control',
    CONTINUE_BUTTON: '[data-test-id="state-selected-modal__close"]',
};

export const FILTERS = {
    FILTER_TOGGLE: '[class="filter-toggle"]',
    PRE_OWNED_FILTER: 'span=Pre-Owned',
    COLOUR_FILTER: 'p=Colour',
    COLOUR: 'div.active ~ div div[data-test-id="multi-select-dropdown"]',
    COLOUR_OPTION: 'a=Obsidian Black Metallic',
};

export const DCP = {
    SHOW_MORE_BUTTON: '[data-test-id="dcp-result-pagination__load-more"]',
    DCP_CARS_PRODUCT_TILE: '.dcp-cars-product-tile',
    DCP_CARS_PRODUCT_TILE_PRICE: '.dcp-cars-product-tile-price',
    DCP_CARS_PRODUCT_TILE_MODEL: '.dcp-cars-product-tile__model',
    DCP_CARS_PRODUCT_TILE_EXPLORE: '.dcp-cars-product-tile__link',
}

export const VEHICLE = {
    VEHICLE_DETAILS: '.dcp-vehicle-details',
    VEHICLE_DETAILS_LIST: 'li.dcp-vehicle-details-list__item',
    VEHICLE_DETAILS_LIST_ITEM_LABEL: '.dcp-vehicle-details-list-item__label',
    VEHICLE_DETAILS_LIST_ITEM_VALUE: '.dcp-vehicle-details-list-item__value',
    VEHICLE_DETAILS_LIST_ITEM_VIN: "//li[span[contains(text(), 'VIN')]]/span[2]",
    VEHICLE_DETAILS_LIST_ITEM_MODEL_YEAR: "//li[span[contains(text(), 'Model Year')]]/span[2]",
    CONTACT_SELLER_BUTTON: 'a=Enquire Now',
};

export const CONTACT = {
    FILL_FORM: '.dcp-rfq-contact',
    FIRST_NAME_INPUT: 'div[data-test-id="rfq-contact__first-name"] input',
    LAST_NAME_INPUT: 'div[data-test-id="rfq-contact__last-name"] input',
    EMAIL_INPUT: 'div[data-test-id="rfq-contact__email"] input',
    PHONE_INPUT: 'div[data-test-id="rfq-contact__phone"] input',
    POSTAL_CODE_INPUT: 'div[data-test-id="rfq-contact__postal-code"] input',
    SUBMIT_BUTTON: 'button[data-test-id="dcp-rfq-contact-button-container__button-next"]',
    WB_CONTROL_ERRORS: 'wb-control-error',
    FORM_ERROR_MESSAGE: '.dcp-error-message',
}

export const SELECTORS = {
    ...COOKIE_BANNER,
    ...AUTH,
    ...FILTERS,
    ...DCP,
    ...VEHICLE,
    ...CONTACT,
};

export const TEST_DATA = {
    BASE_URL: 'https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo',
    STATE: 'New South Wales',
    POSTAL_CODE: '2007',
    COLOUR: 'obsidian black metallic',
    DCP_CARS_PRODUCT_TILE_PRICE_TEXT: 'A$',
    MODEL_YEAR_TEXT: 'Model Year',
    VIN_TEXT: 'VIN',
    FORM_ERRORS: [
        'Please enter a valid email address using a minimum of six characters.',
        'Please enter a valid mobile number (Example: 0441234567)',
        'Please enter a valid post code.'
    ],
    EXPECTED_ERROR_MESSAGES: [
        'An error has occurred. Please check the following sections:',
        'Please check the data you entered.'
    ]
};