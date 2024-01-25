const People = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 17 12' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.586 4.522a2.173 2.173 0 002.174-2.181 2.179 2.179 0 10-4.356 0c0 1.207.975 2.181 2.182 2.181zm-5.818 0a2.173 2.173 0 002.174-2.181 2.179 2.179 0 10-4.356 0c0 1.207.974 2.181 2.182 2.181zm0 1.455c-1.695 0-5.091.85-5.091 2.545v2.885h10.182V8.522c0-1.694-3.397-2.545-5.091-2.545zm5.818 0c-.211 0-.451.015-.706.036.844.611 1.433 1.433 1.433 2.51v2.884h4.364V8.522c0-1.694-3.397-2.545-5.091-2.545z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default People