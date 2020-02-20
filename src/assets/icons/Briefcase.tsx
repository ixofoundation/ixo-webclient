import React from 'react'

const Briefcase = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 17}
      viewBox="0 0 17 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.497 3.638H11.36v-1.57c0-.87-.698-1.569-1.57-1.569H6.652c-.87 0-1.57.699-1.57 1.57v1.569H1.944c-.87 0-1.561.698-1.561 1.57l-.008 8.63c0 .871.698 1.57 1.57 1.57h12.553c.871 0 1.57-.699 1.57-1.57v-8.63c0-.872-.699-1.57-1.57-1.57zm-4.707 0H6.65v-1.57H9.79v1.57z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Briefcase
