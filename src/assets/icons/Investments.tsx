import React from 'react'

const Investments = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 36}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        fill={props.fill || '#fff'}
        d="M9,.62,1.75,4.81v8.38L9,17.38l7.25-4.19V4.81Zm5.34,11.46L9,15.17,3.66,12.08V5.92L9,2.83l5.34,3.09Z"
      />
      <polygon points="3.97 11.83 9 14.79 14.03 11.83 14.03 8.06 3.97 8.06 3.97 11.83" />
    </svg>
  )
}

export default Investments
