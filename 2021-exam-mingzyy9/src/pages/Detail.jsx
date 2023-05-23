import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Detail = () => {
    const param = useParams();
    console.log("param", param);

    const nv = useNavigate();
    const [list, setList] = useState();

    const makeList = (data) => {
        console.log("data => " + data);
        return (
            <div>
                <div style={{
                    textAlign: "center",
                }}>
                    <h1>{data.title}</h1>
                </div>
                <div style={{
                    textAlign: "center", 
                }}>
                    <img alt={"../images/"+data.imageFile} src={"../images/" + data.imageFile}></img>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",    
                    gap: "30px",
                    padding: "30px",
                    alignItems: "center",
                }}>
                    <div style={{ textAlign: "right" }}>판매가격</div>
                    <div style={{ textAlign: "left"  }}>{data.price}</div>
                    <div style={{ textAlign: "right" }}>제조사</div>
                    <div style={{ textAlign: "left"  }}>{data.company}</div>
                    <div style={{ textAlign: "right" }}>모델명</div>
                    <div style={{ textAlign: "left"  }}>{data.model}</div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        console.log(2); 
        axios.get(`http://localhost:3300/v1/cart/detail/${param.id}`).then((response) => {
            console.log(response?.data);
            if(response?.data?.cart) {
                const listData = response?.data?.cart;
                setList(makeList(listData));
            }
        })
    }, [])
 
    return (
        <div> 
            <div onClick={() => {
                nv("/");
            }}> 
                {"<-뒤로가기"} 
            </div> 
            <div>
                {list}
            </div>
        </div>
    );
};

export default Detail;