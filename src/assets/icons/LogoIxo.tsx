import React from 'react'

const LogoIxo = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 9.9"
    >
      <path
        d="M13.6 7.6c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.6 1.2-1.2 1.2zm0-4.6c-1.9 0-3.4 1.5-3.4 3.4s1.5 3.4 3.4 3.4S17 8.3 17 6.4 15.5 3 13.6 3zM0 3v6.9h2.5V3H0zm6.4 1.7L4.7 3H3v1.7l1.7 1.7L3 8.1v1.7h1.7l1.7-1.7 1.7 1.7h1.7V8.1L8.1 6.4l1.7-1.7V3H8.1L6.4 4.7zM1.2 2.5C.6 2.5 0 1.9 0 1.2S.6 0 1.2 0s1.2.6 1.2 1.2-.5 1.3-1.2 1.3z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default LogoIxo
