const LongText = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M19.9893 22H8.73926V24H19.9893V22ZM26.7393 14H8.73926V16H26.7393V14ZM8.73926 20H26.7393V18H8.73926V20ZM8.73926 10V12H26.7393V10H8.73926Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default LongText
