import React from 'react';

const Filters = ({ onClickMaterialFilter, filterConfig }) => {
    let renderMaterialFilter = [];

    Object.keys(filterConfig).forEach(item => {
        renderMaterialFilter.push(
            <div style={{ color: filterConfig[item].customisedData.colorCode }}>
                <span>{item}</span>
                <span onClick={e => onClickMaterialFilter(e, filterConfig[item])}>{filterConfig[item].geoData.length}</span>
            </div>
        )
    });

    return (
        <div className="filter-wrapper">
            {renderMaterialFilter}
        </div>
    )
}

export default Filters;