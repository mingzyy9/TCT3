import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Main.css'

const Main = () => {
    const [list, setList] = useState();
    const [total, setTotal] = useState(0);
    const [shipPrice, setShipPrice] = useState(3000);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const nv = useNavigate();

    const makeList = (data) => {
        let t = 0;
        let tp = 0;
        let sp = 3000;
        const result = data.map((item) => {
            tp = tp + Number(item.price);
            t ++;
            return ( 
                <div
                  key={item.id}
                  style={{
                      display: "grid",
                      gridTemplateColumns: "3fr 7fr 3fr",
                      gap: "20px",
                      padding: "20px",
                      alignItems: "center",
                  }}
                  onClick={() => {
                      nv(`/detail/${item.id}`);
                  }}> 
                    <div style={{ textAlign: "center", }}><img alt={"../images/"+item.imageUrl} src={"../images/" + item.imageFile}></img></div>
                    <div>{item.title}</div>
                    <div>{Number(item.price).toLocaleString('ko-KR')}</div>
                </div>
            )
        })
        setTotal(t); 
        
        tp >= 50000 ? sp=0 : sp=3000;
        //console.log("tp ==> " + tp + ", tp >= 50000? " + (tp>=50000));
        tp += Number(sp);
        setShipPrice(sp.toLocaleString('ko-KR'));
        setTotalPrice(tp.toLocaleString('ko-KR'));
        return result;
    }

    useEffect(() => {
        console.log(1);
        axios.get(`http://localhost:3300/v1/cartList`).then((response) => {
            console.log(response?.data);
            if(response?.data?.cartList) {
                const listData = response?.data?.cartList;
                setList(makeList(listData));
            }
        });
    }, [])

    return (
        <div style={{ margin: "auto", }}>
            <div className='cartTitle'>장바구니</div>
            <div>{list}</div>
            <div style={{ textAlign: "center", padding: "10px", }}>
                ※ 배송비 3,000원 (총 상품금액 5만원 이상 무료배송)
            </div>
            <div style={{ marginLeft: "auto", width: "50%", padding: "10px" }}>
                <div style={{ display:"flex", flexDirection:"row"}}>
                    <div>총 상품금액</div>
                    <div style={{ marginLeft: "auto" }}>
                        {totalPrice}
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div>배송비</div>
                    <div style={{ marginLeft: "auto" }}>
                        {shipPrice}
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div>총 결제금액</div>
                    <div style={{ marginLeft: "auto" }}>
                        ({total}개) {totalPrice} 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main; 