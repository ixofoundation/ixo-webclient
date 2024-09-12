const Marketplace = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.09 1.91H1.91v1.77h14.18zm.91 8.86V9l-.88-4.43H1.91L1 9v1.77h.88v5.32h8.86v-5.32h3.54v5.32h1.78v-5.32zm-8 3.54H3.68v-3.54H9z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Marketplace
