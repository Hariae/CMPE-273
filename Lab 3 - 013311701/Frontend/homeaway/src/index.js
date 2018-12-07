import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk'

import RootReducer from './reducers';

//middleware Settings
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>    
        <App />
    </Provider>
    , document.getElementById('root')    
    );
registerServiceWorker();
