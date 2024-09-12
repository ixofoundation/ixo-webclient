const Search = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg' className={props.className}>
      <path
        d='M17.2 16L13 11.75a6.56 6.56 0 001.7-4.4A7 7 0 007.6.45a7 7 0 00-7.1 6.9 7 7 0 007.1 6.9 7.3 7.3 0 004.1-1.2l4.2 4.2a.91.91 0 00.7.3 1.07 1.07 0 00.6-.2 1 1 0 000-1.4zM7.6 2.25a5.23 5.23 0 015.3 5.1 5.23 5.23 0 01-5.3 5.1 5.23 5.23 0 01-5.3-5.1 5.23 5.23 0 015.3-5.1z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Search
