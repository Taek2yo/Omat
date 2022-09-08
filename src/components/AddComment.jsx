// Comments 등록 Form
import React, { useState } from "react";
import styled from "styled-components";
import { __getPosts } from "../redux/modules/post";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/modules/comment";

function AddComment () {
    let dispatch = useDispatch();
    
    const [content, setContent] = useState("");
    let id = useParams();
    let postId = id.id;

    const addComment = (e) => {
        /* e.preventDefault(); */
        dispatch(addComment({content, postId}));
        setContent("");
    }
    return (
        <>
            <Wrraper onSubmit={ addComment }>
                <CommentInput
                    type={"text"}
                    value={content}
                    onChange={(e)=>{
                        setContent(e.target.value)
                    }}  
                />              
                <AddBtn>등록</AddBtn>
            </Wrraper>
        </>
    )
}

export default AddComment;

const CommentInput = styled.input`
    border: 1px solid skyblue;
    border-radius: 10px;
    width: 420px;
    height: 50px;

    margin-top: 30px;
    margin-left: 25px;
`

const AddBtn = styled.button`
    border: 1px solid skyblue;
    background-color: skyblue;
    margin-left: 30px;
    margin-top: 30px;
    height: 50px;
    width: 100px;
    border-radius: 10px;

    :hover {
        cursor: pointer;
    }
`

const Wrraper = styled.form`
    display: flex;
`