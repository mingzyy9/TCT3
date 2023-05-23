import React from "react";
import ClickCounter from "./ClickCounter";
import Layout from "./Layout";

export default function App() {
  return (
    <Layout>
      <h1>Hello!</h1>
      <p>React is fun !!</p>
      <ClickCounter />
    </Layout>
  )
}