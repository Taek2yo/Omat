import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



function Item ({item}) {
    const navigate = useNavigate();
    
    return (
        
        <ItemContainer onClick={()=>{navigate(`/detail/${item?.id}`)}}>
            
            <ItDialog>
            <ItImg alt="이미지가 없습니다." src={item?.imgUrl}/>
            <ItTitle>{item?.title}</ItTitle>
            <ItInfo>
            <div>작성자 : {item?.author} </div>
            </ItInfo>
            <ItReview>{item?.review}</ItReview>
            
            </ItDialog>
        </ItemContainer>
        
    )
}

export default Item;

const ItemContainer = styled.div`
    border: 1px solid #DCEDC8;
    width: 95%;
    width: 500px;
    height: 330px;

    border-radius: 8px;
    background-color: white;
    :hover {
        background-color: #AED581;;
        cursor: pointer;
        box-shadow: 2px 2px 1px green;
    }
    `

const ItDialog = styled.div`
    display: block;
    padding: 1em 1em 0.5em 1em;
`

const ItTitle = styled.div`
    
    margin-top:10px;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

`

const ItReview = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

`

const ItInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 2em 0 0 ;
    font-size: small;
    color: #33691E;
`
const ItImg = styled.img`
    border: 1px solid #AED581;
    border-radius: 10px;
    width: 450px;
    height: 200px;
    margin-left: 10px;

    background-position: center;
`