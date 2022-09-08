import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import nextId from "react-id-generator";

import { __SignUp } from "../redux/modules/signup";

function SignUp () {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let id = nextId();

    const initialState = {

        id:"",
        nickname: "",
        username:"", 
        password:"",
        passwordConfirm:"",

      };
     

    const [userdata,setUserdata] = useState(initialState);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUserdata({ ...userdata, [name]: value });
      };
      //console.log(userdata)

      const onSubmitHandler = (event) => {
        event.preventDefault();
        if (userdata.nickname.trim() === "" || userdata.username.trim() === "" || userdata.password.trim() === "" || userdata.passwordConfirm.trim() === "") return alert('빈칸을 채워주세요.');
        dispatch(__SignUp({ ...userdata, id: id }));
        setUserdata(initialState);
        navigate("/login");
      };
    return (        
        <>
        <LoginForm onSubmit={onSubmitHandler}>
            <LoginContainer>
  <div className="mb-3">
    <label htmlFor="exampleInputId" className="form-label">ID</label>
    <input type="text" name="nickname" className="form-control" id="exampleInputId" aria-describedby="emailHelp" onChange={onChangeHandler}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputUsername" className="form-label">닉네임</label>
    <input type="text" name="username" className="form-control" id="exampleInputUsername" onChange={onChangeHandler}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="exampleInputPassword" minLength="8" maxLength="20" onChange={onChangeHandler}/>
    <div id="emailHelp" className="form-text">영문,숫자 포함 8~20자</div>
    <input type="password" name="passwordConfirm" className="form-control" id="exampleInputPassword1" minLength="8" maxLength="20" onChange={onChangeHandler}/>
    <div id="emailHelp" className="form-text">비밀번호 확인</div>
  </div>  
  <button type="submit" className="btn btn-primary">가입하기</button>
  </LoginContainer>
</LoginForm>

    </>
    )
}



const LoginForm = styled.form`
    border: 1px solid grey;
    max-width: 900px;
    height : 500px;
    max-height: 1000px;
    margin-top: 20px;
    margin-left: 20px;
    flex: center;
`

const LoginContainer = styled.div`
    margin:20px 20px 20px 20px;
`


export default SignUp;