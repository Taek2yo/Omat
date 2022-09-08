import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { __deletePosts, __getPosts } from "../redux/modules/post";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/';
import Layout from "../components/Layout"
import AddComment from "./AddComment";
import MapDetail from "./MapDetail";


const ListDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, post } = useSelector((state) => state.post);

    const param = useParams();
     
    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])

   /*  console.log(post.data) */

    return (
        <>
        <Layout>
          <BackBtn onClick={() => {navigate(-1)}}>이전으로</BackBtn>
          {post.data?.map((post) => {
            if (post.id == param.id) {                                                          // CSS 적용해야함
              return (
                <div key={post.id}>
                  
                  <DetailTitle>{post.title}</DetailTitle>
                  <div>
                  <DetailAuthor>By.{post.author}</DetailAuthor>
                  <p></p>
                  {/* <DetailTime>{post.modifiedAt}</DetailTime> */}
                  </div>              
                  
                  <Box>
                    
                      <Img src={post.imgUrl}/>
                      <Map>
                      <MapDetail/>
                      </Map> 
                      <Review>{post.review}</Review>
                                         
                  </Box>
                  <AddComment/>
                </div>
              );
            }
          })}
        </Layout>
        </>
      );
    };
    

export default ListDetail;



const Img = styled.img`
  border: 1px solid black;
  border-radius: 10px;
  float: left;
  width: 400px;
  height: 300px;
  margin: 50px;
`;

const BackBtn = styled.button`
    float: left;
    margin-top: 50px;
`

const DetailTitle = styled.h3`
    text-align: center;
    margin-top: 20px;
`
const DetailAuthor = styled.div`
    text-align: center;
`
const Review = styled.div`
    
    border: 1px solid green;
    border-radius: 10px;

    width: 600px;
    height: 300px;
    text-align: center;
    background-color: white;
    
    margin-top: 50px;
`

const Box = styled.div`
    display: flex;
    border: 1px solid green;
    border-radius: 10px;
    margin-top: 30px;
    
    background-color: #AED581;
    
    height: 600px;
`

const Map = styled.div`
  border: 1px solid green;

  width: 400px;
  height: 300px;
  margin: 50px;
`
