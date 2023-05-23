import React from 'react'

export default function InlineStyleCard({ title, children }) {
  return (
    <div style={{
        borderRadius: 5,
        border: '1px solid #ccc',
        padding: 10,
        boxShadow: '0 4px 8px 0 rgba(0,0,0,2)',
        transition: '0.3s',
    }}>
        <header style={{ padding: 10 }}>
            <h1 style={{ margin: 0}}>{title}</h1>
        </header>
        <div style={{ padding: 10}}>
            {children}
        </div>
    </div>
  )
}