import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initMap } from '../../utils/google-map-apis';
import { getFilterConfig } from '../../utils/filters.js'
import { getBoatRampData } from '../../redux/actions/boad-ramps-action';
import Filters from '../Filters';
import './app.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterConfig: null
        }
    }

    async componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        await this.props.getBoatRampData();
        let filterConfig = getFilterConfig(this.props.boatRamps);
        console.log('filterConfig', filterConfig);
        this.setState({ filterConfig });
    }

    handleLoad = () => window.google && initMap(this.props.boatRamps);

    onClickMaterialFilter = (e, item) => {
        console.log('e cate', e, item);
        this.placeMarkerAndPanTo(e.latLng);

    }

    onClickAreaFilter = (e) => {
        console.log('e area', e);
    }

    // map.addListener('click', function(e) {
    //     placeMarkerAndPanTo(e.latLng, map);
    // });

    placeMarkerAndPanTo(latLng, map) {
        var marker = new window.google.maps.Marker({
            position: latLng,
            map: map
        });
        map.panTo(latLng);
    }

    render() {
        return (
            <div className="app-wrapper">
                <Filters
                    onClickMaterialFilter={this.onClickMaterialFilter}
                    onClickAreaFilter={this.onClickAreaFilter}
                    filterConfig={this.state.filterConfig || {}}
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
