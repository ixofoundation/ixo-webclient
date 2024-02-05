const Menu = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.7 4H1.3a.86.86 0 01-.8-.8.86.86 0 01.8-.8h11.4a.86.86 0 01.8.8.86.86 0 01-.8.8zm4 5.8H1.3a.8.8 0 110-1.6h15.4a.86.86 0 01.8.8.86.86 0 01-.8.75zm-4 5.9H1.3a.8.8 0 110-1.6h11.4a.8.8 0 010 1.6z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Menu
