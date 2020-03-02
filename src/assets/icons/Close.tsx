import React from 'react'

const Close = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M7 8.5L.3 15.2c-.4.4-.4 1.1 0 1.5.4.4 1.1.4 1.5 0L8.5 10l6.7 6.7c.4.4 1.1.4 1.5 0 .4-.4.4-1.1 0-1.5L10 8.5l6.7-6.7c.4-.4.4-1.1 0-1.5-.2-.2-.5-.3-.8-.3s-.5.1-.8.3L8.5 7 1.8.3C1.6.1 1.3 0 1.1 0S.5.1.3.3c-.4.4-.4 1.1 0 1.5L7 8.5z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Close
