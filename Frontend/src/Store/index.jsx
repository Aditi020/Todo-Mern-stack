// store/index.jsx

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slice/UserSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // Add user slice to the store
    },
});

export default store;
