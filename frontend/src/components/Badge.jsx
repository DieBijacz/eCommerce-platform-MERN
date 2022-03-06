import React from 'react'

const Badge = ({color, text}) => {
  return (
    <div className='badge' style={{backgroundColor: `${color}`}}>
      {text}
    </div>
  )
}

export default Badge