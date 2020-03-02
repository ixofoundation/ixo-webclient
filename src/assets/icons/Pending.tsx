import React from 'react'

const Pending = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M8.5 0C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zm0 15.7c-4 0-7.2-3.2-7.2-7.2s3.2-7.2 7.2-7.2 7.2 3.2 7.2 7.2-3.2 7.2-7.2 7.2zm0-4.9c.3 0 .6-.4.6-1v-5c0-.6-.2-1-.6-1s-.6.5-.6 1v4.9c0 .6.3 1.1.6 1.1zm.8 1.3c0 .4-.4.8-.8.8s-.8-.4-.8-.8.4-.8.8-.8.8.4.8.8z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Pending
