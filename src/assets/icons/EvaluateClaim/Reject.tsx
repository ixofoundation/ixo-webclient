const Reject = (props: any): JSX.Element => {
  return (
    <svg width='9' height='9' viewBox='0 0 9 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.64648 1.19531L1.64648 7.19531'
        stroke={props.fill || '#E2223B'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.64648 1.19531L7.64648 7.19531'
        stroke={props.fill || '#E2223B'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Reject
