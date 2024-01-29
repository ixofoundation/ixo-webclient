const Query = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M14.83.25H3.17A1.67 1.67 0 001.5 1.92v11.66a1.67 1.67 0 001.67 1.67H6.5l2.5 2.5 2.5-2.5h3.33a1.67 1.67 0 001.67-1.67V1.92A1.67 1.67 0 0014.83.25zm0 13.33h-4l-.49.49L9 15.39l-1.32-1.32-.49-.49h-4V1.92h11.64zm-6.66-2.5h1.66v1.67H8.17zM9 4.42a1.67 1.67 0 011.67 1.66c0 1.67-2.5 1.46-2.5 4.17h1.66c0-1.87 2.5-2.08 2.5-4.17a3.33 3.33 0 10-6.66 0h1.66A1.67 1.67 0 019 4.42z'
      />
    </svg>
  )
}

export default Query
