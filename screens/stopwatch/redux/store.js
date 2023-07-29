import { configureStore } from "@reduxjs/toolkit";
//import cardSliceReducer from "./cardSlice";
import { cardSlice, graphData,todoSLice,tableDataSlice } from "./cardSlice";
//import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
     blacklist: []
  };
let rootReducer=combineReducers({
    cards:cardSlice.reducer,
    todos:todoSLice.reducer,
    tableData:tableDataSlice.reducer,
    graphData:graphData.reducer
})
let persistedReducer=persistReducer(persistConfig,rootReducer)

export default configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
})

// export default configureStore({
//     reducer:{
//         cards:cardSliceReducer,
//     }
// })