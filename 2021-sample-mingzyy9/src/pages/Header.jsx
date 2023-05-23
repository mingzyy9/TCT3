import moment from "moment";

const Header = () => {
    return (
        <div style={{
            textAlign: 'center',
        }}>
            <h1>음악 차트</h1>
            <h3>{moment().format("YYYY년 M월 D일 HH:00")}</h3>
        </div>

    );

} 

export default Header;