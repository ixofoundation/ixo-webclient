import React from "react";

interface Prop {
  width: number;
}

const Apps = ({ width }: Prop): JSX.Element => {
  return (
    <svg
      width={width || 30}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 8.4999L8.50031 1H1V8.4999L8.50031 15.9998L1 23.4997V31H8.50031L16.0002 23.4997L23.5001 31H31V23.4997L23.5001 15.9998L31 8.4999V1H23.5001L16.0002 8.4999Z" stroke="#D8D8D8" stroke-width="1.4" stroke-dasharray="1 1"/>
    </svg>    
  );
};

export default Apps;
