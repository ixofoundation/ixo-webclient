import React from 'react'

const Calendar = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 15.6"
    >
      <path
        d="M2.7 1h2.1V.5c0-.3.2-.5.5-.5s.5.2.5.5V1h5.3V.5c0-.3.2-.5.5-.5s.5.2.5.5V1h2.1C15.8 1 17 2.2 17 3.6V13c0 1.5-1.2 2.6-2.7 2.6H2.6C1.2 15.6 0 14.5 0 13V3.6C0 2.2 1.2 1 2.7 1zm13.2 2.6c0-.8-.7-1.6-1.6-1.6h-2.1v.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-.4H5.9v.5c0 .3-.2.5-.5.5-.4 0-.6-.2-.6-.5v-.5H2.7c-.9 0-1.6.7-1.6 1.6v1.6H16l-.1-1.7zM1.1 13c0 .8.7 1.6 1.6 1.6h11.7c.9 0 1.6-.7 1.6-1.6V6.2H1.1V13z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Calendar
