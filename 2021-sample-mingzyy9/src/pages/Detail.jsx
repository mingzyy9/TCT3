import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Detail = () => {
    const params = useParams();
    const nv = useNavigate();
    const [list, setList] = useState();

    const makeList = (data) => {
        return (
            <div>
                <div style={{
                    textAlign: "center",
                }}>
                    <h1>{data.title}</h1>
                    <h3>{data.singer}</h3>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 4fr",
                    gap: "50px",
                    padding: "100px",
                }}> 
                    <div style={{ textAlign: "right" }}>작사</div>
                    <div style={{ textAlign: "left"  }}>{data.lyricist}</div>
                    <div style={{ textAlign: "right" }}>작곡</div>
                    <div style={{ textAlign: "left"  }}>{data.melodizer}</div>
                    <div style={{ textAlign: "right" }}>장르</div>
                    <div style={{ textAlign: "left"  }}>{data.genre}</div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        console.log(2); 
        axios.get("http://localhost:3300/v1/chart/detail/" + params.id).then((response) => {
            console.log(response?.data);
            if(response?.data?.chart) {
                const listData = response?.data?.chart;
                setList(makeList(listData));
            }
        })
    }, [])
 
    return (
        <div> 
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