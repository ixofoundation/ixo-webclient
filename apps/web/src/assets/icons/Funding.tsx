const Funding = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.17 11a6.67 6.67 0 11-13.34 0C1.83 7.53 7.32 1 8 .31V.24a.66.66 0 011 0l.08.07c.55.71 6 7.22 6 10.67zM8.81 2.43a.44.44 0 00-.7 0A32.5 32.5 0 003.79 9.1 2.79 2.79 0 015 8.63c1.65-.31 3.45.55 5.1 2.75.31.31.71.62 1.1.94a1.89 1.89 0 001.17.47c.32 0 .48 0 .63-.16a3.18 3.18 0 00.71-1.57c-.08-2.19-3-6.27-4.87-8.63z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Funding
