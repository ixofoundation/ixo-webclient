import React from 'react'

const Facebook = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 31.9"
    >
      <path
        d="M16.4 0h-4.1C7.7 0 4.7 3.1 4.7 7.8v3.6H.6c-.4 0-.6.3-.6.7v5.2c0 .4.3.7.6.7h4.1v13.2c0 .4.3.6.6.6h5.3c.4 0 .6-.3.6-.6V18H16c.4 0 .6-.3.6-.6v-5.2c0-.2-.1-.3-.2-.5-.1-.1-.3-.2-.5-.2h-4.8V8.4c0-1.5.3-2.2 2.2-2.2H16c.4 0 .6-.3.6-.6V.7c.4-.4.1-.7-.2-.7z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Facebook
