const IndicatorDown = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path d='M9 15.4l8.5-12.8H.5z' fill={props.fill || '#fff'} />
    </svg>
  )
}

export default IndicatorDown
