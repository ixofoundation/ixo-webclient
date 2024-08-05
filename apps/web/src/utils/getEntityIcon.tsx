import { ReactComponent as DAOIcon } from '/public/assets/images/icon-dao.svg'
import { ReactComponent as ProjectIcon } from '/public/assets/images/icon-project.svg'
import { ReactComponent as InvestmentIcon } from '/public/assets/images/icon-investment.svg'
import { ReactComponent as OracleIcon } from '/public/assets/images/icon-oracle.svg'
import { ReactComponent as AssetIcon } from '/public/assets/images/icon-asset.svg'

export const getEntityIcon = (type: string | undefined): React.ReactNode | JSX.Element | null => {
  switch (type) {
    case 'asset/device':
      return <AssetIcon transform='scale(.8)' />
    case 'dao':
      return <DAOIcon transform='scale(.8)' />
    case 'project':
      return <ProjectIcon transform='scale(.8)' />
    case 'investment':
      return <InvestmentIcon transform='scale(.8)' />
    case 'oracle':
      return <OracleIcon transform='scale(.8)' />
    default:
      return null
  }
}
