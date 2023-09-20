import { configureStore } from "@reduxjs/toolkit";
import PersistedReducer from "./StorageReducer/PersistedReducer";

const AppReduxStore = configureStore({
    reducer: PersistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default AppReduxStore;
