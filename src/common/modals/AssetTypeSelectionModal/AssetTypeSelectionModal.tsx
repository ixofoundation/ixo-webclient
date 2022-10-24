import React from 'react'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const AssetTypeSelectionModal: React.FC<Props> = ({
  open,
  setOpen,
}): JSX.Element => {
  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Select the Asset Type',
        titleNoCaps: true,
        noDivider: true,
      }}
      bgColor="white"
      handleToggleModal={(): void => setOpen(false)}
    ></ModalWrapper>
  )
}

export default AssetTypeSelectionModal
