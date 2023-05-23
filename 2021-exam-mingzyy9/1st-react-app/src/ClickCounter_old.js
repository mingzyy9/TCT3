import React from 'react'

export default class ClickCounter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ClickCounter : props.initialClickCount || 0
        }
    }

    handlelClick = (incrementalCount) => {
        this.setState({
            ClickCounter : this.state.ClickCounter + incrementalCount
        })
    }

    handleResetClick = () => {
        this.setState({
            ClickCounter : 0
        })
    }

    render() {
        return (
            <div className='ClickCounter'>
                <div>클릭한 횟수 : {this.state.ClickCounter}</div>
                <button onClick={() => this.handlelClick(1)}>클릭!!!</button>
                <button onClick={() => this.handlelClick(10)}>클릭!!!</button>
                <button onClick={this.handleResetClick}>초기화</button>
            </div>
        )
    }
}