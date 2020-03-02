import React from 'react'

const Medium = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 13.1"
    >
      <path
        d="M17 1.9h-.9c-.2 0-.9.3-.9.5v8.5c0 .2.6.4.9.4h.9v1.9h-6.1v-1.9h1.2V2.5h-.2L9 13.1H6.7L3.9 2.5h-.3v8.8h1.2v1.9H-.1v-1.9h.7c.3 0 .5-.2.5-.4V2.4c0-.2-.3-.5-.5-.5H0V0h6.3l2.1 7.5h.1l2-7.5H17v1.9z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Medium
