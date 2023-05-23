import React, { useState } from 'react'

export default function ClickCounter() {
    const [clickCount, setClickCount] = useState(0)

    const handlelClick = (incrementalCount) => {
        setClickCount(clickCount + incrementalCount)
    }

    const handleResetClick = () => {
        setClickCount(0)
    }

    return (
        <div className='ClickCounter'>
            <div>클릭한 횟수 : {clickCount}</div>
            <button onClick={() => handlelClick(1)}>클릭!!!</button>
            <button onClick={() => handlelClick(10)}>클릭!!!</button>
            <button onClick={handleResetClick}>초기화</button>
        </div>
    )
}