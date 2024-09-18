const Expand = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.15 14.2V4.5a2.44 2.44 0 00-1.7 2.2v7.6a2.41 2.41 0 002.6 2.3h8.5A2.47 2.47 0 0014 15.1H3.05c-.5-.1-.9-.4-.9-.9zm12.7-12.8h-8.5a2.38 2.38 0 00-2.5 2.3v7.6a2.41 2.41 0 002.6 2.3H15a2.47 2.47 0 002.6-2.3V3.7a2.56 2.56 0 00-2.75-2.3zm.9 9.8a.86.86 0 01-.8.8h-8.6a.74.74 0 01-.8-.8V3.7a.86.86 0 01.8-.8h8.5a.74.74 0 01.8.8v7.5z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Expand
