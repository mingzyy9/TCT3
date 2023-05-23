import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [list, setList] = useState();
    const nv = useNavigate();

    const makeList = (data) => {
        let count = 0;
        let price = 0;
        const result = data.map((item) => {
            console.log("item ==> " + item);
            count ++;
            price = price + item.price;
            console.log("price => " + price);
            return (
                <div
                  key={item.id}
                  style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3fr 1fr",
                      gap: "20px",
                      padding: "20px",
                  }}
                  onClick={() => {
                      nv(`/detail/${item.id}`);
                  }}>    
                    <div><img alt={"/img/"+ item.imageFile} src={"/img/"+ item.imageFile}></img></div>             
                    <div style={{textAlign: "left"}}>{item.title}</div>
                    <div style={{textAlign: "right"}}>{Number(item.price).toLocaleString()}</div>
                </div>
            )
        })
        
        setTotalCount(count);
        setTotalPrice(price);

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
        <div style={{ width: "480px",  margin: "auto", }}>
            <div style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", padding: "20px", }}>
                장바구니
            </div>
            <div>
                {list}
            </div>
            <div style={{ textAlign: "center", padding: "10px", }}>
                ※ 배송비 3,000원 (총 상품금액 5만원 이상 무료배송)
            </div>
            <div style={{ marginLeft : "auto", width: "50%", padding: "10px", }}>
                <div style= {{ display : "flex", flexDirection: "row", padding: "10px", }}>
                    <div style= {{ fontWeight: "bold", }}>총 상품금액</div>
                    <div style={{ marginLeft : "auto", }}>{totalPrice.toLocaleString()}</div>
                </div>
                <div style= {{ display : "flex", padding: "10px", }}>
                    <div style= {{ fontWeight: "bold", }}>배송비</div>
                    <div style={{ marginLeft : "auto", }}>
                        {Number(totalPrice) >= 50000 ? 0 : (3000).toLocaleString()}
                    </div>
                </div>
                <div style= {{ display : "flex", padding: "10px", }}>
                    <div style= {{ fontWeight: "bold" }}>총 결제금액</div>
                    <div style={{ marginLeft : "auto", }}>({totalCount}개) {totalPrice.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
};

export default Main; 