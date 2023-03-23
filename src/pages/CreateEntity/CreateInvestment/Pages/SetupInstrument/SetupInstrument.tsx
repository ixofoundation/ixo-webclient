import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { AddInvestmentInstrumentModal, CreateBondModal } from 'components/Modals'
import { InvestmentInstrumentsConfig } from 'types/protocol'
import { Box } from 'components/App/App.styles'
import { useCreateEntityState } from 'hooks/createEntity'

const SetupInstrument: React.FC = (): JSX.Element => {
  const { gotoStep } = useCreateEntityState()
  const [investmentInstrument, setInvestmentInstrument] = useState<{ [key: string]: any }>({})
  const [openAddInstrumentModal, setOpenAddInstrumentModal] = useState(false)

  // const canSubmit = useMemo(() => !!investmentInstrument?.alphaBond?.data, [investmentInstrument])
  const canSubmit = true

  const handleOpenAddInstrumentModal = (key: string, open: boolean): void => {
    setInvestmentInstrument((pre) => ({
      ...pre,
      [key]: {
        ...InvestmentInstrumentsConfig[key],
        ...pre[key],
        openModal: open,
      },
    }))
  }

  return (
    <Box className='d-flex flex-column' style={{ gap: 20 }}>
      <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
        {Object.entries(investmentInstrument).map(([key, value]) => (
          <PropertyBox
            key={key}
            icon={<value.icon />}
            label={value.text}
            handleClick={(): void => handleOpenAddInstrumentModal(key, true)}
          />
        ))}
        <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddInstrumentModal(true)} />
      </Box>

      <Box className='d-flex' style={{ gap: 20 }}>
        <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
          Back
        </Button>
        <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
          Continue
        </Button>
      </Box>

      <AddInvestmentInstrumentModal
        open={openAddInstrumentModal}
        onClose={(): void => setOpenAddInstrumentModal(false)}
        handleChange={(key: string): void => handleOpenAddInstrumentModal(key, true)}
      />
      <CreateBondModal
        open={investmentInstrument.alphaBond?.openModal}
        onClose={(): void => handleOpenAddInstrumentModal('alphaBond', false)}
      />
    </Box>
  )
}

export default SetupInstrument
