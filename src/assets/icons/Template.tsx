import React from 'react'

const Template = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.117 6.018h4.21v9.244h-4.21V6.018zm5.893 9.244h2.526c.926 0 1.684-.757 1.684-1.684V6.002h-4.21v9.261zM14.536.108H1.907C.981.108.224.866.224 1.792v2.526H16.22V1.792c0-.926-.758-1.684-1.684-1.684zM.224 13.578c0 .927.757 1.684 1.683 1.684h2.526v-9.26H.223v7.577z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Template
