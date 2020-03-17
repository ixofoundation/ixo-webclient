import React from 'react'

const Location = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 .35a6.34 6.34 0 00-6.28 6.36 7.85 7.85 0 00.51 2.59 39.86 39.86 0 005.47 8.2.38.38 0 00.6 0 39.86 39.86 0 005.47-8.2 6.24 6.24 0 00.51-2.59A6.34 6.34 0 009 .35zm0 9.39a3.19 3.19 0 01-3.18-3.11A3.2 3.2 0 019 3.46a3.15 3.15 0 013.18 3.17A3.19 3.19 0 019 9.74z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Location
