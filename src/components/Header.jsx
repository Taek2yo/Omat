import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { deleteCookie } from "../shared/cookies";
/* import { useDispatch } from "react-redux"; */
import Omat from "../assert/Omat.jpg"
import Om from "../assert/Omat.png"

function Header() {
    const navigate = useNavigate();
    /* const dispatch = useDispatch(); */
    const onClick = () => {
        navigate(`/`);
    };

    
    const onLogoutHandler =()=>{
        deleteCookie('Authorization');
        deleteCookie('Refresh-Token');
        navigate('/login');
    }

    return (

        <Head>
            <LogoImg onClick={onClick}></LogoImg>
            
            <LoginBox>
                <LogInlink>
                    <Link
                        to="/login"
                        style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        로그인</Link>
                </LogInlink>

                <SignUplink>
                    <Link
                        to="/signup"
                        style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        회원가입
                    </Link>
                </SignUplink>
                <Logout onClick={onLogoutHandler}>로그아웃</Logout>
            </LoginBox>
        </Head>

    )
}

export default Header;

const Head = styled.div`
    background-color: #AED581;
    display: flex;
    height: 300px;
    width: 100;
    background-image: url(${Omat});
    background-repeat: no-repeat;

    background-position: top center;

    justify-content: space-between;
`;


const LoginBox = styled.div`
    margin: 50px;
    margin-top: 50px;
    display: flex;
    gap: 20px;
`

const SignUplink = styled.div`
    font-size: 20px;
`

const LogInlink = styled.div`
    margin-left: 10em;
    font-size: 20px;
`
const LogoImg = styled.div`
    background-image: url(${Om});
    background-repeat: no-repeat;
    width: 300px;
    margin-left: 30px;
    margin-top: 30px;
`

const Logout = styled.div`
    font-size: 20px;
`