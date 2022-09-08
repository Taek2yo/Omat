import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getPosts = createAsyncThunk(
    "GET_POSTS",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.get(`http://13.125.24.153/api/main`);
            /* console.log(data) */
            return thunkAPI.fulfillWithValue(data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.code);
        }
    }
);

// createAsyncThunk 생성하기
export const __deletePosts = createAsyncThunk(
    // action 이름
    "DELETE_POSTS",
    // 처리할 비동기 함수
    async (payload) => {
      // 서버에서 데이터를 삭제
      const res = await axios.delete(`http://13.125.24.153/api/auth/post/${payload}`);
      // action의 payload 리턴
      return res.data;
    }
  );

const initialState = {
    post: [],
    error: null,
    isLoading: false,
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.post.push(action.payload);
            axios.post("http://13.125.24.153/api/auth/post", action.payload);
        },
        updataPost: (state, action) => {

            axios.patch(`http://13.125.24.153/api/auth/post${action.payload.id}`, action.payload)
          }
    },
    extraReducers: {
        [__getPosts.fulfilled]: (state, action) => {
          state.isLoading = false;
          state.post = action.payload;
        },
        [__getPosts.rejected]: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        [__getPosts.pending]: (state) => {
          state.isLoading = true;
        },
        
        [__deletePosts.fulfilled]: (state, action) => {
            state.list = action.payload;
        },
        [__deletePosts.rejected]: (state, action) => {
        
        },
}
})

export const { addPost, updataPost } = postSlice.actions;
export default postSlice.reducer;