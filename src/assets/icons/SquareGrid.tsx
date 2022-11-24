const Down = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 30}
      className={props.className || ''}
      height='19'
      viewBox='0 0 30 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='22' y='11' width='8' height='8' rx='1' fill={props.fill || '#000'} />
      <rect x='11' y='11' width='8' height='8' rx='1' fill={props.fill || '#000'} />
      <rect y='11' width='8' height='8' rx='1' fill={props.fill || '#000'} />
      <rect width='8' height='8' rx='1' fill={props.fill || '#000'} />
      <rect x='11' width='8' height='8' rx='1' fill={props.fill || '#000'} />
      <rect x='22' width='8' height='8' rx='1' fill={props.fill || '#000'} />
    </svg>
  )
}

export default Down
