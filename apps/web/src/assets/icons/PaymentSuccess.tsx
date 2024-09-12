const PaymentSuccess = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 100} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M11.36 6.86l.45.45L8 11.14 6.19 9.36l.46-.45L8 10.24zM17.55 9A8.55 8.55 0 119 .45 8.55 8.55 0 0117.55 9zm-.61 0A7.94 7.94 0 109 16.94 7.93 7.93 0 0016.94 9z'
      />
    </svg>
  )
}

export default PaymentSuccess
