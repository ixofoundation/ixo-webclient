const Approve = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 12} height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.1257 1L4.12571 7L1.39844 4.27273'
        stroke={props.fill || '#85AD5C'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Approve
