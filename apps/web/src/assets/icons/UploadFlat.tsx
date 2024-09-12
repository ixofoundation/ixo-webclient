const UploadFlat = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path fill={props.fill || '#fff'} d='M1.42.34V2.5h15.16V.34zm0 10.83h4.33v6.49h6.5v-6.49h4.33L9 3.59z' />
    </svg>
  )
}

export default UploadFlat
