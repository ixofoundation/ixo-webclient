import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectEntityHeadUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const SiteService = (): JSX.Element => {
  const headConfig = useSelector(selectEntityHeadUIConfig)
  const title = headConfig?.title

  return <Helmet>{title && <title>{title}</title>}</Helmet>
}

export default SiteService
