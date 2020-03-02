import React from 'react'

const Down = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 9.7"
    >
      <path
        d="M8.5 9.7c-.3 0-.6-.1-.8-.3L.3 2C-.1 1.6-.1.9.3.4S1.4 0 1.9.4L8.5 7 15.1.3c.4-.4 1.1-.4 1.6 0 .4.4.4 1.1 0 1.6L9.3 9.3c-.2.3-.5.4-.8.4z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Down
