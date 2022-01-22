import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client_agent from '../../app/api/client_agent';



export const ProfileExits = createAsyncThunk<boolean, number>(
    'users/ProfileExit',
    async (userId, thunkAPI) => {
        try {
            return await client_agent.loggedUser.checkProfileExist(userId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

const initialState = {
    status: 'idle',
    LoadExist: false
}


export const checkProfileExitSlice = createSlice({
    name: 'ProfileExit',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(ProfileExits.pending, (state) => {
            state.status = 'pendingFetchProfile'
        });
        builder.addCase(ProfileExits.fulfilled, (state, action) => {
            state.status = 'idle';
            state.LoadExist = action.payload
        });
        builder.addCase(ProfileExits.rejected, (state) => {
            state.status = 'idle'
        });
    })
})

