// base reducer object that represents all of the state of application
// code that combines all states together
import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
// get localstorage object to use as default storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// defin new persist config
const persistConfig = {
    key: 'root',
    storage, 
    whitelist: [ 'cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

// modified version of root reducer
export default persistReducer(persistConfig, rootReducer);