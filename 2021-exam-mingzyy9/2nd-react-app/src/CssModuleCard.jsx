import React from 'react'
import styles from './CssModuleCard.module.css'

function CssModuleCard({ title, children }) {
  return (
    <div className={styles.CssModuleCard}>
        <header><h1>{title}</h1></header>
        <div className={styles.content}>{children}</div>
    </div>
  )
}

export default CssModuleCard