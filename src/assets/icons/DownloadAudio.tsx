const DownloadAudio = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M6.27 8.54V3.08a2.73 2.73 0 015.46 0v5.46a2.73 2.73 0 11-5.45 0zm7.55 0A4.72 4.72 0 019 13.19a4.72 4.72 0 01-4.82-4.65H2.63a6.35 6.35 0 005.46 6.12v3h1.82v-3a6.34 6.34 0 005.46-6.12z'
      />
    </svg>
  )
}

export default DownloadAudio
