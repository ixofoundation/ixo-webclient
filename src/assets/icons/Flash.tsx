import React from 'react'

const Flash = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 30"
    >
      <path
        d="M17 10.3c-.1-.2-.3-.3-.5-.3h-5.9L16.5.8c.1-.1.1-.3 0-.5S16.2 0 16 0H8c-.2 0-.4.1-.5.3L0 15.3v.4c.1.2.3.3.5.3h5.1L0 29.3c0 .3 0 .6.2.7h.3c.1 0 .3-.1.4-.2l16-19c.1-.1.1-.3.1-.5z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Flash
