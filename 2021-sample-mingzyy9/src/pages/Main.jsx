import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../pages/Header';
import './Main.css'

const Main = () => {
    const [type, setType] = useState(0);
    const [list, setList] = useState();
    const nv = useNavigate();

    const tabClickHandler = (index) => {
        console.log(index);
        setType(index);
    }

    const makeList = (data) => {
        const result = data.map((item) => {
            return (
                <div
                  key={item.id}
                  style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 5fr 25fr 15fr",
                      gap: "20px",
                      padding: "20px",
                      alignItems: "center",
                  }}
                  onClick={() => {
                      nv(`/detail/${item.id}`);
                  }}> 
                    <div>{item.rank}</div>
                    <div><img alt={"../images/"+item.imageUrl} src={"../images/" + item.imageUrl}></img></div>
                    <div className="overflowClass" style={{textAlign: "left"}}>{item.title}</div>
                    <div className="overflowClass" style={{textAlign: "right"}}>{item.singer}</div>
                </div>
            )
        })
        return result;
    }

    useEffect(() => {
        console.log(1);
        console.log("type ==> " + type);
        const chartType = type == 0 ? 'domestic' : 'overseas';
        axios.get(`http://localhost:3300/v1/chart/${chartType}`).then((response) => {
            console.log(response?.data);
            if(response?.data?.chartList) {
                const listData = response?.data?.chartList;
                setList(makeList(listData));
            }
        });
    }, [type])

    return (
        <div>
            <Header />
            <div className="menuBar">
                <ul className="tabs">
                    <li className={type === 0 ? 'active' : ''} onClick={() => tabClickHandler(0)}>국내</li>
                    <li className={type === 1 ? 'active' : ''} onClick={() => tabClickHandler(1)}>해외</li>
                </ul>  
            </div>
            {list}
            {/*<Link to="/detail/mingzyy">Go to Detail page</Link>*/}
        </div>
    );
};

export default Main; 