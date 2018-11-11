import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initMap } from '../../utils/google-map-apis';
import './App.css';

class App extends Component {

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => window.google && initMap(this.props.boadRamps);

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
            boadRamps
        }
    } = reduxState;
    return {
        boadRamps
    }
}

export default connect(mapStateToProps, null)(App);
