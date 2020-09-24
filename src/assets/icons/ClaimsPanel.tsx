import React from "react";

const ClaimsPanel = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
      <path d="M13.0218 3.85414H0.869141V16.0871H13.0218V3.85414Z" fill="#79AF50"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.9599 9.97289L13.0176 16.0871L13.0215 3.85414L19.9599 9.97289Z" fill="#79AF50"/>
      <path d="M0.868125 3.85414H0V16.0871H0.868125V3.85414Z" fill="#F2705B"/>
      </g>
      <defs>
      <clipPath id="clip0">
      <rect width="20" height="20" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  );
};

export default ClaimsPanel;
