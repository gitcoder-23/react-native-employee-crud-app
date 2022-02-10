import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}
// TypeError: store.getState is not a function. (In ‘store.getState()’, ‘store.getState’ is undefined how can i resolve this problem?
// configure store

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

const persistor = persistStore(store);

export { store, persistor };

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(...middleWares))
// );
