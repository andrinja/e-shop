import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// can use for different platforms including React native
import { PersistGate } from 'redux-persist/integration/react';
// persistor is the persistor from our store
import { store, persistor } from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={persistor}>
                <App /> 
            </PersistGate>
           
        </BrowserRouter>
    </Provider>,
    
    document.getElementById('root'));
