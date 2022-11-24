interface Prop {
  width?: number
  fill?: string
}

const Right = ({ fill }: Prop): JSX.Element => {
  return (
    <svg width='5' height='8' viewBox='0 0 5 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.32811 6.41294L1.12198 7.25977L4.48828 3.66904L1.12198 0.0783194L0.328109 0.925141L2.90052 3.66904L0.32811 6.41294Z'
        fill={fill || 'white'}
      />
    </svg>
  )
}

export default Right
