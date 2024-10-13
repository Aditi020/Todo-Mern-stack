// store/Slice/UserSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    identifier: '',
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.identifier = action.payload.identifier; // Set identifier on login
            state.isAuthenticated = true; // Set the user as authenticated
        },
        logout(state) {
            state.identifier = ''; // Reset the identifier
            state.isAuthenticated = false; // Reset authentication state
        },
    },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
