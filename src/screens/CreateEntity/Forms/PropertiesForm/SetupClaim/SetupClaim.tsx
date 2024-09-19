import { Box, FlexBox } from 'components/CoreEntry/App.styles'
import { ClaimSetupModal } from 'components/Modals'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
import { TEntityClaimModel } from 'types/entities'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  hidden: boolean
  claim: { [id: string]: TEntityClaimModel }
  updateClaim: (claim: { [id: string]: TEntityClaimModel }) => void
}

const SetupClaim: React.FC<Props> = ({ hidden, claim, updateClaim }): JSX.Element => {
  const [selectedClaim, setSelectedClaim] = useState<TEntityClaimModel | undefined>()
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleUpdateEntityClaim = (id: string, newClaim: TEntityClaimModel): void => {
    if (JSON.stringify(selectedClaim) === JSON.stringify(newClaim)) {
      return
    }

    if (!selectedClaim?.template && Object.values(claim).some((item) => item.template?.id === newClaim.template?.id)) {
      handleRemoveEntityClaim(id)
      return
    }

    let _claim = claim
    if (newClaim.isHeadlineMetric) {
      _claim = Object.fromEntries(
        Object.entries(_claim).map(([key, value]) => [key, { ...value, isHeadlineMetric: false }]),
      )
    }

    updateClaim({ ..._claim, [id]: newClaim })
  }
  const handleRemoveEntityClaim = (id: string): void => {
    const _claim = claim
    if (_claim[id]?.isHeadlineMetric) {
      const altClaimId = Object.keys(claim).find((item) => item !== id)
      if (altClaimId) {
        _claim[altClaimId].isHeadlineMetric = true
      }
    }
    updateClaim(omitKey(_claim, id))
  }

  return (
    <>
      <FlexBox $direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(claim).map(([key, value]) => (
            <PropertyBox
              key={key}
              set={!!value?.template?.id}
              label={value?.template?.title}
              handleRemove={(): void => handleRemoveEntityClaim(key)}
              handleClick={(): void => {
                setEditModalOpen(true)
                setSelectedClaim(value)
              }}
            />
          ))}
          <PropertyBox
            icon={<img src='/assets/images/icon-plus.svg' />}
            noData
            handleClick={(): void => {
              setEditModalOpen(true)
              setSelectedClaim({
                id: uuidv4(),
                template: undefined,
                isEncrypted: false,
                isHeadlineMetric: Object.keys(claim).length === 0,
              })
            }}
          />
        </Box>
      </FlexBox>
      {selectedClaim && (
        <ClaimSetupModal
          claim={selectedClaim}
          open={editModalOpen}
          onClose={(): void => setEditModalOpen(false)}
          onChange={(claim: TEntityClaimModel): void => handleUpdateEntityClaim(selectedClaim.id, claim)}
        />
      )}
    </>
  )
}

export default SetupClaim
