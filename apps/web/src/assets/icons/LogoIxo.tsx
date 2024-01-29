const LogoIxo = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.1 11.65a1.2 1.2 0 111.2-1.2 1.22 1.22 0 01-1.2 1.2zm0-4.6a3.4 3.4 0 103.4 3.4 3.37 3.37 0 00-3.4-3.4zm-13.6 0V14H3V7.05H.5zm6.4 1.7l-1.7-1.7H3.5v1.7l1.7 1.7-1.7 1.7v1.7h1.7l1.7-1.7 1.7 1.7h1.7v-1.7l-1.7-1.7 1.7-1.7v-1.7H8.6zm-5.2-2.2a1.31 1.31 0 01-1.2-1.3 1.22 1.22 0 011.2-1.2 1.29 1.29 0 011.2 1.2 1.3 1.3 0 01-1.2 1.3z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default LogoIxo
