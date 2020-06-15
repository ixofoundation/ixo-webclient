import React from 'react'

const LongText = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9749 12.1866H0.724854V14.1866H11.9749V12.1866ZM18.7249 4.18655H0.724854V6.18655H18.7249V4.18655ZM0.724854 10.1866H18.7249V8.18655H0.724854V10.1866ZM0.724854 0.186554V2.18655H18.7249V0.186554H0.724854Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default LongText
