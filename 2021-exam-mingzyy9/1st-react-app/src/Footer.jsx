import React from "react";

export default function Footer({ now }){
    return (
        <footer>current time: {now.toString()}</footer>
    )
}