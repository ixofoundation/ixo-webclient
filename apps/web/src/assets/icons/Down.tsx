const Down = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className || ''}
    >
      <path
        d='M9 13.85a1.14 1.14 0 01-.8-.3L.8 6.15a1.21 1.21 0 010-1.6 1.12 1.12 0 011.6 0l6.6 6.6 6.6-6.7a1.21 1.21 0 011.6 0 1.21 1.21 0 010 1.6l-7.4 7.4a.91.91 0 01-.8.4z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Down
