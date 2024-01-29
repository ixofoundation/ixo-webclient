const Assets = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 36} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
      <path
        fill={props.fill || '#fff'}
        d='M60,10A50,50,0,1,1,10,60,50.06,50.06,0,0,1,60,10M60,0a60,60,0,1,0,60,60A60,60,0,0,0,60,0Z'
      />
      <path
        fill={props.fill || '#fff'}
        d='M60,95.45a5.46,5.46,0,0,1-3.86-1.59l-30-30a5.46,5.46,0,0,1,0-7.72l30-30a5.46,5.46,0,0,1,7.72,0l30,30a5.46,5.46,0,0,1,0,7.72l-30,30A5.46,5.46,0,0,1,60,95.45ZM37.71,60,60,82.29,82.29,60,60,37.71Z'
      />
    </svg>
  )
}

export default Assets
