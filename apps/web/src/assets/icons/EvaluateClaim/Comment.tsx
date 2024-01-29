const Comment = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || '13'}
      height={props.height || '12'}
      viewBox='0 0 13 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11.2734 7.82031C11.2734 8.10763 11.1593 8.38318 10.9561 8.58634C10.753 8.78951 10.4774 8.90365 10.1901 8.90365H3.6901L1.52344 11.0703V2.40365C1.52344 2.11633 1.63757 1.84078 1.84074 1.63761C2.0439 1.43445 2.31945 1.32031 2.60677 1.32031H10.1901C10.4774 1.32031 10.753 1.43445 10.9561 1.63761C11.1593 1.84078 11.2734 2.11633 11.2734 2.40365V7.82031Z'
        stroke={props.fill || '#7C8E97'}
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Comment
