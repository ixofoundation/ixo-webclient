const Hourglass = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5 3V4.5H6.5V7.5C6.5 9.40723 7.52539 11.0801 9.05469 12C7.52539 12.9199 6.5 14.5928 6.5 16.5V19.5H5V21H18.5V19.5H17V16.5C17 14.5928 15.9746 12.9199 14.4453 12C15.9746 11.0801 17 9.40723 17 7.5V4.5H18.5V3H5ZM8 4.5H15.5V7.5C15.5 9.58008 13.8301 11.25 11.75 11.25C9.66992 11.25 8 9.58008 8 7.5V4.5ZM11.75 12.75C13.8301 12.75 15.5 14.4199 15.5 16.5V19.5H8V16.5C8 14.4199 9.66992 12.75 11.75 12.75Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Hourglass
