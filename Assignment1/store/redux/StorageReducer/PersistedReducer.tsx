// configureStore.js

import {persistReducer} from 'redux-persist'
import MergeReducers from "../MergeReducers";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['OrderReducer']
}

const PersistedReducer = persistReducer(persistConfig, MergeReducers)
export default PersistedReducer;
