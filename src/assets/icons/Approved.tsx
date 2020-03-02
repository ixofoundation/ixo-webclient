import React from 'react'

const Approved = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 8.8c-.2 4.7-4.1 8.3-8.8 8.2-4.7-.2-8.4-4.1-8.2-8.8C.2 3.5 4.1-.2 8.8 0c4.7.2 8.4 4.1 8.2 8.8zm-1.3 0c.2-4-2.9-7.3-6.9-7.4-4-.2-7.3 2.9-7.4 6.9-.2 4 2.9 7.3 6.9 7.4 3.9.1 7.2-3 7.4-6.9zM3.3 8.7l.1.1L6.2 12c.1.1.1.1.3.1.1 0 .2 0 .3-.1L13 6.2c.2-.1.2-.4 0-.5l-.5-.5c-.1-.2-.4-.2-.5 0L6.7 10h-.3l-2-2.2c-.1-.2-.4-.2-.5 0l-.5.4c-.1 0-.2.1-.2.2s.1.2.1.3z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Approved
