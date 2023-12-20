import { createSlice } from "@reduxjs/toolkit"


var Data = [
    { "id": 1, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 2, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 3, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 4, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 5, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 6, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 7, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 8, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 9, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
    { "id": 10, "name": "Surbhi Jain", "email": "surbhi@gmail.com", "gender": "Female", "status": true, },
]

const initialState = {
    isLoggedIn: false,
    user: Data,
    formdata: null
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setSignOut: (state) => {
            state.isLoggedIn = false;
        },
        setUser: (state, action) => {
            state.user.push(action.payload);
        },
        updateUser: (state, action) => {
            const updateItem = action.payload;
            console.log(updateItem);
            const index = state.user.findIndex(
                (item) => item?.id === updateItem.id
            );
            if (index !== -1) {
                state.user[index] = updateItem;
            }
        },
        removeUser: (state, action) => {
            state.user = state.user.filter(
                (item) => item?.id != action.payload?.id
            );
        },
        setFormDetails: (state, action) => {
            state.formdata = action.payload.formdata;
        },
    }
});

export const { setSignIn, setSignOut, setFormDetails, setUser, updateUser, removeUser } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectFormDetails = (state) => state.userAuth.formdata;
export const selectUser = (state) => state.userAuth.user;

export default authSlice.reducer;