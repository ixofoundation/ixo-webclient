import React from 'react'

const Expand = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 15.1"
    >
      <path
        d="M1.7 12.8V3.1C.7 3.5 0 4.3 0 5.3v7.6c0 1.3 1.1 2.3 2.6 2.3h8.5c1.1 0 2.1-.6 2.4-1.5H2.6c-.5-.1-.9-.4-.9-.9zM14.4 0H5.9C4.5 0 3.4 1 3.4 2.3v7.6c0 1.3 1.1 2.3 2.6 2.3h8.5c1.4 0 2.6-1 2.6-2.3V2.3C17 1 15.9 0 14.4 0zm.9 9.8c0 .4-.4.8-.8.8H5.9c-.5 0-.8-.3-.8-.8V2.3c0-.4.4-.8.8-.8h8.5c.5 0 .8.3.8.8v7.5h.1z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Expand
