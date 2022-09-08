import { configureStore } from "@reduxjs/toolkit";
import post from "../modules/post";
import comment from "../modules/comment"
import login from '../modules/login'
import member from '../modules/signup'
import mapdata from "../modules/mapdata";

const store = configureStore({
    reducer:{
        post,
        comment,
        member,
        login,
        mapdata
        
    }
})

export default store;