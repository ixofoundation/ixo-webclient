






import DaoIcon from 'assets/icons/DaoIcon'

interface Style {
  color?: string
  fill?: string
  stroke?: string
}

export const getEntityIcon = (type: string | undefined, style?: Style): React.ReactNode | JSX.Element | null => {
  const svgStyle = style || {}
  switch (type) {
    case 'asset/device':
      return <img src="/assets/images/icon-asset.svg" transform='scale(.8)' {...svgStyle}  />
    case 'dao':
      return <DaoIcon transform='scale(.8)' {...svgStyle} />
    case 'project':
      return <img src="/assets/images/icon-project.svg" transform='scale(.8)' {...svgStyle}  />
    case 'investment':
      return <img src="/assets/images/icon-investment.svg" transform='scale(.8)' {...svgStyle}  />
    case 'oracle':
      return <img src="/assets/images/icon-oracle.svg" transform='scale(.8)' {...svgStyle}  />
    case 'deed/request':
      // TODO: Add deed icon
      return <img src="/assets/images/icon-project.svg" transform='scale(.8)' {...svgStyle}  />
    default:
      return null
  }
}
