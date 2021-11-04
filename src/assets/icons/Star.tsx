import React from 'react'

const Star = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6702 6.64908L10.8162 7.09822H11.2884H16.0652L12.2007 9.90596L11.8186 10.1835L11.9646 10.6327L13.4407 15.1757L9.57617 12.368L9.19411 12.0904L8.81205 12.368L4.94753 15.1757L6.42365 10.6327L6.56958 10.1835L6.18752 9.90596L2.323 7.09822H7.09981H7.57206L7.718 6.64908L9.19411 2.10607L10.6702 6.64908Z"
        stroke="#00D2FF"
        strokeWidth="1.3"
      />
    </svg>
  )
}

export default Star
