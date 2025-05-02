import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user/user.slice'
import sessionStorage from 'redux-persist/es/storage/session'
import persistStore from 'redux-persist/es/persistStore'
import { persistReducer } from 'redux-persist'  // Changed import style

const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}

// Changed variable name to avoid conflict
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,  // Using the new variable name
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)