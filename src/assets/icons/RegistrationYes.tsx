const RegistrationYes = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 17.35a8.39 8.39 0 01-8.5-8.3A8.47 8.47 0 019 .65a8.35 8.35 0 110 16.7zm-4.8-7.9l.1.2 2.9 3c.1.1.1.1.3.1a.37.37 0 00.3-.1l6-6a.45.45 0 000-.5l-.6-.5a.45.45 0 00-.5 0l-5 5.1a.19.19 0 01-.3 0l-2.1-2.2a.45.45 0 00-.5 0L4.2 9c0 .1-.1.2-.1.3a.35.35 0 00.1.2z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default RegistrationYes
