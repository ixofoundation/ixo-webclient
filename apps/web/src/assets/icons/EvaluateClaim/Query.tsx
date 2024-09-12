const Query = (props: any): JSX.Element => {
  return (
    <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.35254 8.24955C8.55826 7.63691 8.9643 7.12031 9.49875 6.79125C10.0332 6.46219 10.6616 6.34191 11.2726 6.4517C11.8836 6.56149 12.4378 6.89428 12.837 7.39111C13.2362 7.88795 13.4547 8.51677 13.4538 9.16621C13.4538 10.9995 10.8288 11.9162 10.8288 11.9162'
        stroke={props.fill || '#7C8E97'}
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.8984 15.584H10.9072'
        stroke={props.fill || '#7C8E97'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Query
