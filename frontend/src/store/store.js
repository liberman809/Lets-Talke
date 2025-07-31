
import { createStore, combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'; // מספק את האחסון המקומי (localStorage) לדפדפן
import { userReducer } from './userReducer'
import {chatReducer} from './chatReducer'
import { persistStore, persistReducer } from 'redux-persist';
import {encryptTransform} from 'redux-persist-transform-encrypt';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userModule'],
    transforms: [
        encryptTransform({
          secretKey: 'mySecretKeyLetTalke', // מפתח הצפנה (יש להחביא אותו בסביבה מאובטחת)
        })
      ],
  };

const rootReducer = combineReducers({
    chatModule: chatReducer,
    userModule: userReducer,
    // systemModule: systemReducer,
    // groupModule: groupReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
//export const store = createStore(rootReducer, middleware)
export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);

// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState().propertieModule)
//     console.log('*******************************')
// })