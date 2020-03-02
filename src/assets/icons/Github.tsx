import React from 'react'

const Github = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 13.8"
    >
      <path
        d="M0 7.1c0 .8.1 1.5.2 2.1.1.6.3 1.2.6 1.6.3.5.6.9 1 1.2.4.3.8.6 1.3.9.5.2 1 .4 1.6.5l1.8.3c.6.1 1.3.1 2 .1s1.4 0 2-.1l1.8-.3c.6-.1 1.1-.3 1.6-.5s.9-.5 1.3-.9c.4-.3.7-.8 1-1.2.3-.5.5-1 .6-1.6.1-.6.2-1.3.2-2.1 0-1.4-.5-2.6-1.4-3.6 0-.1.1-.3.1-.5s.1-.4.1-.7V1.2c-.1-.4-.2-.8-.4-1.3h-.5c-.2 0-.4.1-.7.1-.3.1-.6.2-1 .4s-.9.5-1.3.8c-.9 0-2-.1-3.4-.1s-2.5.1-3.3.3c-.5-.3-1-.6-1.4-.8S3 .2 2.8.2C2.5.1 2.3 0 2.1 0h-.4-.2c-.2.5-.3.9-.3 1.3-.1.4-.1.8 0 1.1 0 .3.1.6.1.7 0 .2.1.3.1.5C.5 4.5 0 5.7 0 7.1zm2.1 2.1c0-.8.4-1.5 1.1-2.2.2-.2.5-.3.8-.5.3-.1.6-.2 1-.2h1c.3 0 .7 0 1.2.1h2.6c.5 0 .9-.1 1.2-.1h1c.4 0 .7.1 1 .2.3.1.5.3.8.5.7.7 1.1 1.4 1.1 2.2 0 .5-.1.9-.2 1.3s-.3.7-.5.9c-.2.2-.4.5-.8.6-.3.2-.7.3-1 .4-.3.1-.7.2-1.2.2-.5.1-.9.1-1.3.1h-3c-.4 0-.8 0-1.3-.1s-.9-.1-1.2-.2c-.3-.1-.6-.2-1-.4-.3-.2-.6-.4-.8-.6-.2-.2-.3-.6-.5-.9V9.2zm8.5-.2c0 .9.5 1.6 1.1 1.6.6 0 1.1-.7 1.1-1.6s-.5-1.6-1.1-1.6c-.6 0-1.1.7-1.1 1.6zM4.3 9c0 .9.5 1.6 1.1 1.6s1-.7 1-1.6-.5-1.6-1.1-1.6-1 .7-1 1.6z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Github
