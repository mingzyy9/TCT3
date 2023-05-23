import React from 'react'
import './SassCard.scss'

function SassCard({ title, children }) {
  return (
    <div className='SassCard'>
        <header><h1>{title}</h1></header>
        <div className='content'>{children}</div>
    </div>
  )
}

export default SassCard