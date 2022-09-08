import { createSlice } from '@reduxjs/toolkit';



export const mapSlice = createSlice({
    name:"mapdata",
    initialState:{
        address:'관악로 1',
    },

    reducers:{
        getMapData(state,action){
            state.address = action.payload
            //console.log(action.payload)
        },
    },

    
})




export const mapSliceActions = mapSlice.actions
export default mapSlice.reducer;