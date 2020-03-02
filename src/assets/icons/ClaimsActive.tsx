import React from 'react'

const ClaimsActive = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 19.9"
    >
      <path
        d="M15.3 0H1.7C.7 0 0 .8 0 1.7v16.5c0 .9.8 1.7 1.7 1.7h13.5c1 0 1.7-.8 1.7-1.7V1.7c.1-1-.7-1.7-1.6-1.7zm-1.4 12H3.5v-1.2h10.4V12zm0-2.9H3.5V7.9h10.4v1.2zm0-3H3.5V4.9h10.4v1.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ClaimsActive
