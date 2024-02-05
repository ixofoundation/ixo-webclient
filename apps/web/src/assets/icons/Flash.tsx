const Flash = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.1 6.18a.33.33 0 00-.3-.18h-3.54L13.8.48a.27.27 0 000-.3.33.33 0 00-.3-.18H8.7a.33.33 0 00-.3.18l-4.5 9v.24a.33.33 0 00.3.18h3.06l-3.36 8c0 .18 0 .36.12.42h.18a.45.45 0 00.24-.12L14 6.48a.45.45 0 00.06-.3z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Flash
