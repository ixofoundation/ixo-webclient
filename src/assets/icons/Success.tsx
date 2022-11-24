const Success = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M9 17a8 8 0 118-8 8 8 0 01-8 8zM9 .5A8.5 8.5 0 1017.5 9 8.49 8.49 0 009 .5zM7.7 11.9L5.2 9.4l.7-.7 1.8 1.8 4.4-4.4.7.7-5.1 5.1zm0-2.2L6 7.9 4.5 9.4l3 3.1.2.2 5.9-5.9-1.5-1.5z'
      />
    </svg>
  )
}

export default Success
