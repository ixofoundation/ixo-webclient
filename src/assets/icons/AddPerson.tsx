import React from 'react'

const AddPerson = (props: any): JSX.Element => {
  return (
    // <svg
    //   width={props.width || 18}
    //   viewBox="0 0 18 18"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     fill={props.fill || "#fff"}
    //     d="M8.23 5.91A3.09 3.09 0 1111.32 9a3.09 3.09 0 01-3.09-3.09zm3.09 4.64c-2.06 0-6.19 1-6.19 3.09v1.55H17.5v-1.55c0-2.06-4.12-3.09-6.18-3.09zm-4.64-3.1H4.36V5.13H2.81v2.32H.5V9h2.31v2.32h1.55V9h2.32z"
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 18}
      fill="none"
      viewBox="0 0 72 72"
    >
      <path
        fill={props.fill || '#49BFE0'}
        d="M0 8v24h20l-4-16 16 4V0H8C3.6 0 0 3.6 0 8zm20 32H0v24c0 4.4 3.6 8 8 8h24V52l-16 4 4-16zm36 16l-16-4v20h24c4.4 0 8-3.6 8-8V40H52l4 16zm8-56H40v20l16-4-4 16h20V8c0-4.4-3.6-8-8-8z"
      />
    </svg>
  )
}

export default AddPerson
