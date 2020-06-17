import React from 'react'

const SelectPicture = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 17 17.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.827515 0.837034V13.837H17.8275V0.837034H0.827515ZM10.8275 2.83703V6.33703H7.82751V2.83703H10.8275ZM2.82751 2.83703H5.82751V6.33703H2.82751V2.83703ZM2.82751 11.837V8.33703H5.82751V11.837H2.82751ZM7.82751 11.837V8.33703H10.8275V11.837H7.82751ZM15.8275 11.837H12.8275V8.33703H15.8275V11.837ZM12.8275 6.33703V2.83703H15.8275V6.33703H12.8275Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default SelectPicture
