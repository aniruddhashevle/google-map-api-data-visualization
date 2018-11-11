import {
    AREA_RANGE_1,
    AREA_RANGE_2,
    AREA_RANGE_3
} from '../config/constants';

function getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while (length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
}

export function getFilterConfig(data) {
    let materialFilterConfig = {},
        areaFilterConfig = {

        },
        customised = {};
    data.features.forEach((item, index) => {
        const {
            properties
        } = item;

        let colorCode = getRandomColor();

        //Material config
        materialFilterConfig[properties.material] = { ...(materialFilterConfig[properties.material] || {}) };
        //add customised data
        if (!materialFilterConfig[properties.material] || Object.keys(materialFilterConfig[properties.material]).length === 0) {
            customised = {
                colorCode,
                markerImageURL: `http://www.googlemapsmarkers.com/v1/${colorCode}/`,
            }
            materialFilterConfig[properties.material].customisedData = customised;
        }

        //add geo data
        materialFilterConfig[properties.material].geoData = [...(materialFilterConfig[properties.material].geoData || [])]
        materialFilterConfig[properties.material].geoData.push(item);

        //Area config

    })
    console.log('materialFilterConfig', materialFilterConfig);
    return materialFilterConfig;
}