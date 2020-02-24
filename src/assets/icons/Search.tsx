import React from 'react'

const SearchIcon = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.3 15.5l4.2-4.2C3.4 10 2.8 8.5 2.8 6.9 2.8 3.1 6 0 9.9 0S17 3.1 17 6.9c0 3.8-3.2 6.9-7.1 6.9-1.5 0-2.9-.4-4.1-1.2l-4.2 4.2c-.2.1-.4.2-.7.2-.2 0-.5-.1-.6-.2-.4-.4-.4-1 0-1.3zM9.9 1.8C7 1.8 4.6 4.1 4.6 6.9S7 12 9.9 12s5.3-2.3 5.3-5.1c-.1-2.8-2.4-5.1-5.3-5.1z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default SearchIcon
