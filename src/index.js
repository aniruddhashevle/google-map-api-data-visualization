import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createReduxStore from './redux';
import App from './components/App';
import { importRequiredScripts } from './utils/google-map-apis';

//Google map apis
importRequiredScripts();

ReactDOM.render(
    <Provider store={createReduxStore()}>
        <App />
    </Provider>
    , document.getElementById('root'));
