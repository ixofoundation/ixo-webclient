const Commented = (props: any): JSX.Element => {
  return (
    <svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.1931 2.20117H3.4225C2.68202 2.20117 2.07617 2.7797 2.07617 3.48679V15.0574L4.76883 12.4862H14.1931C14.9336 12.4862 15.5394 11.9076 15.5394 11.2005V3.48679C15.5394 2.7797 14.9336 2.20117 14.1931 2.20117Z'
        fill={props.fill || '#39C3E6'}
      />
    </svg>
  )
}

export default Commented
