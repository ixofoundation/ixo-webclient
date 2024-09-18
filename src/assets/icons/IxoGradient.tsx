const IxoGradient = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 19} height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9.60904 4.9325L18.6228 13.8658V18.2444H14.0199L9.60904 13.8658L5.24937 18.2444H0.675781V13.8658L9.60904 4.9325Z'
        fill={props.fill || '#fff'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.6924 5.72796L5.01788 1.0877L1.3095 1.0877L1.3095 4.56873L9.68778 12.8723L17.9896 4.57039L17.9896 1.0877L14.3126 1.0877L9.6924 5.72796ZM14.0495 0.454238L18.623 0.454239L18.623 4.83278L9.68978 13.7661L0.676032 4.83278L0.676032 0.454237L5.27891 0.454238L9.68978 4.83278L14.0495 0.454238Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default IxoGradient
