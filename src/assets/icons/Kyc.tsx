const Kyc = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.18 17.44h1.21A7.48 7.48 0 009 9.87a7.48 7.48 0 00-7.39 7.57h1.21A6.3 6.3 0 019 11.09a6.3 6.3 0 016.18 6.35zM8.83 1.69a3.14 3.14 0 010 6.31 3.18 3.18 0 01-3.14-3.18 3.18 3.18 0 013.14-3.13zm0 7.31a4.27 4.27 0 004.26-4.26A4.25 4.25 0 008.83.56a4.33 4.33 0 00-4.27 4.26A4.2 4.2 0 008.83 9z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Kyc
