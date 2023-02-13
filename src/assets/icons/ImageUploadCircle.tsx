const ImageUploadCircle = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 102 102' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M40.2129 38.6104V41.6368H61.398V38.6104H40.2129ZM40.2129 53.7426H46.2658V62.8219H55.3451V53.7426H61.398L50.8054 43.15L40.2129 53.7426Z'
        fill={props.fill || '#39C3E6'}
      />
      <circle cx='50.8048' cy='50.7162' r='40.5899' stroke={props.fill || '#39C3E6'} strokeWidth='3' />
      <circle opacity='0.3' cx='50.8047' cy='50.7161' r='50.1406' stroke={props.fill || '#39C3E6'} />
    </svg>
  )
}

export default ImageUploadCircle
