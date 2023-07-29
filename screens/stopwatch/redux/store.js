import { configureStore } from "@reduxjs/toolkit";
import { cardSlice,todoSLice } from "./cardSlice";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
     blacklist: []
  };
let rootReducer=combineReducers({
    cards:cardSlice.reducer,
    todos:todoSLice.reducer
})
let persistedReducer=persistReducer(persistConfig,rootReducer)

export default configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
})
