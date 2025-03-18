import storage from "redux-persist/lib/storage";
import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import authSlice from "./redux/authSlice";

const persistConfig = {
    key: "root",
    storage
}


const rootReducer = combineReducers({
    auth: authSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;