/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react'

function CssInJsCard({ title, children }) {
  return (
    <section
        css={css`
            margin: 10px;
            background-color: #bae7ff;
            border-radius: 5px;
            border: 1px solid #1890ff;
            box-shadow: 0 4px 8px 0 #0050b3;
            transition: 0.3s;
            max-width: 300px;
            &:hover {
                box-shadow: 0 8px 16px 0 #0050b3;
            }
        `}
    >
        <header
            css={css`
                border-bottom: 1px solid #999;
                padding: 0.3rem 1rem;
                font-size: 1.5rem;
            `}
        >
            <h1
                css={css`
                    margin: 0;
                `}
            >
                {title}
            </h1>
        </header>
        <div
            css={css`
                padding: 10px;
            `}
        >
            {children}
        </div>

    </section>
  )
}

export default CssInJsCard