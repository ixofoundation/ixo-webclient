import * as React from 'react'

const Ring = (props): JSX.Element => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25 0C3.24592 0 0 3.24592 0 7.25C0 11.2541 3.24592 14.5 7.25 14.5C11.2541 14.5 14.5 11.2541 14.5 7.25C14.5 3.24592 11.2541 0 7.25 0ZM9.58871 7.25C9.58871 8.53956 8.53956 9.58871 7.25 9.58871C5.96044 9.58871 4.91129 8.53956 4.91129 7.25C4.91129 5.96044 5.96044 4.91129 7.25 4.91129C8.53956 4.91129 9.58871 5.96044 9.58871 7.25Z"
        fill={props.fill || '#00D2FF'}
      />
    </svg>
  )
}

export default Ring
