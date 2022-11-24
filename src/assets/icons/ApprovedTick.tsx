const ApprovedTick = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.32 4.1L6.52 14.7a.91.91 0 01-1.2 0l-4.6-4.4a.91.91 0 010-1.2.91.91 0 011.2 0l3.9 3.8L16 2.9a.89.89 0 011.3 1.2z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ApprovedTick
