import React from 'react'

const Info = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M8.5 0C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zm0 15.5c-3.8 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.2 7-7 7zm.8-8.3v5.1c0 .4-.1.6-.3.8-.2.2-.4.3-.6.3s-.5-.1-.6-.3c-.2-.2-.2-.4-.2-.8v-5c0-.3.1-.6.2-.8.2-.2.4-.3.6-.3s.5.1.6.3c.2.2.3.4.3.7zm-.9-1.8c-.2 0-.4-.1-.6-.2s-.3-.4-.3-.7c0-.2.1-.5.3-.6.2-.1.4-.2.6-.2.2 0 .4.1.6.2s.3.4.3.6c0 .3-.1.5-.3.7s-.4.2-.6.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Info
