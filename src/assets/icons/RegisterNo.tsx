const RegisterNo = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 17.35a8.39 8.39 0 01-8.5-8.3A8.47 8.47 0 019 .65a8.35 8.35 0 110 16.7zm1.1-8.1l3.1-3.1a.67.67 0 000-1 .67.67 0 00-1 0l-3.1 3.1L6 5.15a.67.67 0 00-1 0 .67.67 0 000 1l3.1 3.1-3.1 3.1a.67.67 0 000 1 .67.67 0 001 0l3.1-3.1 3.1 3.1a.71.71 0 001-1l-3.1-3.1z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default RegisterNo
