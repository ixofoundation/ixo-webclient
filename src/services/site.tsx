import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectEntityHeadUIConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

const SiteService = (): JSX.Element => {
  const headConfig = useSelector(selectEntityHeadUIConfig)
  const title = headConfig?.title
  const icon = headConfig?.icon

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {icon && <link rel='icon' href={icon} />}
    </Helmet>
  )
}

export default SiteService
