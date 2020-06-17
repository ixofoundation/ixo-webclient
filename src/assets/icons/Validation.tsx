import React from 'react'

const UploadFile = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 22}
      viewBox="0 0 22 11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8274 0.0818634H0.827393V2.08186H12.8274V0.0818634ZM0.827393 6.08186H8.82739V4.08186H0.827393V6.08186ZM20.3274 1.58186L21.8274 3.08186L14.8374 10.0819L10.3274 5.58186L11.8274 4.08186L14.8374 7.08186L20.3274 1.58186Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default UploadFile
