import { categorySlice, subcategorySlice } from './../Category/CategorySlice';
import { messageSlice } from './../Chat/messageSlice';
import { locationSlice, locationSlice_Cities } from './../Locations/locationSlice';
import { serviceSlice } from './../Services/serviceSlice';
import { accountSlice } from './../Account/accountSlice';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { counterslice } from "./counterSlice";
import { messagethredSlice } from '../Chat/MessagesThread';
import { checkProfileExitSlice } from '../LoggedUser/loggeduserSlice';



export const store = configureStore({
    reducer: {
        counter: counterslice.reducer,
        account: accountSlice.reducer,
        services: serviceSlice.reducer,
        District: locationSlice.reducer,
        City: locationSlice_Cities.reducer,
        Messages: messageSlice.reducer,
        MessageThread: messagethredSlice.reducer,
        ProfieExit: checkProfileExitSlice.reducer,
        Category: categorySlice.reducer,
        SubCategory:subcategorySlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;