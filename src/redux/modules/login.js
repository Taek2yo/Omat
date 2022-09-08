import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { deleteCookie, setCookie } from '../../shared/cookies';


export const __Login = createAsyncThunk(
    "/api/member/login",
    
    async (payload, thunkAPI) => {
        try {
            const data =  await axios.post('http://13.125.24.153/api/member/login',payload);
            //console.log(data.data.refreshToken)
            if(data.data.ok){
              //로그인 된 상태
                setCookie('Authorization',data.data.authorization,0.5);
                setCookie('Refresh-Token',data.data.refreshToken);
            }
            return thunkAPI.fulfillWithValue(data.data);
          } catch (error) {            
            alert('아이디 비밀번호를 확인 해 주세요.')
            return thunkAPI.rejectWithValue(error);
          }
    }
  );
  

export const login = createSlice({
    name:"login",
    initialState: {
        userdatas:[],
        success:false,
        isLoading: false,
        error: null,
      },

    reducers:{
        logout(state){
          deleteCookie("ACCESS_TOKEN")
          localStorage.removeItem("nickname")
        }
    },

    extraReducers: {
        [__Login.pending]: (state) => {
          state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
        },
        [__Login.fulfilled]: (state, action) => {
          state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
          state.posts = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
        },
        [__Login.rejected]: (state, action) => {
          state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
          state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
        },
        
      },
})

export let {logout} = login.actions;

export default login.reducer;