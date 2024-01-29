const CalendarSort = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.48 8.15H4.77v1.7h1.71zm3.33 0H8.19v1.7H9.9v-1.7zm3.42 0h-1.71v1.7h1.71zm1.71-5.94h-.81V.5h-1.71v1.71H5.58V.5H3.87v1.71h-.81a1.71 1.71 0 00-1.71 1.71v11.87a1.65 1.65 0 001.71 1.71h11.88a1.71 1.71 0 001.71-1.71V3.92a1.65 1.65 0 00-1.71-1.71zm0 13.58H3.06V6.44h11.88v9.35z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default CalendarSort
