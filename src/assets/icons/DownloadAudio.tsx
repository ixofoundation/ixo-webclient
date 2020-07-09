import React from 'react'

const DownloadDocument = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 24}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        d="M50.5504 54.2529C53.1496 54.2529 55.2321 52.1547 55.2321 49.5555L55.2477 40.1607C55.2477 37.5615 53.1496 35.4634 50.5504 35.4634C47.9512 35.4634 45.853 37.5615 45.853 40.1607V49.5555C45.853 52.1547 47.9512 54.2529 50.5504 54.2529ZM58.8491 49.5555C58.8491 54.2529 54.8719 57.541 50.5504 57.541C46.2288 57.541 42.2517 54.2529 42.2517 49.5555H39.5898C39.5898 54.8948 43.8488 59.3104 48.9846 60.0776V65.2134H52.1162V60.0776C57.2519 59.326 61.5109 54.9105 61.5109 49.5555H58.8491Z"
        fill={props.fill || '#fff'}
      />
      <circle
        cx="50.8048"
        cy="50.7162"
        r="40.5899"
        stroke={props.fill || '#fff'}
        strokeWidth="3"
      />
      <circle
        opacity="0.3"
        cx="50.8047"
        cy="50.7161"
        r="50.1406"
        stroke={props.fill || '#fff'}
      />
    </svg>
  )
}

export default DownloadDocument
