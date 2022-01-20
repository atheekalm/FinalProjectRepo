import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client_agent from '../../app/api/client_agent';
import { Messages } from '../../app/models/Message';


interface messagesState {
    messageLoaded: boolean,
    status: string,
    Messages: Messages[] | null
}
const initialState: messagesState = {
    Messages: null,
    messageLoaded: false,
    status: 'idle'
}
export const getallMessages = createAsyncThunk<Messages[]>(
    'gettingMessages',
    async (_, thunkAPI) => {
        try {
            return client_agent.Message.getallMessages();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const sendMessages = createAsyncThunk<Messages>(
    'SendMessages',
    async (message, thunkAPI) => {
        try {
            return client_agent.Message.sendMessage(message);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)



export const messageSlice = createSlice({
    name: 'Messages',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(getallMessages.pending, (state) => {
            state.status = 'fetchingMessages'
        });
        builder.addCase(getallMessages.fulfilled, (state, action) => {
            state.status = 'idle';
            state.messageLoaded = true;
            state.Messages = action.payload
        });
        builder.addCase(getallMessages.rejected, (state) => {
            state.status = 'idle';
            state.messageLoaded = false;

        });
    })
})



