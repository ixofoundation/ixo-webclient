const Rejected = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 17a8 8 0 118-8 8 8 0 01-8 8zM9 .5A8.5 8.5 0 1017.5 9 8.49 8.49 0 009 .5zm2.9 10.7l-.8.8L9 9.7l-2.2 2.2-.7-.7L8.3 9 6 6.8l.7-.7 2.2 2.2 2.2-2.2.7.7L9.7 9l2.2 2.2zm-.7-5.9L9 7.5 6.8 5.3 5.3 6.8 7.5 9l-2.2 2.2 1.3 1.3.2.2L9 10.5l2 2 .2.2 1.5-1.5L10.5 9l2.2-2.2-1.5-1.5z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Rejected
