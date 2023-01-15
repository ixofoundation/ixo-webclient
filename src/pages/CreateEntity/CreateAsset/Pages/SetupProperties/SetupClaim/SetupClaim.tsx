import { Box } from 'components/App/App.styles'
import { ClaimSetupModal1 } from 'components/Modals'
import { Typography } from 'components/Typography'
import { useCreateEntityState } from 'hooks/createEntity'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { TEntityClaimModel1 } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

const SetupClaim: React.FC = (): JSX.Element => {
  const { claim, updateClaim } = useCreateEntityState()
  const [entityClaim, setEntityClaim] = useState<{ [id: string]: any }>({})

  // popups - claim modal
  const handleOpenEntityClaimModal = (key: string, open: boolean): void => {
    setEntityClaim((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }
  // entity claim
  const handleAddEntityClaim = (): void => {
    const id = uuidv4()
    setEntityClaim((pre) => ({
      ...pre,
      [id]: {
        id,
        openModal: true,
      },
    }))
  }
  const handleUpdateEntityClaim = (id: string, claim: TEntityClaimModel1): void => {
    setEntityClaim((pre) => ({ ...pre, [id]: claim }))
  }
  const handleRemoveEntityClaim = (id: string): void => {
    setEntityClaim((pre) => omitKey(pre, id))
  }

  // hooks - claims
  useEffect(() => {
    if (Object.values(claim).length > 0) {
      setEntityClaim(claim)
    }
  }, [claim])
  useEffect(() => {
    updateClaim(entityClaim ?? {})
    // eslint-disable-next-line
  }, [entityClaim])

  return (
    <>
      <Box className='d-flex flex-column'>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Claims
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(entityClaim)
            .filter(([, value]) => value?.template?.title)
            .map(([key, value]) => (
              <PropertyBox
                key={key}
                set={value?.template?.id}
                label={value?.template?.title}
                handleRemove={(): void => handleRemoveEntityClaim(key)}
                handleClick={(): void => handleOpenEntityClaimModal(key, true)}
              />
            ))}
          <PropertyBox icon={<PlusIcon />} handleClick={handleAddEntityClaim} />
        </Box>
      </Box>
      {/* {Object.entries(entityClaim).map(([key, value]) => (
        <ClaimSetupModal
          key={key}
          claim={value}
          open={value.openModal}
          onClose={(): void => {
            handleOpenEntityClaimModal(key, false)
            if (!value?.template?.templateId) {
              handleRemoveEntityClaim(key)
            }
          }}
          handleChange={(claim: TEntityClaimModel): void => {
            handleUpdateEntityClaim(key, claim)
            handleOpenEntityClaimModal(key, false)
          }}
        />
      ))} */}
      {Object.entries(entityClaim).map(([key, value]) => (
        <ClaimSetupModal1
          key={key}
          claim={value}
          open={value.openModal}
          onClose={(): void => {
            handleOpenEntityClaimModal(key, false)
            if (!value?.template?.id) {
              handleRemoveEntityClaim(key)
            }
          }}
          onChange={(claim: TEntityClaimModel1): void => {
            handleUpdateEntityClaim(key, claim)
            handleOpenEntityClaimModal(key, false)
          }}
        />
      ))}
    </>
  )
}

export default SetupClaim
