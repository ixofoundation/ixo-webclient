const SingleDatePicker = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20.4978 6.812H19.5917V5H17.7794V6.812H10.5306V5H8.71833V6.812H7.81222C6.80644 6.812 6.00906 7.6274 6.00906 8.624L6 21.308C6 22.3046 6.80644 23.12 7.81222 23.12H20.4978C21.4945 23.12 22.31 22.3046 22.31 21.308V8.624C22.31 7.6274 21.4945 6.812 20.4978 6.812ZM20.4978 21.308H7.81222V11.342H20.4978V21.308ZM9.62444 13.154H14.155V17.684H9.62444V13.154Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default SingleDatePicker
