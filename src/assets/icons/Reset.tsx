import React from 'react'

const Reset = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 14.6"
    >
      <path
        d="M11.3 7.3c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6c0 .9.7 1.6 1.6 1.6.9 0 1.6-.7 1.6-1.6zM9.7 0c-4 0-7.3 3.3-7.3 7.3H0l3.2 3.2 3.2-3.2H4c0-3.1 2.5-5.7 5.7-5.7 3.1 0 5.7 2.5 5.7 5.7 0 3.1-2.5 5.7-5.7 5.7-1.2 0-2.4-.4-3.3-1.1l-1.1 1.2c1.2.9 2.7 1.5 4.4 1.5 4 0 7.3-3.3 7.3-7.3S13.7 0 9.7 0z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Reset
