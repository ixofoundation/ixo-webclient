const ShortText = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.00024 13.5V15.5H26.0002V13.5H8.00024ZM8.00024 20.5H20.0002V18.5H8.00024V20.5Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ShortText
