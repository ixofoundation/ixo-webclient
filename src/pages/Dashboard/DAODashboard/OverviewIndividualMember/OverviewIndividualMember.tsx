import { FlexBox } from 'components/App/App.styles'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { isAccountAddress } from 'utils/validation'
import Members from '../members.json'
import { DAOParticipation } from './DAOParticipation'
import { MemberProfile } from './MemberProfile'
import { Memberships } from './Memberships'

function useGetMemberByAddress(address: string) {
  return Members.find((item) => item.address === address)
}

const OverviewIndividualMember: React.FC = (): JSX.Element | null => {
  const { entityId, groupId, address } = useParams<{ entityId: string; groupId: string; address: string }>()
  const history = useHistory()
  const member = useGetMemberByAddress(address)
  const [selectedDao, setSelectedDao] = useState('')

  console.log('member', member)

  useEffect(() => {
    if (!isAccountAddress(address) || (isAccountAddress(address) && !member)) {
      history.push(`/entity/${entityId}/dashboard/overview/${groupId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, member])

  if (!member) {
    return null
  }
  return (
    <FlexBox direction='column' gap={6} width='calc(100% - 400px)'>
      <MemberProfile member={member as any} />

      <Memberships selectedDao={selectedDao} setSelectedDao={setSelectedDao} />

      {selectedDao && <DAOParticipation selectedDao={selectedDao} />}
    </FlexBox>
  )
}

export default OverviewIndividualMember
