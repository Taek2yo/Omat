import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../shared/cookies";
import Mapinfo from "../components/MapInfo";
import { useSelector } from "react-redux";
function Add() {
    const navigate = useNavigate();
    const Coordinate = useSelector((state)=>state.mapdata.address)
    console.log('Coordinate는: ' + Coordinate)
    
    let token = getCookie("Authorization")
    let fresh = getCookie("Refresh-Token")

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [review, setReview] = useState("");

    
    
    const handleimgChange = (e) =>{
        e.preventDefault();
        const file = e.target.files;
        setImage(file[0])
    }

    const handleDeleteImg = (e) =>{
        const file = e.target.files[0];
        URL.revokeObjectURL(file)
        setImage("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let req = {
          title: title,
          review: review,
          Coordinate: Coordinate,
        };
        
        const formData = new FormData();
        
        let json = JSON.stringify(req);
        
        const titleblob = new Blob([json], { type: "application/json" });
        formData.append("title", title );
        
        const reviewblob = new Blob([json], { type: "application/json" });
        formData.append("review", review);
        
        const URL = "http://13.125.24.153/api/auth/post"; 
        formData.append("image", image);
        
        const Coordinateblob = new Blob([json], { type: "application/json" });
        formData.append("Coordinate", Coordinate);
        
        //post
        const data = await axios.post(URL, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
            "Refresh-Token": fresh,
          },
        });
        console.log(data);
        if (data.success) {
          navigate("/");
        }
      };


    return (
        <Layout>
            <AddContainer>
                <UserNameH3>username</UserNameH3>
                <Title
                    type={"text"}
                    value={title}
                    placeholder="제목을 입력해주세요."
                    onChange={(e) => setTitle(e.target.value)}
                >
                </Title>
                
                <ImaegMapContainer>
                    <ImageGroup>
                        <ImageInput>
                            <Img type="file" accept="image/*" onChange={handleimgChange}/>
                            <DeleteImg onClick={handleDeleteImg}>삭제하기</DeleteImg>
                        </ImageInput>
                        <ImgThumbnailBox>
                        <ImgThumbnail
                            alt=""
                            src={image}
                            style={{ margin: "auto" }}
                        />
                        </ImgThumbnailBox>
                    </ImageGroup>
                    
                    <Map>
                       <Mapinfo/>
                    </Map>
                </ImaegMapContainer>

                <ReviewTitle>리뷰를 남겨주세요</ReviewTitle>
                <Review
                    type={"text"}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    row="10"
                >                   
                </Review>
                <AddReviewBtn onClick={handleSubmit}>게시글 작성</AddReviewBtn>
            </AddContainer>
        </Layout>
    )
}

export default Add;

const AddContainer = styled.div`
    border: 1px solid skyblue;
    border-radius: 10px;
    width: 1500px;
    height : 840px;
    margin: 50px;
    margin-left: -120px;

    padding: 30px;
    padding-left: 80px;
`
const UserNameH3 = styled.h3`
    margin-left: 20px;
    margin-top: 10px;
`

const Title = styled.input`
    border: none;
    border-bottom: 1px solid #CCC;
    font-size: 18px;
    
    width: 89%;
    height : 50px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
`

const ImaegMapContainer = styled.div`
    display: flex;
    width: 90%;
    height : 350px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
`

const ImageGroup = styled.div`
    text-align: center;
`
const Img = styled.input`
    border: 1px solid grey;
    width: 500px;
    margin-left: 30px;
    margin-top: 10px;
`

const ImgThumbnail = styled.img`
    width: 100%;
    height: 100%;
    margin : auto;
`
const ImgThumbnailBox = styled.div`
    border: 1px solid grey;
    width: 300px;
    height: 300px;

    margin:auto;
    margin-top: 10px;
`
const Map = styled.div`
    float: right;
    border: 1px solid grey;
    width: 400px;
    height : 300px;
    margin-top: 20px;
    margin-left: 150px;
    margin-right: 20px;
   
`

const Review = styled.textarea`
    
    width: 89%;
    height : 150px;
    margin-top: 20px;
    margin-left: 20px;
`


const AddReviewBtn = styled.button`
    float: right;
    margin-left: 20px;
    margin-top: 10px;
    margin-right: 130px;

    width : 150px;
    height: 50px;
`

const ImageInput = styled.form`
    justify-content:space-between;
    margin-left:-30px;
`

const ReviewTitle = styled.div`
    margin-top: 30px;
    margin-left: 20px;
    font-size: 18px;

`
const DeleteImg = styled.button`
    float: right;
    width: 100px;
    height: 30px;
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 10px;
`
