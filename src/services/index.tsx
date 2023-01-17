import AccountUpdateService from './account'
import EntityUpdateService from './entity'
import SiteService from './site'

const Services = (): JSX.Element => {
  return (
    <>
      <AccountUpdateService />
      <EntityUpdateService />
      <SiteService />
    </>
  )
}

export default Services
