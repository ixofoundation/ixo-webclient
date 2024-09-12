const Wait = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 10} height='17' viewBox='0 0 10 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.453125 0.641113H9.90576V5.36743L6.75488 8.51831L9.90576 11.6692V16.3955H0.453125V11.6692L3.604 8.51831L0.453125 5.36743V0.641113ZM8.33032 12.063L5.17944 8.91217L2.02856 12.063V14.8201H8.33032V12.063ZM5.17944 8.12445L8.33032 4.97357V2.21655H2.02856V4.97357L5.17944 8.12445ZM3.604 3.79199H6.75488V4.38278L5.17944 5.95822L3.604 4.38278V3.79199Z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Wait
