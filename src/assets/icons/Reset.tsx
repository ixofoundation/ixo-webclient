const Reset = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.8 9a1.6 1.6 0 10-1.6 1.6A1.58 1.58 0 0011.8 9zm-1.6-7.3A7.34 7.34 0 002.9 9H.5l3.2 3.2L6.9 9H4.5a5.7 5.7 0 115.7 5.7 5.46 5.46 0 01-3.3-1.1l-1.1 1.2a7.29 7.29 0 104.4-13.1z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Reset
