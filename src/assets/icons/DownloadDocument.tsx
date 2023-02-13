const DownloadDocument = (props: any): JSX.Element => {
  return (
    <svg width={props.width || 24} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'>
      <path
        fill={props.fill || '#fff'}
        d='M7.06 2v1.21a6.22 6.22 0 00-2.29-.44A6.14 6.14 0 00.44 4.56l2.92 2.92h1v1a4.12 4.12 0 002.69 1.16v2H4.43v2.63A1.76 1.76 0 006.18 16h8.75a2.63 2.63 0 002.63-2.63V2zm-1 5.61V5.73h-2l-.91-.91a4.49 4.49 0 011.59-.3A4.37 4.37 0 017.87 5.8L9.1 7l-.17.18a2.39 2.39 0 01-1.68.7 2.44 2.44 0 01-1.16-.27zm9.72 5.76a.88.88 0 11-1.75 0v-1.75H8.81V9.36a4 4 0 001.36-.9l.18-.18 2.47 2.47h1.24V9.52L8.81 4.29v-.54h7z'
      />
    </svg>
  )
}

export default DownloadDocument
