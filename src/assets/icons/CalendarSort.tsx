import React from 'react'

const CalendarSort = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 18.9"
    >
      <path
        d="M5.7 8.5H3.8v1.9h1.9V8.5zm3.7 0H7.6v1.9h1.9V8.5h-.1zm3.8 0h-1.9v1.9h1.9V8.5zm1.9-6.6h-.9V0h-1.9v1.9H4.7V0H2.8v1.9h-.9c-1 0-1.9.8-1.9 1.9V17c0 1.1.8 1.9 1.9 1.9h13.2c1 0 1.9-.8 1.9-1.9V3.8c0-1.1-.8-1.9-1.9-1.9zm0 15.1H1.9V6.6h13.2V17z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default CalendarSort
