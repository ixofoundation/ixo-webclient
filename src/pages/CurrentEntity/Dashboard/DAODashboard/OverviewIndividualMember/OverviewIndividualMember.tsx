import { FlexBox } from 'components/App/App.styles'
import { useGetMember } from 'hooks/dao'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { isAccountAddress } from 'utils/validation'
import { DAOParticipation } from './DAOParticipation'
import { MemberProfile } from './MemberProfile'
import { Memberships } from './Memberships'

const OverviewIndividualMember: React.FC = (): JSX.Element | null => {
  const { entityId, coreAddress, address } = useParams<{ entityId: string; coreAddress: string; address: string }>()
  const history = useHistory()
  const { data } = useGetMember(address)
  const [selectedDao, setSelectedDao] = useState('')

  console.log('useGetMember', data)

  useEffect(() => {
    if (!isAccountAddress(address)) {
      history.push(`/entity/${entityId}/dashboard/overview/${coreAddress}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <FlexBox direction='column' gap={6} width='calc(100% - 400px)'>
      <MemberProfile />

      <Memberships
        daos={data?.daos}
        investments={data?.investments}
        projects={data?.projects}
        assets={data?.assets}
        selectedDao={selectedDao}
        setSelectedDao={setSelectedDao}
      />

      {selectedDao && <DAOParticipation selectedDao={selectedDao} />}
    </FlexBox>
  )
}

export default OverviewIndividualMember
