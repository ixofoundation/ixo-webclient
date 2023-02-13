type Props = {
  width?: number
}

const DAOStack = ({ width }: Props): JSX.Element => {
  return (
    <svg width={width || 18} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        d='M13.83 7.79l1.25-1.21L9 .68l-6.08 5.9 1.25 1.21L2.92 9l1.25 1.21-1.25 1.21L9 17.32l6.08-5.9-1.25-1.21L15.08 9zM4 6.58l5-4.82 5 4.82-.7.67L9 3.11 4.73 7.25zm5 5.89l3-2.93.7.67-3.7 3.6-3.72-3.6.72-.67zM6.54 9L9 6.61 11.46 9 9 11.39zM9 5.53L6 8.46l-.7-.67L9 4.19l3.72 3.6-.7.67zM4 9l.7-.67.72.67-.69.67zm10 2.42l-5 4.82-5-4.82.7-.67L9 14.89l4.27-4.14zm-.7-1.75L12.58 9l.69-.67L14 9z'
        fill='#f2f2f2'
      />
    </svg>
  )
}

export default DAOStack
