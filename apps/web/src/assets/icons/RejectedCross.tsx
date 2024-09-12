const RejectedCross = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 .5A8.5 8.5 0 1017.5 9 8.49 8.49 0 009 .5zm0 15.7A7.2 7.2 0 1116.2 9 7.17 7.17 0 019 16.2zM10.1 9l2.7-2.7a.55.55 0 00.2-.5.76.76 0 00-.2-.5 1.07 1.07 0 00-1.1 0L9 8 6.3 5.3a.78.78 0 00-1.1 0 .76.76 0 00-.2.5c0 .2.1.3.2.5L7.9 9l-2.7 2.7a.55.55 0 00-.2.5.76.76 0 00.2.5 1.07 1.07 0 001.1 0L9 10l2.7 2.7a.55.55 0 00.5.2.76.76 0 00.5-.2.55.55 0 00.2-.5.76.76 0 00-.2-.5z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default RejectedCross
