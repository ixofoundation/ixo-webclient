import React from 'react'

const Oracle = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 17 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.763 5.353a2.908 2.908 0 100 5.818 2.908 2.908 0 100-5.818zm6.502 2.182A6.541 6.541 0 009.49 1.76V.262H8.035V1.76a6.541 6.541 0 00-5.774 5.775H.763V8.99H2.26a6.541 6.541 0 005.774 5.774v1.498H9.49v-1.498a6.541 6.541 0 005.774-5.774h1.499V7.535h-1.499zm-6.502 5.818a5.087 5.087 0 01-5.091-5.09 5.087 5.087 0 015.09-5.092 5.087 5.087 0 015.092 5.091 5.087 5.087 0 01-5.091 5.091z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Oracle
