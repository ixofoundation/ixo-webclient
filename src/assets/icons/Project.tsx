import React from 'react'

const Project = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M14.7 0H2.3C1 0 0 1 0 2.3v12.4C0 16 1 17 2.3 17h12.4c1.3 0 2.3-1 2.3-2.3V2.3C17 1 16 0 14.7 0zM2.3 1.5h12.4c.4 0 .8.3.8.8v2.3h-14V2.3c0-.4.4-.8.8-.8zm-.8 13.2V6.2h3.9v9.3H2.3c-.4 0-.8-.4-.8-.8zm13.2.8H7V6.2h8.5v8.5c0 .4-.4.8-.8.8z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Project
