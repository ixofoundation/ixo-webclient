const DatePicker = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.7 15.9H11.5V18.1H13.7V15.9ZM18.1 15.9H15.9V18.1H18.1V15.9ZM22.5 15.9H20.3V18.1H22.5V15.9ZM24.7 8.2H23.6V6H21.4V8.2H12.6V6H10.4V8.2H9.29998C8.07898 8.2 7.11098 9.19 7.11098 10.4L7.09998 25.8C7.09998 27.01 8.07898 28 9.29998 28H24.7C25.91 28 26.9 27.01 26.9 25.8V10.4C26.9 9.19 25.91 8.2 24.7 8.2ZM24.7 25.8H9.29998V13.7H24.7V25.8Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default DatePicker
