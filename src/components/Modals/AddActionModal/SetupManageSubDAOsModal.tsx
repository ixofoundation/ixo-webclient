import React, { useEffect, useState } from 'react'
import * as Modal from 'react-modal'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { Button, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { DeedActionConfig, TDeedActionModel } from 'types/protocol'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'

const inputHeight = '48px'

const AddButton = styled(FlexBox)`
  width: 100%;
  height: ${inputHeight};
  padding: 10px;
  color: black;
  border: 1px solid ${(props) => props.theme.ixoBlue};
  border-radius: 8px;
  cursor: pointer;
`

const initialState = {
  subDAOsToAdd: [],
  subDAOsToRemove: [],
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageSubDAOsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)
  const Icon = DeedActionConfig[action.group].items[action.type].icon

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddMemberToAdd = () => {
    handleUpdateFormData('subDAOsToAdd', [...formData.subDAOsToAdd, []])
  }
  const handleUpdateMemberToAdd = (index: number, data: any) => {
    handleUpdateFormData(
      'subDAOsToAdd',
      formData.subDAOsToAdd.map((member: any, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToAdd = (index: number) => {
    handleUpdateFormData(
      'subDAOsToAdd',
      formData.subDAOsToAdd.filter((member: any, i: number) => i !== index),
    )
  }

  const handleAddMemberToRemove = () => {
    handleUpdateFormData('subDAOsToRemove', [...formData.subDAOsToRemove, []])
  }
  const handleUpdateMemberToRemove = (index: number, data: any) => {
    handleUpdateFormData(
      'subDAOsToRemove',
      formData.subDAOsToRemove.map((member: any, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToRemove = (index: number) => {
    handleUpdateFormData(
      'subDAOsToRemove',
      formData.subDAOsToRemove.filter((member: any, i: number) => i !== index),
    )
  }

  const handleConfirm = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={8} width='440px'>
        <FlexBox alignItems='center' gap={2}>
          <SvgBox color={theme.ixoBlack} svgWidth={8} svgHeight={8}>
            <Icon />
          </SvgBox>
          <Typography weight='medium' size='xl'>
            {action.type}
          </Typography>
        </FlexBox>

        <FlexBox direction='column' width='100%' gap={4}>
          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              SubDAOs to recognise
            </Typography>
            <FlexBox direction='column' width='100%' gap={4}>
              {formData.subDAOsToAdd.map((member: any, index: number) => (
                <FlexBox key={index} width='100%' gap={4} alignItems='center'>
                  <Input
                    name='smart_contract_address'
                    height={inputHeight}
                    placeholder='Smart Contract Address'
                    inputValue={member.smartContractAddress}
                    handleChange={(value) => handleUpdateMemberToAdd(index, { ...member, smartContractAddress: value })}
                  />
                  <SvgBox color='black' onClick={() => handleRemoveMemberToAdd(index)} cursor='pointer'>
                    <TimesIcon />
                  </SvgBox>
                </FlexBox>
              ))}

              <AddButton alignItems='center' gap={2.5} onClick={handleAddMemberToAdd}>
                <SvgBox color='black'>
                  <PlusIcon />
                </SvgBox>
                <Typography size='xl' weight='medium'>
                  Add
                </Typography>
              </AddButton>
            </FlexBox>
          </FlexBox>

          <FlexBox direction='column' width='100%' gap={2}>
            <Typography color='black' weight='medium' size='xl'>
              SubDAOs to remove
            </Typography>
            <FlexBox direction='column' width='100%' gap={4}>
              {formData.subDAOsToRemove.map((member: any, index: number) => (
                <FlexBox key={index} width='100%' gap={4} alignItems='center'>
                  <Input
                    name='smart_contract_address'
                    height={inputHeight}
                    placeholder='Smart Contract Address'
                    inputValue={member.smartContractAddress}
                    handleChange={(value) =>
                      handleUpdateMemberToRemove(index, { ...member, smartContractAddress: value })
                    }
                  />
                  <SvgBox color='black' onClick={() => handleRemoveMemberToRemove(index)} cursor='pointer'>
                    <TimesIcon />
                  </SvgBox>
                </FlexBox>
              ))}

              <AddButton alignItems='center' gap={2.5} onClick={handleAddMemberToRemove}>
                <SvgBox color='black'>
                  <PlusIcon />
                </SvgBox>
                <Typography size='xl' weight='medium'>
                  Add
                </Typography>
              </AddButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%'>
          <Button variant='primary' onClick={handleConfirm} style={{ width: '100%' }}>
            Confirm
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default SetupManageSubDAOsModal
