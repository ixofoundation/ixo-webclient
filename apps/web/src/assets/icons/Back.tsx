const Back = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M16.87 8.22H3L9.1 2.1a.71.71 0 00.23-.52.65.65 0 00-.19-.49A.78.78 0 008 1L.64 8.41a.77.77 0 00-.26.51V9a.82.82 0 00.22.56L8 16.94a.78.78 0 001.1 0 .71.71 0 00.23-.52.65.65 0 00-.19-.49L3 9.73h13.87a.75.75 0 00.75-.73.72.72 0 00-.75-.78z'
      />
    </svg>
  )
}

export default Back
