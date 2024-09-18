const IxoXRound = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 17.5A8.5 8.5 0 10.5 9 8.49 8.49 0 009 17.5zm-4.6-6.2L6.7 9 4.4 6.7V4.4h2.3L9 6.7l2.3-2.3h2.3v2.3L11.3 9l2.3 2.3v2.3h-2.3L9 11.3l-2.3 2.3H4.4z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default IxoXRound
