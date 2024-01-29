const Investments = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 36} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
      <path
        fill={props.fill || '#fff'}
        d='M60,0C26.86,0,0,26.86,0,60s26.86,60,60,60c33.14,0,60-26.86,60-60S93.14,0,60,0z M10.91,60
	c0-27.07,22.02-49.09,49.09-49.09S109.09,32.93,109.09,60H10.91z'
      />
    </svg>
  )
}

export default Investments
