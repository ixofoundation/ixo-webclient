const DownloadVideo = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M13.62 7.61V4.38a.93.93 0 00-.92-.93H1.6a.93.93 0 00-.92.93v9.24a.93.93 0 00.92.93h11.1a.93.93 0 00.92-.93v-3.23l3.7 3.7V3.91zm-2.77 2.31H8.08v2.78H6.23V9.92H3.45V8.08h2.78V5.3h1.85v2.78h2.77z'
      />
    </svg>
  )
}

export default DownloadVideo
