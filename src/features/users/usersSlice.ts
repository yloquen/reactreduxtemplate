import {AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {runQuery} from "../../Comm";


export const getUsers = createAsyncThunk('users/get', async () =>
{
    return await runQuery("GET", "/users");
    // return await fetch("https://gorest.co.in/public/v2/users");
});


const initialState =
{
    // loading: false,
    // loaded: false,
    users: []
    // active: false
};

const usersSlice = createSlice(
    {
        name:'search',
        initialState:initialState,
        reducers:
        {
            toggleActive(state)
            {
                // state.active = !state.active;
                // state.loading = false;
                // state.loaded = false;
            }
        },
        extraReducers(builder)
        {
            builder
                .addCase(getUsers.pending, (state) =>
                {
                    // state.loading = true;
                    // state.loaded = false;
                    console.log("Loading Users");
                })
                .addCase(getUsers.fulfilled, (state:any, action) =>
                {
                    // state.loading = false;
                    // state.loaded = true;
                    state.users = action.payload;
                    console.log(action.payload);
                })
        }
    });

export default usersSlice.reducer;
export const { toggleActive } = usersSlice.actions;