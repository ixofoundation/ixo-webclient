import React from 'react'

const RegistrationYes = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16.7"
    >
      <path
        d="M8.5 16.7C3.8 16.7 0 13 0 8.4S3.8 0 8.5 0 17 3.7 17 8.4s-3.8 8.3-8.5 8.3zM3.7 8.8l.1.2 2.9 3c.1.1.1.1.3.1.1 0 .2 0 .3-.1l6-6c.1-.1.1-.4 0-.5l-.6-.5c-.1-.1-.4-.1-.5 0l-5 5.1c-.1.1-.2.1-.3 0L4.8 7.9c-.1-.1-.4-.1-.5 0l-.6.4c0 .1-.1.2-.1.3 0 .1.1.2.1.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default RegistrationYes
