import React from 'react'

const Flash = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 22.7"
    >
      <path
        d="M17 14c0 4.8-3.8 8.6-8.5 8.6S0 18.8 0 14C0 9.6 7 1.3 7.8.4l.1-.1c.3-.4.9-.4 1.3 0l.1.1C10 1.3 17 9.6 17 14zM8.9 3.1c-.2-.3-.6-.3-.9 0-1.8 2.2-4.3 5.7-5.5 8.5.4-.3.9-.5 1.5-.6 2.1-.4 4.4.7 6.5 3.5.4.4.9.8 1.4 1.2.5.4 1 .6 1.5.6.4 0 .6 0 .8-.2.3-.3.6-.8.9-2-.1-2.8-3.8-8-6.2-11z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Flash
