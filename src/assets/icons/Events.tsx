const Events = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 15} viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.162 7.50586C14.162 11.1852 11.1793 14.1679 7.5 14.1679C3.82066 14.1679 0.837968 11.1852 0.837968 7.50586C0.837968 3.82652 3.82066 0.843827 7.5 0.843827C11.1793 0.843827 14.162 3.82652 14.162 7.50586ZM15 7.50586C15 11.648 11.6421 15.0059 7.5 15.0059C3.35786 15.0059 0 11.648 0 7.50586C0 3.36372 3.35786 0.00585938 7.5 0.00585938C11.6421 0.00585938 15 3.36372 15 7.50586ZM8 2.50928V7.19457L11.4447 10.6393L10.7376 11.3464L7 7.60878V2.50928H8Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Events
