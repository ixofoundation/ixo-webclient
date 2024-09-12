const Facebook = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.53 0h-2.32a4.1 4.1 0 00-4.3 4.42v2H4.59c-.23 0-.34.17-.34.4v2.97a.38.38 0 00.34.4h2.32v7.47a.32.32 0 00.34.34h3a.33.33 0 00.34-.34v-7.47h2.71a.32.32 0 00.34-.34V6.91c0-.12-.05-.17-.11-.29a.48.48 0 00-.28-.11h-2.72V4.75c0-.84.17-1.24 1.25-1.24h1.52a.32.32 0 00.34-.34V.4c.23-.23.06-.4-.11-.4z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Facebook
