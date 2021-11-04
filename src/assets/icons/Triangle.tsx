import React from 'react'

const Triangle = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 11}
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.15 2.06365L9.7 7L1.15 11.9363V2.06365Z"
        stroke="#00D2FF"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export default Triangle
