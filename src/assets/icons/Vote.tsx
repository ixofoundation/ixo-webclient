const Vote = (props: any): JSX.Element => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={props.width || 18} height='18' fill='none' viewBox='0 0 24 24'>
      <path
        fill={props.fill || '#1D7BFE'}
        fillRule='evenodd'
        d='M22.66 12c0-5.887-4.773-10.66-10.66-10.66C6.113 1.34 1.34 6.114 1.34 12c0 5.887 4.773 10.66 10.66 10.66 5.887 0 10.66-4.773 10.66-10.66zM24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z'
        clipRule='evenodd'
      />
      <path
        fill={props.fill || '#1D7BFE'}
        d='M12 4l1.796 5.528h5.813l-4.703 3.416 1.796 5.528L12 15.056l-4.702 3.416 1.796-5.528-4.702-3.416h5.812L12 4z'
      />
    </svg>
  )
}

export default Vote
