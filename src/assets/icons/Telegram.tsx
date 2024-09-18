const Telegram = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M.79 8.67l3.9 1.4 1.5 4.8a.44.44 0 00.7.2l2.2-1.7a.61.61 0 01.8 0l3.9 2.8a.44.44 0 00.7-.3l3-13.6c.1-.3-.3-.6-.6-.5L.79 7.87a.42.42 0 000 .8zM6 9l7.9-4.6c.1-.1.3.1.2.2l-6.6 5.7a1.23 1.23 0 00-.4.8l-.2 1.6c0 .2-.3.2-.4 0l-.9-2.8A.81.81 0 016 9z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Telegram
