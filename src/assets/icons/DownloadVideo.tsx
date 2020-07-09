import React from 'react'

const DownloadVideo = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 24}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        fill={props.fill || '#fff'}
        d="M42.5,82C64.3,82,82,64.3,82,42.5C82,20.7,64.3,3,42.5,3S3,20.7,3,42.5C3,64.3,20.7,82,42.5,82z M42.5,85
      C66,85,85,66,85,42.5C85,19,66,0,42.5,0S0,19,0,42.5C0,66,19,85,42.5,85z M51.7,39.8v-6.7c0-1-0.9-1.9-1.9-1.9H26.9
      c-1,0-1.9,0.9-1.9,1.9v19.1c0,1,0.9,1.9,1.9,1.9h22.9c1,0,1.9-0.9,1.9-1.9v-6.7l7.6,7.6v-21L51.7,39.8z M46,44.6h-5.7v5.7h-3.8v-5.7h-5.7v-3.8h5.7v-5.7h3.8v5.7H46V44.6z"
      />
    </svg>
  )
}

export default DownloadVideo
