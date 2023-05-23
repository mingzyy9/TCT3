import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Detail = () => {
    const params = useParams();
    console.log("params : " + params);
    const nv = useNavigate();
    const [list, setList] = useState();

    const makeList = (data) => {
        console.log("data ==> " + data);
        return (
            <div>
                <div style={{
                    textAlign: "center",
                }}>
                    <h1>{data.title}</h1>  
                    <img alt={`/img/${data.imageFile}`}  src={"/img/"+ data.imageFile}></img>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "30px",
                    padding: "50px", 
                }}>
                    <div style={{ textAlign: "right", fontWeight: "bold", }}>판매가격</div>
                    <div style={{ textAlign: "left"  }}>{data.price.toLocaleString()}</div>
                    <div style={{ textAlign: "right", fontWeight: "bold", }}>제조사</div>
                    <div style={{ textAlign: "left"  }}>{data.company}</div>
                    <div style={{ textAlign: "right", fontWeight: "bold", }}>모델명</div>
                    <div style={{ textAlign: "left"  }}>{data.model}</div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        console.log(2); 
        axios.get(`http://localhost:3300/v1/item/${params.id}`).then((response) => {
            console.log(response?.data);
            if(response?.data?.item) {
                const listData = response?.data?.item;
                setList(makeList(listData));
            }
        })
    }, [])
  
    return (
        <div style={{ width: "480px", margin: "auto", }}> 
            <div onClick={() => {
                nv("/");
            }}> 
                {"<-"} 
            </div>
            {list}
        </div>
    );
};

export default Detail;