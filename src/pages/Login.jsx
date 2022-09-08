import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { __Login } from "../redux/modules/login";
import { getCookie} from "../shared/cookies";

function Login () {
    //const result = useSelector((state)=>state.login)
    //console.log(result)
    //
    const initialState = {
        nickname:"",
        password:"",
      };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userdata,setUserdata] = useState(initialState);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUserdata({ ...userdata, [name]: value });
      };

      const onSubmitHandler = (event) => {
        event.preventDefault();
        try {
          if (userdata.nickname.trim() === "" || userdata.password.trim() === "") return alert('빈칸을 채워주세요.');
          dispatch(__Login(userdata));
          setUserdata(initialState);   
          navigate('/');  
        } catch (error) {
          console.log(error)
        }
        
      };

        useEffect(()=>{
        if(getCookie('Authorization') == undefined){
           
        }},[])
    

    return (        
        <>
        <LoginForm onSubmit={onSubmitHandler}>
            <LoginContainer>
  <div className="mb-3">
    <label htmlFor="LoginId" className="form-label">ID</label>
    <input type="text" name="nickname" className="form-control" id="LoginId" aria-describedby="emailHelp" minLength="2" onChange={onChangeHandler}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="LgoinPassword" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="LgoinPassword" minLength="8" maxLength="20" onChange={onChangeHandler}/>
    <div id="text" className="form-text">영문,숫자 포함 8~20자</div>
  </div>  
  <button type="submit" className="btn btn-primary" >로그인</button>
  <button type="submit" className="btn btn-primary" onClick={()=>navigate("/signup")}>회원 가입</button>
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


export default Login;