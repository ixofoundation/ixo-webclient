import React from 'react'

const Menu = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 13.3"
    >
      <path
        d="M12.2 1.6H.8c-.4 0-.8-.4-.8-.8S.4 0 .8 0h11.4c.4 0 .8.4.8.8s-.4.8-.8.8zm4 5.8H.8c-.4 0-.8-.3-.8-.8s.4-.8.8-.8h15.4c.4 0 .8.4.8.8s-.4.8-.8.8zm-4 5.9H.8c-.4 0-.8-.4-.8-.8s.4-.8.8-.8h11.4c.4 0 .8.4.8.8s-.4.8-.8.8z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Menu
