// Comments Box 댓글 담길 공간
import React, { useEffect } from "react";
import styled from "styled-components";
import Comments from "./Comments"
import AddComment from "./AddComment"
import { useDispatch, useSelector } from 'react-redux/';
import {__getComments } from "../redux/modules/comment"
const CommentsList = () => {
    const dispatch = useDispatch();
    const { error, comment } = useSelector((state) => state.comment);
    
   /*  console.log(comment) */
    useEffect(() => {
        dispatch(__getComments());
    }, [dispatch])
    
    if (error) {
        return <>{error.message}</>
    }

    if (comment.length === 0)
        return (
            <>
                <CommentsBox>
                <AddComment/>
                댓글이 없습니다.
                </CommentsBox>
            </>
        )
    return(
        <CommentsBox>
            <AddComment/>
            {comment.map((comment) => (<Comments comment={comment} key={comment.id} />))}
        </CommentsBox>
    )
}

export default CommentsList;

const CommentsBox = styled.div`
    text-align: center;
    border: 1.5px solid skyblue;
    margin: 30px;
    border-radius: 15px;
    width: 900px;
    height: 400px;
`