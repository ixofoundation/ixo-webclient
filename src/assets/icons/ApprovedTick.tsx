import React from 'react'

const ApprovedTick = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      viewBox="0 0 17 12.3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8 1.4L6 12c-.3.3-.9.3-1.2 0L.2 7.6c-.3-.3-.3-.9 0-1.2.3-.3.9-.3 1.2 0l3.9 3.8L15.5.2c.3-.3.9-.3 1.2 0s.4.9.1 1.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ApprovedTick
