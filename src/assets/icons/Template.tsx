import React from 'react'

const Template = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.9 7.33h4.21v9.25H6.9zm5.89 9.25h2.52A1.69 1.69 0 0017 14.89V7.32h-4.21v9.26zm2.52-15.16H2.69A1.69 1.69 0 001 3.11v2.52h16V3.11a1.69 1.69 0 00-1.69-1.69zM1 14.89a1.69 1.69 0 001.69 1.69h2.52V7.32H1v7.57z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Template
