import React from 'react'

const IxoX = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
    >
      <path
        d="M8.5 17c4.7 0 8.5-3.8 8.5-8.5S13.2 0 8.5 0 0 3.8 0 8.5 3.8 17 8.5 17zm-4.6-6.2l2.3-2.3-2.3-2.3V3.9h2.3l2.3 2.3 2.3-2.3h2.3v2.3l-2.3 2.3 2.3 2.3v2.3h-2.3l-2.3-2.3-2.3 2.3H3.9v-2.3z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default IxoX
