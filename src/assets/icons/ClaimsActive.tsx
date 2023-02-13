const ClaimsActive = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.85.5H3.23A1.44 1.44 0 001.78 2v14.1a1.49 1.49 0 001.45 1.4h11.53a1.43 1.43 0 001.45-1.45V2A1.32 1.32 0 0014.85.5zm-1.2 10.25H4.77v-1h8.88zm0-2.48H4.77v-1h8.88v1zm0-2.56H4.77v-1h8.88z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default ClaimsActive
