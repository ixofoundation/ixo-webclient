const UploadCamera = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M12.51 10.87a2.39 2.39 0 11-2.39-2.39 2.38 2.38 0 012.39 2.39zM2.66 7.13h1.49V4.89h2.24V3.4H4.15V1.16H2.66V3.4H.42v1.49h2.24zm14.92-.74v9a1.5 1.5 0 01-1.49 1.5H4.15a1.5 1.5 0 01-1.49-1.5V7.88h2.23V5.64h2.24V3.4h5.23l1.36 1.49h2.37a1.5 1.5 0 011.49 1.5zm-3.73 4.48a3.73 3.73 0 10-3.73 3.73 3.74 3.74 0 003.73-3.73z'
      />
    </svg>
  )
}

export default UploadCamera
