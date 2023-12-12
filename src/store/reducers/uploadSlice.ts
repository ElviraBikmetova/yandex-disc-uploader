import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UploadState {
    isFetching: boolean
    authError: string
}

const initialState: UploadState = {
    isFetching: false,
    authError: ''
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        toggleIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload
        },
        getAuthError(state, action: PayloadAction<string>) {
            state.authError = action.payload
        }
    }
})

export const {toggleIsFetching, getAuthError} = uploadSlice.actions

export default uploadSlice.reducer