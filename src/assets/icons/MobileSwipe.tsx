const MobileSwipe = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 36 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M22.0231 6.27794C21.2167 4.823 19.4306 4.3245 18.0339 5.16451C16.6372 6.00452 16.1586 7.86495 16.965 9.31989'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
      />
      <path
        d='M15.2858 6.27794C14.4794 4.823 12.6933 4.3245 11.2966 5.16451C9.89986 6.00452 9.4213 7.86495 10.2277 9.31989'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
      />
      <path
        d='M10.2275 9.31989L16.3547 20.3565'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M15.2852 6.27795L22.8753 20.3291'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M22.0225 6.27795L29.7794 20.3565'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M4.61502 7.06989L1.50935 10.305C1.31811 10.5042 1.31811 10.8271 1.50935 11.0263L4.61502 14.2614'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M31.385 14.2614L34.4906 11.0263C34.6819 10.8271 34.6819 10.5042 34.4906 10.305L31.385 7.06989'
        stroke={props.stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default MobileSwipe
