import React from 'react'

const EvaluatorsActive = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.7 9.2a3.22 3.22 0 00-3.2 3.2.9.9 0 00.1.5h3.3a4.37 4.37 0 011.4-3.3 2.93 2.93 0 00-1.6-.4zm2.6-3.4a2.37 2.37 0 002.4 2.4 2.31 2.31 0 002.4-2.4 2.45 2.45 0 00-2.5-2.4 2.29 2.29 0 00-2.3 2.4zM3.6 4.4a2.18 2.18 0 00-2.1 2.1 2.18 2.18 0 002.1 2.1 2.11 2.11 0 002.1-2.1 2.05 2.05 0 00-2.1-2.1zm10.5 2.8a3.53 3.53 0 011.4.3 1.49 1.49 0 00.2-.9 2.14 2.14 0 00-2.1-2.2 2.11 2.11 0 00-2.1 2.1 2.11 2.11 0 00.5 1.3 5.09 5.09 0 012.1-.6zm-4 4a3.7 3.7 0 01.6-2.1 4.78 4.78 0 00-1.8-.4 4.23 4.23 0 00-4.2 4.2h5.8a3.29 3.29 0 01-.4-1.7zM14.2 8a3.3 3.3 0 103.3 3.3A3.33 3.33 0 0014.2 8zm1.8 2.3l-2.3 2.4a.3.3 0 01-.4 0l-1.2-1.3a.28.28 0 01.4-.4l1 1 2.1-2.2a.3.3 0 01.4 0 .45.45 0 010 .5z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default EvaluatorsActive
