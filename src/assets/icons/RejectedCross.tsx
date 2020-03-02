import React from 'react'

const RejectedCross = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M8.5 0C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zm0 15.7c-4 0-7.2-3.2-7.2-7.2s3.2-7.2 7.2-7.2 7.2 3.2 7.2 7.2-3.2 7.2-7.2 7.2zm1.1-7.2l2.7-2.7c.2-.2.2-.3.2-.5s-.1-.4-.2-.5c-.2-.2-.7-.2-1.1 0L8.5 7.5 5.8 4.8c-.3-.3-.7-.3-1.1 0-.1.1-.2.3-.2.5s.1.3.2.5l2.7 2.7-2.7 2.7c-.2.2-.2.3-.2.5s.1.4.2.5c.2.2.7.2 1.1 0l2.7-2.7 2.7 2.7c.2.2.3.2.5.2s.4-.1.5-.2c.2-.2.2-.3.2-.5s-.1-.4-.2-.5L9.6 8.5z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default RejectedCross
