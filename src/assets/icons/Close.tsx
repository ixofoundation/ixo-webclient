const Close = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.5 9L.8 15.7a1.09 1.09 0 000 1.5 1.09 1.09 0 001.5 0L9 10.5l6.7 6.7a1.06 1.06 0 001.5-1.5L10.5 9l6.7-6.7a1.09 1.09 0 000-1.5 1.14 1.14 0 00-.8-.3 1.33 1.33 0 00-.8.3L9 7.5 2.3.8a1.08 1.08 0 00-.7-.3 1.33 1.33 0 00-.8.3 1.09 1.09 0 000 1.5L7.5 9z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Close
