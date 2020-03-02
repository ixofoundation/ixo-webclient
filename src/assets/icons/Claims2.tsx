import React from 'react'

const Claims2 = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 20"
    >
      <path
        d="M15 20H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h13c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2zM2 1.1c-.5 0-1 .4-1 1V18c0 .5.4 1 1 1h13c.5 0 1-.4 1-1V2c0-.5-.4-1-1-1H2v.1zm1.5 9.1h10.3v1H3.5v-1zm10.5-2H3.7V3H14v5.2zm-9.4-.9h8.6V3.9H4.6v3.4zm-1.1 5.9h10.3v1H3.5v-1z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Claims2
