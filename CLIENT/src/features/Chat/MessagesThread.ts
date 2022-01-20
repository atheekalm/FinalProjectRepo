import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message } from "react-hook-form";
import client_agent from "../../app/api/client_agent";
import { MessageThreadInterface } from "../../app/models/Message";
import { getallMessages } from "./messageSlice";


interface messages {
    MessagesThread: MessageThreadInterface[] | null,
    status: string
}
const initialState: messages = {
    MessagesThread: null,
    status: 'idle'
}

export const messageThread = createAsyncThunk<Message,string>(
    'messageThread',
    async (username, thunkAPI) => {
        try {
            return client_agent.Message.getThread(username);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)


export const messagethredSlice = createSlice({
    name: 'MessagesThread',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(getallMessages.pending, (state) => {
            state.status = 'fetchingMessages'
        });
        builder.addCase(getallMessages.fulfilled, (state, action) => {
            state.status = 'idle';
            state.MessagesThread = action.payload
        });
        builder.addCase(getallMessages.rejected, (state) => {
            state.status = 'idle';
        });
    })
})