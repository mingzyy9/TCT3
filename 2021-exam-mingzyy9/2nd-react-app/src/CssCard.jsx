import React from 'react'
import './CssCard.css'

function CssCard({ title, children }) {
  return (
    <div className='CssCard'>
        <header><h1>{title}</h1></header>
        <div className='content'>{children}</div>
    </div>
  )
}

export default CssCard