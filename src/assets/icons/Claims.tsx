const Claims = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.49 17.75H3.59a2 2 0 01-2-2V2.27a2 2 0 012-2h10.82a2 2 0 012 2v13.46a1.87 1.87 0 01-1.94 2zM3.59 1.31a1 1 0 00-1 1v13.42a1 1 0 001 1h10.82a1 1 0 001-1V2.27a1 1 0 00-1-1zm1 3.25h9.15v1.05h-9.1V4.56zm0 2.55h9.15v1h-9.1v-1zm0 2.64h9.15v1.05h-9.1V9.75z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Claims
