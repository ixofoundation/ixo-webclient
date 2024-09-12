const Claims2 = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.52 17.5h-11a1.71 1.71 0 01-1.71-1.7V2.2A1.71 1.71 0 013.48.5h11a1.71 1.71 0 011.71 1.7v13.6a1.71 1.71 0 01-1.71 1.7zM3.48 1.44a.85.85 0 00-.86.84V15.8a.86.86 0 00.86.85h11a.86.86 0 00.86-.85V2.2a.85.85 0 00-.86-.85h-11zm1.27 7.73h8.76V10H4.75zm8.92-1.7H4.92V3.05h8.75v4.42zm-8-.76H13V3.82H5.68v2.89zm-.93 5h8.76v.85H4.75z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Claims2
