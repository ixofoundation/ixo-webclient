const Approved = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.5 9.3A8.51 8.51 0 119.3.5a8.56 8.56 0 018.2 8.8zm-1.3 0a7 7 0 00-6.9-7.4 7 7 0 00-7.4 6.9 7 7 0 006.9 7.4 7.28 7.28 0 007.4-6.9zM3.8 9.2l.1.1 2.8 3.2c.1.1.1.1.3.1a.37.37 0 00.3-.1l6.2-5.8a.28.28 0 000-.5l-.5-.5a.28.28 0 00-.5 0l-5.3 4.8h-.3l-2-2.2a.28.28 0 00-.5 0l-.5.4a.22.22 0 00-.2.2c0 .1.1.2.1.3z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Approved
