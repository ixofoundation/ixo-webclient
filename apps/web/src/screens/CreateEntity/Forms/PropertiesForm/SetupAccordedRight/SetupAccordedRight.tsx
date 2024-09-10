import { Box, FlexBox } from 'components/App/App.styles'
import { AddAccordedRightModal, PaymentsSetupModal } from 'components/Modals'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { TEntityPaymentModel } from 'types/entities'
import { omitKey } from 'utils/objects'

import PlusIcon from 'assets/images/icon-plus.svg'
import { AccordedRight } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityAccordedRightConfig } from 'constants/entity'

interface Props {
  hidden: boolean
  accordedRight: { [key: string]: AccordedRight }
  updateAccordedRight: (accordedRight: { [id: string]: AccordedRight }) => void
}

const SetupAccordedRight: React.FC<Props> = ({ hidden, accordedRight, updateAccordedRight }): JSX.Element => {
  const [entityAccordedRight, setEntityAccordedRight] = useState<{ [key: string]: any }>({})
  const [openAddAccordedRightModal, setOpenAddAccordedRightModal] = useState(false)

  // popups - accorded rights modal
  const handleOpenEntityAccordedRightModal = (key: string, open: boolean): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }

  // entity accorded rights
  const handleAddEntityAccordedRight = (key: string): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: { ...EntityAccordedRightConfig[key] },
    }))
  }
  const handleUpdateEntityAccordedRight = (key: string, data: any): void => {
    setEntityAccordedRight((pre) => ({
      ...pre,
      [key]: { ...pre[key], data },
    }))
  }
  const handleRemoveEntityAccordedRight = (id: string): void => {
    setEntityAccordedRight((pre) => omitKey(pre, id))
  }

  // hooks - accordedRight
  useEffect(() => {
    if (Object.values(accordedRight).length > 0) {
      setEntityAccordedRight(accordedRight)
    }
  }, [accordedRight])
  useEffect(() => {
    updateAccordedRight(entityAccordedRight ?? {})
    // eslint-disable-next-line
  }, [entityAccordedRight])

  return (
    <>
      <FlexBox $direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(accordedRight).map(([key, value]) => {
            const Icon = EntityAccordedRightConfig[key]?.icon
            const label = EntityAccordedRightConfig[key]?.text
            return (
              <PropertyBox
                key={key}
                icon={Icon && <Icon />}
                label={label}
                set={!!(value as any)?.data}
                handleRemove={(): void => handleRemoveEntityAccordedRight(key)}
                handleClick={(): void => handleOpenEntityAccordedRightModal(key, true)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddAccordedRightModal(true)} />
        </Box>
      </FlexBox>
      <AddAccordedRightModal
        open={openAddAccordedRightModal}
        onClose={(): void => setOpenAddAccordedRightModal(false)}
        handleChange={handleAddEntityAccordedRight}
      />
      <PaymentsSetupModal
        payments={entityAccordedRight?.payments?.data}
        open={entityAccordedRight?.payments?.openModal}
        onClose={(): void => handleOpenEntityAccordedRightModal('payments', false)}
        handleChange={(payments: TEntityPaymentModel[]): void => handleUpdateEntityAccordedRight('payments', payments)}
      />
    </>
  )
}

export default SetupAccordedRight
