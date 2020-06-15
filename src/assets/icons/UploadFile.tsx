import React from 'react'

const UploadFile = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.67292 9.48314H6.77292V12.3331H3.92292V14.2331H6.77292V17.0831H8.67292V14.2331H11.5229V12.3331H8.67292V9.48314ZM9.62292 0.933136H2.02292C0.977925 0.933136 0.122925 1.78814 0.122925 2.83314V18.0331C0.122925 19.0781 0.968425 19.9331 2.01342 19.9331H13.4229C14.4679 19.9331 15.3229 19.0781 15.3229 18.0331V6.63314L9.62292 0.933136ZM13.4229 18.0331H2.02292V2.83314H8.67292V7.58314H13.4229V18.0331Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default UploadFile
