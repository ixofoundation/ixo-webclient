const IndicateArrow = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 10} height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.297852 8.44294L7.10571 1.63508H2.86928V0.349365H9.29785V6.77794H8.01214V2.54151L1.20428 9.34937L0.297852 8.44294Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default IndicateArrow
