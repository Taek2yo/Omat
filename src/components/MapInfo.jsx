import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { mapSliceActions } from '../redux/modules/mapdata';

const { kakao } = window;

const Mapinfo = () => {
    const dispatch = useDispatch();
    const [address,setAddress] = useState('');
    /* const mapdata = useSelector((state)=>state.mapdata.address)
    console.log('mapdata는: ' + mapdata) */

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setAddress({ ...address, [name]: value });
      };
    

    const onClickHandler = (event) => {
        event.preventDefault();
        dispatch(mapSliceActions.getMapData(address.address));
    }
    console.log('input은: ' + address.address)
    

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
    geocoder.addressSearch(`${address.address}`, function (result, status) {

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
          content: '<div style="width:150px;color:blue;text-align:center;padding:6px 0;">O-mat pick</div>'
        });
        infowindow.open(map, marker);
  
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    })
  }, [address.address]);

  return (
    <div>
    <div id='myMap' style={{
      width: '400px', 
      height: '300px'
    }}></div>
    <div style={{
        width:'400px'
    }}>
    <input style={{
        width:'352px'
    }} type="text" name="address" onChange={onChangeHandler}/>
    <button onClick={onClickHandler}>저장</button>
    도로명 주소로 입력해 주세요(oo로 + n번) ex.관악로 1
    </div>
    
    </div>
  );
}

export default Mapinfo;