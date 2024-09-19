const Project = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.2.5H2.8A2.26 2.26 0 00.5 2.8v12.4a2.26 2.26 0 002.3 2.3h12.4a2.26 2.26 0 002.3-2.3V2.8A2.26 2.26 0 0015.2.5zM2.8 2h12.4a.79.79 0 01.8.8v2.3H2V2.8a.86.86 0 01.8-.8zM2 15.2V6.7h3.9V16H2.8a.86.86 0 01-.8-.8zm13.2.8H7.5V6.7H16v8.5a.86.86 0 01-.8.8z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Project
