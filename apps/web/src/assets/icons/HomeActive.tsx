const HomeActive = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.42 9.7l-3.9-4.1V2.9a.5.5 0 00-1 0v1.7l-3.2-3.4c-.1 0-.1-.1-.2-.1H9l-.1.1c-.1 0-.2.1-.3.1l-8 8.4a.48.48 0 000 .7.37.37 0 00.6 0l1.1-1.1v7.1a.47.47 0 00.5.5h3.8a.47.47 0 00.5-.5v-3.6h3v3.4a.47.47 0 00.5.5h3.8a.47.47 0 00.5-.5V8.7l1.7 1.8c.1.1.2.1.4.1s.2-.1.4-.1c.1-.3.2-.6 0-.8z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default HomeActive
