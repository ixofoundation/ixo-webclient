const UploadFile = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18.8621 16.05H16.9621V18.9H14.1121V20.8H16.9621V23.65H18.8621V20.8H21.7121V18.9H18.8621V16.05ZM19.8121 7.5H12.2121C11.1671 7.5 10.3121 8.355 10.3121 9.4V24.6C10.3121 25.645 11.1576 26.5 12.2026 26.5H23.6121C24.6571 26.5 25.5121 25.645 25.5121 24.6V13.2L19.8121 7.5ZM23.6121 24.6H12.2121V9.4H18.8621V14.15H23.6121V24.6Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default UploadFile
