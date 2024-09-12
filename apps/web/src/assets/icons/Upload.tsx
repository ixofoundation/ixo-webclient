const Upload = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17 8.6a.47.47 0 00-.5.5v4.4a2.22 2.22 0 01-2.2 2.2H3.65a2.22 2.22 0 01-2.2-2.2V9A.47.47 0 001 8.5a.54.54 0 00-.5.5v4.5a3.14 3.14 0 003.2 3.1h10.7a3.2 3.2 0 003.2-3.1V9.1a.63.63 0 00-.6-.5zM6.35 5.2L8.65 3v9.6a.5.5 0 001 0V3L12 5.2c.1.1.2.1.4.1a.6.6 0 00.4-.1.48.48 0 000-.7l-3.2-3c-.1 0-.2-.1-.4-.1a.37.37 0 00-.3.1l-3.2 3a.49.49 0 00.7.7z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Upload
