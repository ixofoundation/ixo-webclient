const Filter = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path fill={props.fill || '#fff'} d='M7 15h4v-2H7zM0 3v2h18V3zm3 7h12V8H3z' />
    </svg>
  )
}

export default Filter
