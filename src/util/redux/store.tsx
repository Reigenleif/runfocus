import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { SettingSlice,SettingActions } from "./settingSlice";

const rootReducer = combineReducers({
    setting: SettingSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export type rootStateType = ReturnType<typeof rootReducer>

export default store
    