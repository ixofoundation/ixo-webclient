import React from 'react'

const HomeActive = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 15.8"
    >
      <path
        d="M16.9 8.6L13 4.5V1.8c0-.3-.2-.5-.5-.5s-.5.2-.5.5v1.7L8.8.1c-.1 0-.1-.1-.2-.1h-.1l-.1.1c-.1 0-.2.1-.3.1l-8 8.4c-.2.2-.2.5 0 .7.1.2.5.2.6 0l1.1-1.1v7.1c0 .3.2.5.5.5h3.8c.3 0 .5-.2.5-.5v-3.6h3v3.4c0 .3.2.5.5.5h3.8c.3 0 .5-.2.5-.5V7.6l1.7 1.8c.1.1.2.1.4.1.1 0 .2-.1.4-.1.1-.3.2-.6 0-.8z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default HomeActive
