import { Box, FlexBox } from 'components/CoreEntry/App.styles'
import { AddAccordedRightModal, PaymentsSetupModal } from 'components/Modals'
import React, { useEffect, useState } from 'react'
import { PropertyBox } from 'screens/CreateEntity/Components'
import { TEntityPaymentModel } from 'types/entities'
import { omitKey } from 'utils/objects'

import { AccordedRight } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import SetupAgentCapabilityModal from 'components/Modals/SetupAccordedRights/SetupAgentCapabilityModal'
import { EntityAccordedRightConfig } from 'constants/entity'

interface Props {
  hidden: boolean
  accordedRight: { [key: string]: AccordedRight[] }
  updateAccordedRight: (accordedRight: { [id: string]: AccordedRight[] }) => void
}

const SetupAccordedRight: React.FC<Props> = ({ hidden, accordedRight, updateAccordedRight }): JSX.Element => {
  const [openAddAccordedRightModal, setOpenAddAccordedRightModal] = useState(false)
  const [openAddAccordedRightDetailsModalKey, setOpenAddAccordedRightDetailsModalKey] = useState<string | null>(null)

  // entity accorded rights
  const handleAddEntityAccordedRight = (key: string): void => {
     updateAccordedRight({
       ...accordedRight,
       [key]: [],
     })
  }
  const handleUpdateEntityAccordedRight = (key: string, data: AccordedRight[]): void => {
    updateAccordedRight({
      ...accordedRight,
      [key]: data,
    })
  }
  const handleRemoveEntityAccordedRight = (id: string): void => {
    updateAccordedRight(omitKey(accordedRight, id)) 
  }


  return (
    <>
      <FlexBox $direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(accordedRight).map(([key, value]) => {
            const Icon = EntityAccordedRightConfig[key as keyof typeof EntityAccordedRightConfig]?.icon
            const label = EntityAccordedRightConfig[key as keyof typeof EntityAccordedRightConfig]?.text
            return (
              <PropertyBox
                key={key}
                icon={<img src={Icon} alt='replaced' />}
                label={label}
                set={!!(value as any)?.data}
                handleRemove={(): void => handleRemoveEntityAccordedRight(key)}
                handleClick={(): void => setOpenAddAccordedRightDetailsModalKey(key)}
              />
            )
          })}
          <PropertyBox
            icon={<img src='/assets/images/icon-plus.svg' />}
            noData
            handleClick={(): void => setOpenAddAccordedRightModal(true)}
          />
        </Box>
      </FlexBox>
      <AddAccordedRightModal
        open={openAddAccordedRightModal}
        onClose={(): void => setOpenAddAccordedRightModal(false)}
        handleChange={handleAddEntityAccordedRight}
      />
      <SetupAgentCapabilityModal
        accordedRights={accordedRight?.agentCapability}
        isOpen={openAddAccordedRightDetailsModalKey === 'agentCapability'}
        onClose={(): void => setOpenAddAccordedRightDetailsModalKey(null)}
        handleChange={(agentCapability) =>
          updateAccordedRight({
            agentCapability: agentCapability,
          })
        }
      />
      <PaymentsSetupModal
        payments={accordedRight?.payments as any[]}
        open={openAddAccordedRightDetailsModalKey === 'payments'}
        onClose={(): void => setOpenAddAccordedRightDetailsModalKey(null)}
        handleChange={(payments: TEntityPaymentModel[]): void =>
          handleUpdateEntityAccordedRight('payments', payments as any)
        }
      />
    </>
  )
}

export default SetupAccordedRight
