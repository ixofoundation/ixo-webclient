import React from 'react'

const IndicatorUp = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 12.8"
    >
      <path d="M8.5 0L17 12.8H0L8.5 0z" fill={props.fill || '#fff'} />
    </svg>
  )
}

export default IndicatorUp
