import React from 'react'

const Kyc = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 19.4"
    >
      <path
        d="M15.6 19.4H17c0-4.8-3.8-8.7-8.5-8.7S0 14.6 0 19.4h1.4c0-4 3.2-7.3 7.1-7.3s7.1 3.3 7.1 7.3zM8.3 1.3c2 0 3.6 1.6 3.6 3.6s-1.6 3.6-3.6 3.6-3.6-1.7-3.6-3.6 1.6-3.6 3.6-3.6zm0 8.4c2.7 0 4.9-2.2 4.9-4.9S10.9 0 8.3 0 3.4 2.2 3.4 4.9s2.2 4.8 4.9 4.8z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Kyc
