const Send = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M6.52 13.75l1 1-2.22 2.16-1-1zm-5.45 2.19l1 1 5.43-5.48-1-1zm2.2-5.44l-2.19 2.18 1 1 2.19-2.19zM17.38.62l-5.33 16.76L8.6 9.4.62 6zM9 8.06l4.88-4.87-9.32 3zm5.85-3.9L9.94 9l1.91 4.44z'
      />
    </svg>
  )
}

export default Send
