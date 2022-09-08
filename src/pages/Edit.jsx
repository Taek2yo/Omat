import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/';
import { __getPosts,updataPost } from "../redux/modules/post";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Edit () {
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, post} = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])
    
    let {id} = useParams();
    let postIdex = post.find(function(x){return x.id === id})

    const handleChange = (e) =>{
        e.preventDefault();

        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setImageUrl((prev)=>[...prev, fileUrl])
    }

    const handleDeleteImg = (e) =>{
        const file = e.target.files[0];
        URL.revokeObjectURL(file)
        setImageUrl("");
    }


    const handleEdit = async (event) => {
        event.preventDefault();
        let req = {
          title: title,
          review: review,
        };
        
        const formData = new FormData();
        
        let json = JSON.stringify(req);
        
        const titleblob = new Blob([json], { type: "application/json" });
        formData.append("title", titleblob);
        
        const reviewblob = new Blob([json], { type: "application/json" });
        formData.append("review", reviewblob);
        
        const URL = "http://13.125.24.153:8080/api/auth/post"; 
        formData.append("imageUrl", imageUrl);
        //post
        const data = await axios.patch(URL, formData, {
          headers: {
            "content-type": "multipart/form-data",
            /* Authorization: token,
            RefreshToken: fresh, */
          },
        });
        console.log(data);
        if (data.success) {
          navigate("/");
        }
      };

    return (
        <Layout>
            <EditContainer>
                <UserNameH3>username</UserNameH3>
                    <Title
                        type={"text"}
                        placeholder={postIdex?.title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </Title>
                    <ImaegMapContainer>
                    <ImageGroup>
                        <ImageInput>
                            <Img type="file" accept="image/*" onChange={handleChange}/>
                            <DeleteImg onClick={handleDeleteImg}>삭제하기</DeleteImg>
                        </ImageInput>
                        <ImgThumbnailBox>
                        <ImgThumbnail
                            alt=""
                            src={imageUrl}
                            style={{ margin: "auto" }}
                        />
                        </ImgThumbnailBox>
                    </ImageGroup>
                    
                    <Map>
                        map 등록
                    </Map>
                    </ImaegMapContainer>
                <Review
                    type={"text"}
                    placeholder={postIdex?.review}
                    onChange={(e) => setReview(e.target.value)}
                    row="10"
                >                   
                </Review>
                <EditBtn onClick={handleEdit}>수정완료</EditBtn>
                
            </EditContainer>
        </Layout>
    )
}

export default Edit;

const EditContainer = styled.div`
    border: 1px solid skyblue;
    border-radius: 10px;
    width: 1500px;
    height : 840px;
    margin: 50px;
    margin-left: -120px;

    padding: 30px;
    padding-left: 80px;
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

const UserNameH3 = styled.h3`
    margin-left: 20px;
    margin-top: 10px;
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

const ImageInput = styled.form`
    justify-content:space-between;
    margin-left:-30px;
`
const Img = styled.input`
    border: 1px solid grey;
    width: 500px;
    margin-left: 30px;
    margin-top: 10px;
`

const DeleteImg = styled.button`
    float: right;
    width: 100px;
    height: 30px;
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 10px;
`
const ImgThumbnailBox = styled.div`
    border: 1px solid grey;
    width: 300px;
    height: 300px;

    margin:auto;
    margin-top: 10px;
`

const ImgThumbnail = styled.img`
    width: 100%;
    height: 100%;
    margin : auto;
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
const EditBtn = styled.button`
    float: right;
    margin-left: 20px;
    margin-top: 10px;
    margin-right: 130px;

    width : 150px;
    height: 50px;
`