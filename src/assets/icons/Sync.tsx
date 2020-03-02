import React from 'react'

const Sync = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 12.1"
    >
      <path
        d="M8.5 0C6.9 0 5.7.5 4.6 1.7c-.4.3-.4.8 0 1.1.3.3.8.3 1.1 0 .9-.9 1.6-1.2 2.8-1.2 1.2 0 2.3.5 3.1 1.3.8.8 1.2 1.7 1.3 2.8l-1-1c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1l3 3 3-3c.1-.1.2-.3.2-.5s-.1-.4-.2-.6c-.3-.3-.8-.3-1.1 0l-1.1 1.1c-.1-1.6-.6-2.9-1.8-4C11.6.6 10.1 0 8.5 0zm0 10.5c-1.2 0-2.3-.5-3.1-1.3-.9-.8-1.3-1.7-1.3-2.8l1 1c.3.3.8.3 1.1 0 .2-.2.2-.4.2-.6s0-.3-.2-.5l-3-3-3 3c-.3.3-.3.8 0 1.1s.8.3 1.1 0l1.1-1.1c.1 1.6.6 2.9 1.8 4 1.1 1.1 2.7 1.8 4.3 1.8 1.6 0 2.8-.5 3.9-1.7.2-.2.2-.4.2-.6s-.1-.4-.2-.6c-.3-.3-.8-.3-1.1 0-.9 1-1.6 1.3-2.8 1.3z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Sync
