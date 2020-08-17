import React from 'react';

const OpenOnMobile = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || '#fff'}
        d="M13 .71H5.05a1.55 1.55 0 00-1.58 1.5v13.58a1.55 1.55 0 001.58 1.51H13a1.56 1.56 0 001.58-1.51V2.21A1.55 1.55 0 0013 .71zm0 13.57H5.05V3.72H13zM9.63 9.92v1.32L12.16 9 9.63 6.74V8a4.18 4.18 0 00-3.79 3.54 4.33 4.33 0 013.79-1.62z"
      />
    </svg>
  );
};

export default OpenOnMobile;
