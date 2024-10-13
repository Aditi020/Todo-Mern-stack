// Store/Slice/UserSlice.jsx
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
            state.identifier = action.payload.identifier; // Store the identifier
            state.isAuthenticated = true; // Set authenticated to true
        },
        logout(state) {
            state.identifier = ''; // Reset identifier
            state.isAuthenticated = false; // Set authenticated to false
        },
    },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
