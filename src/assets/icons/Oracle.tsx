import React from 'react'

const Oracle = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 36}
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || '#fff'}
        d="M9,.6,1.73,4.8v8.4L9,17.4l7.27-4.2V4.8ZM13.59,9A4.59,4.59,0,1,1,9,4.41,4.6,4.6,0,0,1,13.59,9ZM9,6.9A2.1,2.1,0,1,1,6.9,9,2.1,2.1,0,0,1,9,6.9Z"
      />
    </svg>
  )
}

export default Oracle
