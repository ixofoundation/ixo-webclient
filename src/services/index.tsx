import AccountUpdateService from './account'
import EntityUpdateService from './entity'
import SiteService from './site'
import ConfigService from './config'

const Services = (): JSX.Element => {
  return (
    <>
      <AccountUpdateService />
      <EntityUpdateService />
      <SiteService />
      <ConfigService />
    </>
  )
}

export default Services
