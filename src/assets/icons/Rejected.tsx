import React from 'react'

const Rejected = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M8.5 16.5c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zM8.5 0C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zm2.9 10.7l-.8.8-2.1-2.3-2.2 2.2-.7-.7 2.2-2.2-2.3-2.2.7-.7 2.2 2.2 2.2-2.2.7.7-2.1 2.2 2.2 2.2zm-.7-5.9L8.5 7 6.3 4.8 4.8 6.3 7 8.5l-2.2 2.2L6.1 12l.2.2L8.5 10l2 2 .2.2 1.5-1.5L10 8.5l2.2-2.2-1.5-1.5z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Rejected
