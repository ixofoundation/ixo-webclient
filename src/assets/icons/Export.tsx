import React from 'react'

const Export = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 18"
    >
      <path
        d="M2 6h3.3c.4 0 .7.3.7.6s-.4.7-.8.7H2c-.4 0-.7.3-.7.6v8.2c0 .3.3.6.7.6h13.1c.4 0 .7-.3.7-.6V7.9c0-.3-.3-.6-.7-.6h-3.3c-.4 0-.7-.3-.7-.6s.3-.6.7-.6L15 6c1.1 0 2 .8 2 1.9v8.2c0 1-.9 1.9-2 1.9H2c-1.1 0-2-.8-2-1.9V7.9C0 6.8.9 6 2 6zm2.7 2.8c.3-.2.7-.2.9 0l2.2 2V.5c0-.2.3-.5.7-.5.4 0 .7.3.7.6v10.3l2.2-2c.3-.2.7-.2.9 0 .2.2.2.6 0 .9l-3.3 3c-.3.2-.7.2-.9 0L4.7 9.7c-.3-.2-.3-.6 0-.9z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Export
