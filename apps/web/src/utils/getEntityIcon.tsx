import ProjectIcon from 'assets/images/icon-project.svg'

import InvestmentIcon from 'assets/images/icon-investment.svg'

import OracleIcon from 'assets/images/icon-oracle.svg'

import AssetIcon from 'assets/images/icon-asset.svg'
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
      return <AssetIcon transform='scale(.8)' {...svgStyle} />
    case 'dao':
      return <DaoIcon transform='scale(.8)' {...svgStyle} />
    case 'project':
      return <ProjectIcon transform='scale(.8)' {...svgStyle} />
    case 'investment':
      return <InvestmentIcon transform='scale(.8)' {...svgStyle} />
    case 'oracle':
      return <OracleIcon transform='scale(.8)' {...svgStyle} />
    case 'deed/request':
      // TODO: Add deed icon
      return <ProjectIcon transform='scale(.8)' {...svgStyle} />
    default:
      return null
  }
}
