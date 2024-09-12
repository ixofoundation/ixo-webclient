const Trash = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 18} viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.55 3.55h-3.4v-.9a2.5 2.5 0 00-2.6-2.5h-3.4a2.48 2.48 0 00-2.5 2.5v.8h-3.4a1.06 1.06 0 00-.9.9.88.88 0 00.9.8h.9v10.2a2.5 2.5 0 002.6 2.5h8.5a2.56 2.56 0 002.6-2.5V5.25h.9a.88.88 0 00.9-.8c0-.4-.7-.9-1.1-.9zm-10.2-.9a.82.82 0 01.9-.8h3.4a.88.88 0 01.9.8v.8h-5.2v-.8zM14 15.35a.82.82 0 01-.9.8H4.65a.88.88 0 01-.9-.8V5.25H14z'
        fill={props.fill || '#fff'}
      />
    </svg>
  )
}

export default Trash
