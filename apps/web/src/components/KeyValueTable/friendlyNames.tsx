const friendlyLinkedResourceNames = (name: string) => {
  switch (name) {
    case 'application/pdf':
      return 'PDF'
    case 'text/html':
      return 'HTML'
    case 'application/json':
    case 'application/json-ld':
      return 'JSON'
    default:
      return 'File'
  }
}

export { friendlyLinkedResourceNames }