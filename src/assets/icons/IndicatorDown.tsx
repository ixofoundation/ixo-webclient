import React from 'react'

const IndicatorDown = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 12.8"
    >
      <path d="M8.5 12.8L17 0H0l8.5 12.8z" fill={props.fill || '#fff'} />
    </svg>
  )
}

export default IndicatorDown
