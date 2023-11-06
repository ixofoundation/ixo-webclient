import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { useQuery } from 'hooks/window'
import { GrantEntityAccountClaimsSubmitAuthz } from 'lib/protocol/claim'
import { Button } from 'pages/CreateEntity/Components'
import { Avatar } from 'pages/CurrentEntity/Components'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { truncateString } from 'utils/formatters'
import { errorToast, successToast } from 'utils/toast'

const AgentUserCard: React.FC<{ address: string }> = ({ address }) => {
  const { getQuery } = useQuery()
  const collectionId = getQuery('collectionId')
  const { entityId } = useParams<{ entityId: string }>()
  const { signingClient, signer } = useAccount()
  const adminAddress = useCurrentEntityAdminAccount()
  const [granting, setGranting] = useState(false)

  const handleGrant = async () => {
    try {
      setGranting(true)

      const payload = {
        entityDid: entityId,
        name: 'admin',
        adminAddress: adminAddress,
        collectionId,
        granteeAddress: address,
        agentQuota: 10,
        overrideCurretGrants: false,
      }
      const response = await GrantEntityAccountClaimsSubmitAuthz(signingClient, signer, payload)
      if (response.code !== 0) {
        throw response.rawLog
      }

      successToast(null, 'Successfully Granted!')
    } catch (error: any) {
      console.error(error)
      errorToast(null, typeof error === 'string' ? error : error.message)
    } finally {
      setGranting(false)
    }
  }

  return (
    <FlexBox
      width='300px'
      direction='column'
      gap={4}
      p={4}
      borderRadius='4px'
      border='1px solid #083347'
      background='#01273A'
    >
      <FlexBox width='100%' gap={4} alignItems='center'>
        <Avatar size={80} />
        <FlexBox direction='column'>
          <Typography size='lg' weight='bold'>
            {truncateString(address, 16, 'middle')}
          </Typography>
        </FlexBox>
      </FlexBox>

      <Button variant='secondary' size='md' textTransform='capitalize' onClick={handleGrant} loading={granting}>
        Grant
      </Button>
    </FlexBox>
  )
}

interface Props {
  title: string
  agents: string[]
}
const AgentUserSection: React.FC<Props> = ({ title, agents }) => {
  return (
    <FlexBox width='100%' direction='column' gap={6}>
      <FlexBox width='100%'>
        <Typography size='2xl'>{title}</Typography>
      </FlexBox>
      {agents.length > 0 ? (
        <FlexBox width='100%' gap={6}>
          {agents.map((agent) => (
            <AgentUserCard key={agent} address={agent} />
          ))}
        </FlexBox>
      ) : (
        <FlexBox width='100%' height='100px' justifyContent='center' alignItems='center'>
          No Agents
        </FlexBox>
      )}
    </FlexBox>
  )
}

export default AgentUserSection
