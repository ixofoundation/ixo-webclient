interface Style {
  color?: string
  fill?: string
  stroke?: string
}

export const getEntityIcon = (type: string | undefined, style?: Style): React.ReactNode | JSX.Element | null => {
  const svgStyle = style || {}
  switch (type) {
    case 'asset/device':
      return <img src='/assets/images/icon-asset.svg' {...svgStyle} />
    case 'dao':
      return <img src='/assets/images/icon-dao.svg' {...svgStyle} />
    case 'project':
      return <img src='/assets/images/icon-project.svg' {...svgStyle} />
    case 'investment':
      return <img src='/assets/images/icon-investment.svg' {...svgStyle} />
    case 'oracle':
      return <img src='/assets/images/icon-oracle.svg' {...svgStyle} />
    case 'deed/request':
      // TODO: Add deed icon
      return <img src='/assets/images/icon-project.svg' {...svgStyle} />
    default:
      return null
  }
}
