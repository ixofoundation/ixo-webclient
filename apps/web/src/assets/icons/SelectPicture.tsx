const SelectPicture = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8.71765 10.5V23.5H25.7177V10.5H8.71765ZM18.7177 12.5V16H15.7177V12.5H18.7177ZM10.7177 12.5H13.7177V16H10.7177V12.5ZM10.7177 21.5V18H13.7177V21.5H10.7177ZM15.7177 21.5V18H18.7177V21.5H15.7177ZM23.7177 21.5H20.7177V18H23.7177V21.5ZM20.7177 16V12.5H23.7177V16H20.7177Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default SelectPicture
