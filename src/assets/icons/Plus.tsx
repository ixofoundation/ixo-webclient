const Plus = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 17 17.4' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 7.4h7.2V0h2.6v7.4H17V10H9.8v7.4H7.2V10H0V7.4z' fill={props.fill || '#fff'} />
    </svg>
  )
}

export default Plus
