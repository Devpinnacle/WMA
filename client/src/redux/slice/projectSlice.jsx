import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: [],
};

const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
        getProject(state,{payload}){
            state.project=payload;
        }
    }
});

export const{
    getProject
}=projectSlice.actions;

export const projectReducer=projectSlice.reducer;
