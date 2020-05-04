import React from 'react'

const Message = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || '#fff'}
        d="M12.33 9.84a.85.85 0 00.84-.84V1.5a.84.84 0 00-.84-.83H1.5a.83.83 0 00-.83.83v11.67L4 9.84zM10 4a1 1 0 11-1 1 1 1 0 011-1zM7.4 4a1 1 0 11-1 1 1 1 0 011-1zM3.6 5a1 1 0 111 1 1 1 0 01-1-1zm13.73-.16v12.5L14 14H4.83a.83.83 0 01-.83-.83V11.5h10.83V4h1.67a.84.84 0 01.83.84z"
      />
    </svg>
  )
}

export default Message
