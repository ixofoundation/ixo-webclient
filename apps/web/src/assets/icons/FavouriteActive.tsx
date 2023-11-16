const FavouriteActive = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.9 3.05a4.59 4.59 0 016.6 0l.5.5.5-.5a4.59 4.59 0 016.6 0 4.53 4.53 0 011.4 3.3 4.71 4.71 0 01-1.4 3.3l-6.8 6.6a.37.37 0 01-.3.1.37.37 0 01-.3-.1l-6.8-6.7a4.53 4.53 0 01-1.4-3.3 4.31 4.31 0 011.4-3.2z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default FavouriteActive
