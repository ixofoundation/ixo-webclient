const Projects = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 36} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
      <circle fill={props.fill || '#fff'} className='st0' cx='60' cy='60' r='30' />
      <path
        fill={props.fill || '#fff'}
        d='M60,10.91c27.07,0,49.09,22.02,49.09,49.09S87.07,109.09,60,109.09S10.91,87.07,10.91,60S32.93,10.91,60,10.91M60,0C26.86,0,0,26.86,0,60s26.86,60,60,60c33.14,0,60-26.86,60-60S93.14,0,60,0L60,0z'
      />
    </svg>
  )
}

export default Projects
