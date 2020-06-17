import React from 'react'

const Plus = (props): JSX.Element => {
  return (
    <svg
      width={props.width || 25}
      viewBox="0 0 25 23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.10918 1.93487V10.1523H11.3266V1.93487H3.10918ZM10.1527 8.97835H4.28308V3.10877H10.1527V8.97835Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M8.97885 4.2827H5.45711V7.80444H8.97885V4.2827Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M12.8918 1.93487V10.1523H21.1092V1.93487H12.8918ZM19.9353 8.97835H14.0657V3.10877H19.9353V8.97835Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M18.7615 4.2827H15.2398V7.80444H18.7615V4.2827Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M3.10918 11.7175V19.9349H11.3266V11.7175H3.10918ZM10.1527 18.761H4.28308V12.8914H10.1527V18.761Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M8.97885 14.0652H5.45711V17.587H8.97885V14.0652Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M15.2396 12.8914V11.7175H12.8918V19.9349H15.2396V18.761H14.0657V16.4132H15.2396V15.2393H14.0657V12.8914H15.2396Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M21.1095 11.7175H19.9356V12.8914H21.1095V11.7175Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M19.9352 14.4566V18.7609H18.7612V19.9348H21.1091V14.4566H19.9352Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M18.7611 11.7175H16.4133V12.8914H18.7611V11.7175Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M18.7611 15.2392V14.0652H16.4133V17.587H18.7611V16.4131H17.5872V15.2392H18.7611Z"
        fill={props.fill || '#fff'}
      />
      <path
        d="M17.5872 18.761H16.4133V19.9349H17.5872V18.761Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Plus
