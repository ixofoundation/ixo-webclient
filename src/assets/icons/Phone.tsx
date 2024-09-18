const Phone = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill={props.fill || '#fff'}
        d='M12.09.49H5.91A1.94 1.94 0 004 2.42v13.16a1.94 1.94 0 001.94 1.93h6.18A1.94 1.94 0 0014 15.58V2.42A1.94 1.94 0 0012.09.49zM9 16.74a1.16 1.16 0 111.16-1.16A1.16 1.16 0 019 16.74zm3.48-3.1h-7V2.81h7z'
      />
    </svg>
  )
}

export default Phone
