import React from 'react'

const ShortText = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.724854 0.914642V2.91464H18.7249V0.914642H0.724854ZM0.724854 7.91464H12.7249V5.91464H0.724854V7.91464Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ShortText
