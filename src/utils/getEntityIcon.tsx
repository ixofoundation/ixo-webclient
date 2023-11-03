import { ReactComponent as DAOIcon } from 'assets/images/icon-dao.svg'
import { ReactComponent as AssetIcon } from 'assets/images/icon-asset.svg'

export const getEntityIcon = (type: string | undefined): React.ReactNode | null => {
  switch (type) {
    case 'asset/device':
      return <AssetIcon transform='scale(.8)' />
    case 'dao':
      return <DAOIcon transform='scale(.8)' />
    default:
      return null
  }
}
