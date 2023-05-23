import React, { Component } from "react";

export default class AwesomeGreeting extends Component {
    render() {
        return (
            <div>
                Hello, {this.props.username}!!
            </div>
        )
    }
}