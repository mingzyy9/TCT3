import { useState, useEffect } from "react";
import axios from 'axios'
import "./res/index.css";

const USER_NO = 'ME00001'

function App() {

  const [userName, setUserName] = useState('')
  const [filter, setFilter] = useState(1) //(1: 1주일, 2: 1개월,  3: 3개월)
  const [summary, setSummary] = useState({})
  const [details, setDetails] = useState([])

  const getUserName = () => {
    axios.get(`http://localhost:8080/api/v1/user/${USER_NO}`)
      .then(response => {
        setUserName(response.data?.name)
      })
  }

  const getSummary = () => {
    axios.get(`http://localhost:8080/api/v1/user/${USER_NO}/usage/summary?ptype=${filter}`)
      .then(response => {
        setSummary(response.data)
      })
  }

  const getDetails = () => {
    axios.get(`http://localhost:8080/api/v1/user/${USER_NO}/usage?ptype=${filter}`)
      .then(response => {
        setDetails(response.data?.list)
      })
  }

  const splitFloat = (f) => {
    f = f*100;
    return f/100 + "." + f%100
  }

  useEffect(()=>{
    getUserName()
    getSummary();
    getDetails();
  },[])

  useEffect(()=>{
    console.log('Filter change => ' + filter);
    //데이터 가져오기
    getSummary();
    getDetails();
  },[filter])



  return (
    <div>
      <div className="main-title">
        <h1>서비스 이용내역</h1>
        <div>{userName}</div>
      </div>
      <hr />

      <div className="service-summary">
        <div className="service-summary-tab">
          <button className={filter == 1 ? 'tablinks on' : 'tablinks'} onClick={()=>{setFilter(1)}}>1주일</button>
          <button className={filter == 2 ? 'tablinks on' : 'tablinks'} onClick={()=>{setFilter(2)}}>1개월</button>
          <button className={filter == 3 ? 'tablinks on' : 'tablinks'} onClick={()=>{setFilter(3)}}>3개월</button>
        </div>
        <div className="spacer-20"></div>
        <div className="service-summary-detail-container">
          <div className="color-gray">이용건수</div>
          <div>{summary?.usage_count}</div>
          <div className="color-gray">이용시간</div>
          <div>{summary?.usage_minute}분</div>
          <div className="color-gray">이동거리</div>
          <div>{splitFloat(summary?.usage_meter)}km</div>
          <div className="color-gray">탄소절감효과</div>
          <div>{splitFloat(summary?.carbon_reduction)}kg</div>
        </div>
      </div>

      <hr />

      {
        details.length == 0 ?
        (
          <div className="service-empty">
            <div className="service-empty-container">
              <div className="service-empty-message">
                조회된 정보가 없습니다.
              </div>
            </div>
          </div>
        )
        :
        (
          <div class="service-list-container">
            {
              details?.sort((a, b)=>{
                return (a?.pay_datetime).replaceAll('.','').replaceAll(' ','').replaceAll('~','').replaceAll(':','') > (b?.pay_datetime).replaceAll('.','').replaceAll(' ','').replaceAll('~','').replaceAll(':','')
              })?.map((d) => {
                  (
                    <div class="service-list-content">
                      <div class="service-list-header">
                        <span>{d?.use_distance}km</span>
                        <span class="color-gray ml-10">{d?.use_time}분</span>
                      </div>
                      <div class="service-list-body">
                        <div class="color-gray">이용시간</div>
                        <div>{d?.use_start_dt} ~ {d?.use_end_dt}</div>
                        <div class="color-gray">결제일시</div>
                        <div>{d?.pay_datetime}</div>
                        <div class="color-gray">결제수단</div>
                        <div>{d?.card_pay > 0 && 카드 d?.card_pay원 + }포인트 {d?.point_pay}P</div>
                      </div>
                    </div>
                    <hr />
                  )
              })
            }
          </div>
        )
      }

    </div>
  );
}

export default App;
