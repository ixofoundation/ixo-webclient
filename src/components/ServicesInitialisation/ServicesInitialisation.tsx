import AccountUpdateService from 'optimized/services/account'
// import EntityUpdateService from './entity'
import SiteService from './site'
import ConfigService from './config'

export const ServicesInitialisation = (): JSX.Element => {
  return (
    <>
      <AccountUpdateService />
      {/* <EntityUpdateService /> */}
      <SiteService />
      <ConfigService />
    </>
  )
}

