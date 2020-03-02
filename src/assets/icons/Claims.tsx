import React from 'react'

const Claims = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 19.9"
    >
      <path
        d="M14.7 19.9H2.3c-1.3 0-2.3-1-2.3-2.3V2.3C0 1 1 0 2.3 0h12.3c1.3 0 2.3 1 2.3 2.3v15.3c.1 1.3-.9 2.3-2.2 2.3zM2.3 1.2c-.6 0-1.1.5-1.1 1.1v15.3c0 .6.5 1.1 1.1 1.1h12.3c.6 0 1.1-.5 1.1-1.1V2.3c0-.6-.5-1.1-1.1-1.1H2.3zm1.2 3.7h10.4v1.2H3.5V4.9zm0 2.9h10.4V9H3.5V7.8zm0 3h10.4V12H3.5v-1.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Claims
