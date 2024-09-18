const UploadFile = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19.239 12H7.23901V14H19.239V12ZM7.23901 18H15.239V16H7.23901V18ZM26.739 13.5L28.239 15L21.249 22L16.739 17.5L18.239 16L21.249 19L26.739 13.5Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default UploadFile
