import React from 'react'

const EyeOff = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 15"
    >
      <path
        d="M16.2 8.1c-.9 1.1-2.1 2.1-3.3 2.7-.4.2-.8.3-1.1.5 1-.9 1.6-2.1 1.6-3.5s-.6-2.7-1.6-3.5c.4.1.8.3 1.1.5 1.3.6 2.5 1.6 3.3 2.7.2.1.2.4 0 .6zm-7.7 3.7c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1zm-4.4-1C2.8 10.2 1.6 9.2.8 8.1c-.2-.2-.2-.5 0-.8.9-1.1 2.1-2.1 3.3-2.7.4-.2.8-.4 1.1-.5-.9.9-1.5 2.2-1.5 3.6s.6 2.7 1.6 3.5c-.4-.1-.8-.2-1.2-.4zm12.6-3.9c-1-1.2-2.2-2.2-3.6-2.9-1.4-.6-2.9-1-4.5-1h-.3c-1.5 0-3.1.4-4.5 1S1.2 5.7.3 6.9c-.4.5-.4 1.1 0 1.6 1 1.2 2.2 2.2 3.6 2.9 1.4.7 2.9 1.1 4.5 1.1h.3c1.6 0 3.1-.4 4.5-1.1s2.6-1.7 3.6-2.9c.3-.5.3-1.1-.1-1.6zM8.5 8.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm0-2.9c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8zM12.9.4L4.5 14.6 12.9.4zM4.5 15h-.2c-.2-.1-.2-.4-.2-.6L12.4.1c.2-.1.5-.1.7-.1.2.1.2.4.2.6L4.9 14.8c-.1.2-.2.2-.4.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default EyeOff
