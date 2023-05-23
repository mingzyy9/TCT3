import styles from "./Main.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_URL_MAIN_PAGE = "http://localhost:3001/v1/chart/";

function Main() {
  const [category, setCategory] = useState("domestic");
  const [chartList, setChartList] = useState();
  const [originChartList, setOriginChartList] = useState();
  const [time, setTime] = useState("");

  // 검색기능 관련
  const [keyWordHistory, setKeyWordHistory] = useState([]);
  const [historyShow, setHistoryShow] = useState(false);
  const [keywordHistoryList, setKeywordHistoryList] = useState();

  // GRID 관련
  const [grid, setGrid] = useState();

  // 아코디언 관련
  const [isCollapsed, setIsCollapsed] = useState(true);

  // 검색창 Ref
  const keywordRef = useRef("");

  const nv = useNavigate();

  // fetch. Main Page. chart list.
  const fetchData = async () => {
    try {
      console.log("Main Page, chart list fetching");
      console.log(SERVER_URL_MAIN_PAGE + category);
      const { data } = await axios.get(SERVER_URL_MAIN_PAGE + category);
      if (!data) return;
      setChartList(makeList(data.chartList));
      setOriginChartList(data.chartList);
      // GRID
      setGrid(makeDataTable(data.chartList));
    } catch (err) {
      console.log(`ERROR ::::: ${err}`);
    }
  };

  // List 생성 함수
  const makeList = (data) => {
    const list = data.map((item, idx) => {
      return (
        <ul key={idx}>
          <li>
            <div className={styles.contents}>
              <span className={styles.num}>{item.rank}</span>
              <img
                className={styles.img}
                art="img"
                src={`/images/${item.imageUrl}`}
              />
              <span
                className={styles.title}
                onClick={() => {
                  nv(`/detail/${item.id}`);
                }}
              >
                {item.title}
              </span>
              <span className={styles.singer}>{item.singer}</span>
            </div>
          </li>
        </ul>
      );
    });
    return list;
  };

  // 검색기록 list 만드는 함수
  const makeKeywordHistoryList = (data) => {
    const historyList = data.map((item, idx) => {
      return (
        <div key={idx} className={styles.searchedListItem}>
          <li
            className={styles.keyword}
            onClick={() => {
              const filtered = originChartList.filter((list) => {
                return list.title.toLowerCase().includes(item);
              });
              setChartList(makeList(filtered));
              setHistoryShow(false);
            }}
          >
            {item}
          </li>
          {/* 검색기록 삭제버튼 */}
          <button
            onClick={() => {
              const filtered = keyWordHistory.filter((keyword) => {
                return keyword != item;
              });
              setKeyWordHistory(filtered);
            }}
          >
            삭제
          </button>
        </div>
      );
    });
    return historyList;
  };

  // 시계
  const setClock = () => {
    const date = new Date().toLocaleTimeString();
    return date;
  };

  // useEffect
  useEffect(() => {
    fetchData("domestic");
    setInterval(() => {
      setTime(setClock());
    }, 1000);
  }, [category]);

  // useEffect - 검색기록용
  useEffect(() => {
    setKeywordHistoryList(makeKeywordHistoryList(keyWordHistory));
  }, [keyWordHistory]);

  // TODO [추가기능1] 검색 - 시작
  // 검색어 기준 filtering
  const search = () => {
    console.log("input value => " + keywordRef.current.value);
    const searchedList = originChartList.filter((item) => {
      return item.title.toLowerCase().includes(keywordRef.current.value);
    });
    setChartList(makeList(searchedList));
    // keyword 저장
    addKeyword();
  };

  // 검색취소
  const cancelSearch = () => {
    keywordRef.current.value = "";
    fetchData();
    setHistoryShow(false);
  };

  // 검색창 onPress event
  const onKeyPress = (e) => {
    if (e.key === "Enter") search();
  };

  // 검색창 클릭 event
  const onClick = () => {
    // toggle 기능
    if (keyWordHistory.length > 0) {
      setHistoryShow(!historyShow);
    }
    setKeywordHistoryList(makeKeywordHistoryList(keyWordHistory));
  };

  // 검색 키워드 history 추가
  const addKeyword = () => {
    if (keywordRef.current.value !== "") {
      setKeyWordHistory((prev) => [...prev, keywordRef.current.value]);
    }
    setHistoryShow(false);
  };

  // 검색기록 전체 삭제
  const clearKeywords = () => {
    setKeyWordHistory([]);
    setHistoryShow(false);
  };
  // TODO [추가기능1] 검색 - 끝

  // TODO 정렬기능
  // const sortAsc = () => {
  //   chartList.sort((a, b) => a.rank - b.rank);
  // };

  // const sortDesc = () => {
  //   chartList.sort((a, b) => b.rank - a.rank);
  // };

  // TODO [추가기능2] Grid - 시작
  const makeDataTable = (data) => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>순위</th>
            <th>제목</th>
            <th>가수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={`${idx}_${item}`}>
              <td>{item.id}</td>
              <td>{item.rank}</td>
              <td
                onClick={() => {
                  nv(`/detail/${item.id}`);
                }}
              >
                {item.title}
              </td>
              <td>{item.singer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  // TODO [추가기능2] Grid - 끝

  return (
    <div className={styles.App}>
      <div className={styles.wrapper}>
        <span style={{ textAlign: "center" }}>음악차트</span>
        <span style={{ textAlign: "center" }}>
          {!time && <div>시간 설정 중...</div>}
          {time && <div>{time}</div>}
        </span>
        <div>
          <span
            className={styles.category}
            onClick={() => {
              setCategory("domestic");
            }}
          >
            국내
          </span>
          <span
            className={styles.category}
            onClick={() => {
              setCategory("overseas");
            }}
          >
            해외
          </span>
        </div>

        {/* 검색 */}
        <div>
          <input
            ref={keywordRef}
            type="text"
            onKeyPress={onKeyPress}
            onClick={onClick}
            // onChange={onChange}
            placeholder="제목검색"
          />
          <button onClick={search}>검색</button>
          <button onClick={cancelSearch}>검색취소</button>
          <button onClick={clearKeywords}>검색기록 초기화</button>

          {/* 검색기록 영역 */}
          {historyShow && (
            <div className={styles.historyBox}>
              <div className={styles.history}>
                <ul>{keywordHistoryList}</ul>
              </div>
            </div>
          )}
        </div>

        {/* 정렬 */}
        {/* <div>
          <button onClick={sortAsc}>정렬_오름차순</button>
          <button onClick={sortDesc}>정렬_내림차순</button>
        </div> */}

        {chartList}

        {/* GRID 영역 */}
        <div>{grid}</div>

        {/* 아코디언 영역 */}
        <div>
          <button
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            아코디언
          </button>
          <div
            aria-expanded={isCollapsed}
            style={{ display: isCollapsed ? "block" : "none" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
