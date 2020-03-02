import React from 'react'

const Location = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 23.4"
    >
      <path
        d="M8.5 0C3.8 0 0 3.9 0 8.6c0 1.2.3 2.4.7 3.5 2.1 4.7 6.2 9.7 7.4 11.1.1.1.2.2.4.2s.3-.1.4-.2c1.2-1.4 5.3-6.4 7.4-11.1.5-1.1.7-2.3.7-3.5C17 3.9 13.2 0 8.5 0zm0 12.7c-2.3 0-4.3-1.9-4.3-4.2 0-2.3 1.9-4.3 4.3-4.3s4.3 1.9 4.3 4.3c0 2.3-2 4.2-4.3 4.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Location
