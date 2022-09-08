import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { __getPosts } from '../redux/modules/post';


const { kakao } = window;

const MapDetail = () => {
    const param = useParams();
    const post = useSelector((state) => state.post);

    //console.log(param.id)
   
    const found = post.post.data.find(element => element = param.id);
    console.log(found.id.Coordinate)

    const Coordinate = useSelector((state)=>state.mapdata.address)
    //console.log('Coordinate는: ' + Coordinate)

    const dispatch = useDispatch();
    

    let value = Coordinate
    if(found.id.Coordinate===undefined){
        value = Coordinate
    }else{
        value = (post.post.data[0].Coordinate)
    }
    
    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch])


  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(35.12, 129.1),
      level: 3
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(`${value}`, function (result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
  
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });
  
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: `'<div style="width:150px;color:blue;text-align:center;">${Coordinate}</div>'`
        });
        infowindow.open(map, marker);
  
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    })
  }, []);

  return (
    <div>
    <div id='myMap' style={{
      width: '400px', 
      height: '300px'
    }}></div>
    </div>
  );
}

export default MapDetail;