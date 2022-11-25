const Briefcase = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.28 4.68h-3.14V3.11a1.56 1.56 0 00-1.57-1.56H7.43a1.56 1.56 0 00-1.57 1.57v1.56H2.72a1.56 1.56 0 00-1.56 1.57v8.63a1.56 1.56 0 001.57 1.57h12.55a1.56 1.56 0 001.57-1.57V6.25a1.57 1.57 0 00-1.57-1.57zm-4.71 0H7.43V3.11h3.14z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Briefcase
