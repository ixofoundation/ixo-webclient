const IxoX = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path fill={props.fill || '#fff'} d='M17 5l-4 4 4 4v4h-4l-4-4-4 4H1v-4l4-4-4-4V1h4l4 4 4-4h4z' />
    </svg>
  )
}

export default IxoX
