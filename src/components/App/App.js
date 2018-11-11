import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initMap } from '../../utils/google-map-apis';
import { getBoatRampData } from '../../redux/actions/boad-ramps-action';
import './App.css';

class App extends Component {

    async componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        await this.props.getBoatRampData();
    }

    handleLoad = () => window.google && initMap(this.props.boatRamps);

    render() {
        return (
            <div className="App">
                <div id="map"></div>
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
