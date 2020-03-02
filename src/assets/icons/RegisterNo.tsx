import React from 'react'

const RegisterNo = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16.7"
    >
      <path
        d="M8.5 16.7C3.8 16.7 0 13 0 8.4S3.8 0 8.5 0 17 3.7 17 8.4s-3.8 8.3-8.5 8.3zm1.1-8.1l3.1-3.1c.3-.3.3-.7 0-1-.3-.3-.7-.3-1 0L8.6 7.6 5.5 4.5c-.3-.3-.7-.3-1 0-.3.3-.3.7 0 1l3.1 3.1-3.1 3.1c-.3.3-.3.7 0 1 .3.3.7.3 1 0l3.1-3.1 3.1 3.1c.3.3.7.3 1 0 .3-.3.3-.7 0-1L9.6 8.6z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default RegisterNo
