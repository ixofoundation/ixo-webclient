const Selection = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} viewBox='0 0 34 34' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M25.4785 9V21H13.4785V9H25.4785ZM25.4785 7H13.4785C12.3785 7 11.4785 7.9 11.4785 9V21C11.4785 22.1 12.3785 23 13.4785 23H25.4785C26.5785 23 27.4785 22.1 27.4785 21V9C27.4785 7.9 26.5785 7 25.4785 7ZM17.9485 19L14.4785 15.5L15.8785 14.09L17.9485 16.17L23.0785 11L24.4785 12.41L17.9485 19ZM9.47852 11H7.47852V25C7.47852 26.1 8.37852 27 9.47852 27H23.4785V25H9.47852V11Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Selection
