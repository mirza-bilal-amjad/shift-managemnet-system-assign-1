/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import AppReduxStore from "./store/redux/AppReduxStore";

const persistor = persistStore(AppReduxStore);
const AppRedux = () => (
    <Provider store={AppReduxStore}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);
AppRegistry.registerComponent(appName, () => AppRedux);
