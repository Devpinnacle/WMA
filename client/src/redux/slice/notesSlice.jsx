import { createSlice } from "@reduxjs/toolkit";

const initialState={
    notes:[],
};

const notesSlice=createSlice({
    name:"notes",
    initialState,
    reducers:{
        getNotes(state,{payload}){
            state.notes=payload;
        }
    }
});

export const{
    getNotes
}=notesSlice.actions;

export const notesReducer=notesSlice.reducer;