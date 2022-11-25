const Calendar = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.2 2.2h2.1v-.5a.5.5 0 011 0v.5h5.3v-.5a.5.5 0 111 0v.5h2.1a2.69 2.69 0 012.8 2.6v9.4a2.61 2.61 0 01-2.7 2.6H3.1a2.58 2.58 0 01-2.6-2.6V4.8a2.67 2.67 0 012.7-2.6zm13.2 2.6a1.64 1.64 0 00-1.6-1.6h-2.1v.5a.5.5 0 01-1 0v-.4H6.4v.5a.47.47 0 01-.5.5c-.4 0-.6-.2-.6-.5v-.5H3.2a1.58 1.58 0 00-1.6 1.6v1.6h14.9l-.1-1.7zM1.6 14.2a1.64 1.64 0 001.6 1.6h11.7a1.58 1.58 0 001.6-1.6V7.4H1.6v6.8z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Calendar
