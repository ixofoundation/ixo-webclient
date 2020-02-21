import React from 'react'

const Marketplace = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      viewBox="0 0 17 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.736.09H1.563v1.77h14.173V.09zm.885 8.857V7.176l-.885-4.43H1.563l-.886 4.43v1.771h.886v5.315h8.858V8.947h3.543v5.315h1.772V8.947h.885zM8.65 12.491H3.334V8.947H8.65v3.544z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Marketplace
