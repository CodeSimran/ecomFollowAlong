import { configureStore } from "@reduxjs/toolkit";

const initialUserState = {
    email:""
};

// 2.) create the user reducer 

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        default:
            return state;
    }
};


// 3.) create and export the store using redux toolkit
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
export default store;
