import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initMap, addMarkers } from '../../utils/google-map-apis';
import { getFilterConfig } from '../../utils/filters.js'
import { getBoatRampData } from '../../redux/actions/boad-ramps-action';
import Filters from '../Filters';
import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterConfig: null,
            map: null
        }
        this.map = null;
    }

    async componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        await this.props.getBoatRampData();
        let filterConfig = getFilterConfig(this.props.boatRamps);
        this.setState({ filterConfig });
    }

    handleLoad = () => {
        if (window.google)
            this.setState({ map: initMap(this.props.boatRamps) });
        // this.map = initMap(this.props.boatRamps);
    }

    onClickMaterialFilter = (e, data, map) => {
        e.preventDefault();
        e.stopPropagation();
        const {
            customisedData: {
                first_coordinate,
                markerImageURL,
                colorCode
            }
        } = data
        addMarkers(first_coordinate, colorCode, map);
    }

    onClickAreaFilter = (e) => {
    }

    render() {
        return (
            <div className="app-wrapper">
                <Filters
                    onClickMaterialFilter={this.onClickMaterialFilter}
                    onClickAreaFilter={this.onClickAreaFilter}
                    filterConfig={this.state.filterConfig || {}}
                    map={this.state.map}
                />
                <div className="map-wrapper">
                    <div id="map"></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    const {
        rootReducer: {
            boatRampsData: {
                boatRamps
            }
        }
    } = reduxState;
    return {
        boatRamps
    }
}

export default connect(mapStateToProps, { getBoatRampData })(App);
