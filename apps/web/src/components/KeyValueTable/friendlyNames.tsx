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

const friendlyEntityTypes = (type: string) => {
  switch (type) {
    case 'protocol/project':
      return 'project'
    case 'protocol/oracle':
      return 'oracle'
    case 'protocol/dao':
      return 'dao'
    case 'protocol/asset':
      return 'service'
    case 'protocol/investment':
      return 'investment'
    default:
      return type
  }
}

export { friendlyLinkedResourceNames, friendlyEntityTypes }
