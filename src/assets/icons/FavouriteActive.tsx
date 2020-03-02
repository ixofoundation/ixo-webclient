import React from 'react'

const FavouriteActive = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 14.7"
    >
      <path
        d="M1.4 1.4C2.3.5 3.4 0 4.7 0S7.1.5 8 1.4l.5.5.5-.5C9.9.5 11 0 12.3 0c1.3 0 2.4.5 3.3 1.4.9.9 1.4 2 1.4 3.3 0 1.2-.5 2.4-1.4 3.3l-6.8 6.6c-.1.1-.2.1-.3.1s-.2 0-.3-.1L1.4 7.9C.5 7 0 5.9 0 4.6c0-1.2.5-2.4 1.4-3.2z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default FavouriteActive
