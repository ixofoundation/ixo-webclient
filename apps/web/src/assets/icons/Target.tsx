const Target = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill={props.fill || '#fff'}
        d='M16.19 8.27A7.23 7.23 0 009.8 1.89V.23H8.2v1.66a7.23 7.23 0 00-6.39 6.38H.15v1.61h1.66a7.24 7.24 0 006.39 6.39v1.5h1.6v-1.5a7.24 7.24 0 006.39-6.39h1.66V8.27zM9 14.71a5.63 5.63 0 115.63-5.63A5.63 5.63 0 019 14.71zm3.22-5.63A3.22 3.22 0 119 5.86a3.22 3.22 0 013.22 3.22z'
      />
    </svg>
  )
}

export default Target
