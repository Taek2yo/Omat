import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux/';
import { __getPosts } from "../redux/modules/post";
import Item from "./Item";

const ItemList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, post } = useSelector((state) => state.post);
    
    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])
    

    if (error) {
        return <>{error.message}</>
    }

    if (post.length === 0)
        return (
            <>
                <Btn>
                    <Write onClick={() => navigate("/auth/post")}>맛집 공유하러가기</Write>
                </Btn>
                <ItemListContainer>게시글이 없습니다.</ItemListContainer>
            </>
        )
   /*  console.log(post.data)
 */

    return (
        <>
            <Btn>
                <Write onClick={() => navigate("/auth/post")}>맛집 공유하러가기</Write>
            </Btn>
            <ItemListContainer>
                {post.data?.map((item) =>(<Item item={item} key={item?.id} />))}
            </ItemListContainer>
        </>
    )
}

export default ItemList;

const Btn = styled.div`
    text-align: center;
    margin-top: 30px;
`

const Write = styled.button`
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #AED581;

`
const ItemListContainer = styled.div`
    display: flex;
    gap: 80px;
    border: none;
    flex-wrap: wrap;

    margin-top: 50px;
    width: 2000px;
    height: 100%;
    margin-left  : -14em;
`