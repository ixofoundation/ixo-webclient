const Medium = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.55 4.3h-.9c-.2 0-.9.3-.9.5v8.5c0 .2.6.4.9.4h.9v1.9h-6.1v-1.9h1.2V4.9h-.2l-2.9 10.6h-2.3L4.45 4.9h-.3v8.8h1.2v1.9H.45v-1.9h.7a.46.46 0 00.5-.4V4.8a.64.64 0 00-.5-.5h-.6V2.4h6.3L9 9.9h.1l2-7.5h6.5v1.9z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Medium
