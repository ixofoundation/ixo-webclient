const Pending = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 .5A8.5 8.5 0 1017.5 9 8.49 8.49 0 009 .5zm0 15.7A7.2 7.2 0 1116.2 9 7.17 7.17 0 019 16.2zm0-4.9c.3 0 .6-.4.6-1v-5c0-.6-.2-1-.6-1s-.6.5-.6 1v4.9c0 .6.3 1.1.6 1.1zm.8 1.3a.86.86 0 01-.8.8.8.8 0 010-1.6.86.86 0 01.8.8z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Pending
