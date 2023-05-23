import styled from '@emotion/styled/macro'
import React from 'react'

const CardWrapper = styled.section`
    margin: 10px;
    background-color: #ffccc7;
    border-radius: 5px;
    border: 1px solid #ff7875;
    box-shadow: 0 4px 8px 0 #cf1322;
    transition: 0.3s;
    max-width: 300px;
    &:hover {
        box-shadow: 0 8px 16px 0 #cf1322;
    }
`
const CardHeader = styled.header`
    border-bottom: 1px solid #999;
    padding: 0.3rem 1rem;
    font-size: 1.5rem;
    h1 {
        margin: 0;
    }
`

const CardContent = styled.div`
    padding: 10px;
`
function CssInJsCard2({ title, children }) {
  return (
    <CardWrapper>
        <CardHeader>
            <h1>{title}</h1>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </CardWrapper>
  )
}

export default CssInJsCard2