import { FlexBox } from 'components/App/App.styles'
import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab, Path } from 'components/Dashboard/types'
import { Typography } from 'components/Typography'
import { useGetBondDid } from 'graphql/bonds'
import { useAccount } from 'hooks/account'
import useCurrentEntity, { useCurrentEntityBondLinkedEntity, useCurrentEntityProfile } from 'hooks/currentEntity'
import { Navigate, Route, useMatch, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { toTitleCase } from 'utils/formatters'
import { requireCheckDefault } from 'utils/images'
import EditEntity from './EditEntity'
import Outcomes from './Outcomes'
import Overview from './Overview'

const InvestmentDashboard: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const { entityId } = useParams<{ entityId: string }>()
  const isEditEntityRoute = useMatch('/entity/:entityId/dashboard/edit')
  const { entityType, owner } = useCurrentEntity()
  const { name } = useCurrentEntityProfile()
  const { registered, address } = useAccount()

  const routes: Path[] = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Overview',
      tooltip: 'Overview',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/outcomes`,
      icon: requireCheckDefault(require('assets/img/sidebar/outcomes.svg')),
      sdg: 'Outcomes',
      tooltip: 'Outcomes',
      strict: true,
    },
    {
      url: `/entity/${entityId}/dashboard/edit`,
      icon: requireCheckDefault(require('assets/img/sidebar/gear.svg')),
      sdg: 'Edit Entity',
      tooltip: 'Edit Entity',
      disabled: !registered || owner !== address,
    },
  ]

  const breadcrumbs = [
    {
      url: `/explore`,
      icon: '',
      sdg: `Explore ${toTitleCase(entityType)}s`,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/dashboard`,
      icon: '',
      sdg: 'Dashboard',
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-investment`,
      path: `/entity/${entityId}/overview`,
      title: toTitleCase(entityType),
      tooltip: `${toTitleCase(entityType)} Overview`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `${toTitleCase(entityType)} Management`,
    },
    {
      iconClass: `icon-funding`,
      path: `/entity/${entityId}/treasury`,
      title: 'Funding',
      tooltip: `Investment Funding`,
    },
  ]

  const bondLinkedEntity = useCurrentEntityBondLinkedEntity()
  const bondDid = bondLinkedEntity?.id || ''
  const { data: bondDetail } = useGetBondDid(bondDid)

  return (
    <Dashboard
      theme={isEditEntityRoute ? 'light' : 'dark'}
      title={
        <FlexBox $alignItems='center' $gap={6}>
          {name}
          <FlexBox background={theme.ixoNewBlue} p={2} $borderRadius={'8px'}>
            <Typography size='base' color='white'>
              {bondDetail?.state}
            </Typography>
          </FlexBox>
        </FlexBox>
      }
      subRoutes={routes}
      baseRoutes={breadcrumbs}
      tabs={tabs}
      entityType={entityType}
    >
      <Route path='/entity/:entityId/dashboard/overview' element={<Overview />} />
      <Route path='/entity/:entityId/dashboard/outcomes' element={<Outcomes />} />

      {registered && owner === address && <Route path='/entity/:entityId/dashboard/edit' element={<EditEntity />} />}
      <Route path='/entity/:entityId/dashboard' element={<Navigate to={`/entity/${entityId}/dashboard/overview`} />} />
    </Dashboard>
  )
}

export default InvestmentDashboard
