import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectEntityHeadUIConfig } from 'redux/entities/entities.selectors'

const SiteService = (): JSX.Element => {
  const headConfig = useSelector(selectEntityHeadUIConfig)
  const title = headConfig?.title
  const icon = headConfig?.icon

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {icon && <link rel='icon' href={`${process.env.PUBLIC_URL}/${icon}`} />}
    </Helmet>
  )
}

export default SiteService
