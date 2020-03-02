import React from 'react'

const Menu = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M4 5.5H.5c-.2 0-.3.1-.3.3v11c0 .2.1.3.3.3H4c.2 0 .3-.1.3-.3v-11c-.1-.2-.2-.3-.3-.3zM2.3 0C1 0 0 1 0 2.2c0 1.2 1 2.3 2.3 2.3 1.2 0 2.3-1 2.3-2.3C4.5 1 3.5 0 2.3 0zm10.3 5.2c-1.4 0-2.4.6-3 1.3v-.8c0-.2-.1-.3-.3-.3H6.1c-.2 0-.3.1-.3.3v11c0 .2.1.3.3.3h3.4c.2 0 .3-.1.3-.3v-5.4c0-1.8.5-2.5 1.8-2.5 1.4 0 1.5 1.1 1.5 2.6v5.3c0 .2.1.3.3.3h3.4c.2 0 .3-.1.3-.3v-6c-.1-2.7-.6-5.5-4.5-5.5z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Menu
