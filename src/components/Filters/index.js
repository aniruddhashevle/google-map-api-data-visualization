import React, { Fragment } from 'react';
import './filter.css';

const Filters = ({ onClickMaterialFilter, filterConfig, map }) => {
    let renderMaterialFilter = [];

    Object.keys(filterConfig).forEach((item, index) => {
        renderMaterialFilter.push(
            <div
                className="material-details" key={index}
                style={{ backgroundColor: filterConfig[item].customisedData.colorCode }}
                onClick={e => onClickMaterialFilter(e, filterConfig[item], map)}
            >
                <span className="material-name">{item}</span>
                <span className="material-count">{filterConfig[item].geoData.length}</span>
            </div>
        )
    });

    return (
        <div className="filter-wrapper">
            {
                renderMaterialFilter && renderMaterialFilter.length > 0 &&
                <Fragment>
                    <h3>Materials</h3>
                    <div className="material-details-wrapper">
                    {renderMaterialFilter}
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default Filters;