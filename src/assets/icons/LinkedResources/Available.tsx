import React from 'react'

interface Props {
  fill?: string
}

const Available: React.FunctionComponent<Props> = ({ fill = '#85AD5C' }) => {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4.4011" cy="4.49997" r="4.38242" fill={fill} />
    </svg>
  )
}

export default Available
