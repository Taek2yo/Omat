// comment 1개
import React from "react";
import styled from "styled-components";

const Comments = ({comment}) => {
    return (
    <>
        <CmListWrraper>
            <UserComment>
                
                <Cm>{comment?.content}</Cm>
            </UserComment>
            <BtnWrap>
                <EditBtn>수정</EditBtn>
                <DeleteBtn>삭제</DeleteBtn>
            </BtnWrap>
        </CmListWrraper>
    </>
    )
}

export default Comments;

const CmListWrraper = styled.div`
    margin-top: 20px;
    display: flex;
`
const UserComment = styled.div`
    border: 1px solid skyblue;
    border-radius: 10px;
    margin-left: 25px;
    width: 720px;
    height: 50px;

    text-align: center;
`



const Cm = styled.div`
    margin : 10px;
`

const EditBtn = styled.button`
    height:50px;
    border: 1px solid skyblue;
    border-radius: 10px;
    background-color: skyblue;
`

const DeleteBtn = styled.button`
    margin-left: 10px;
    height:50px;
    border: 1px solid skyblue;
    border-radius: 10px;
    background-color: skyblue;
`

const BtnWrap = styled.div`
    margin-left: 28px;
`