import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/protocol'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'
import { SubDao } from 'types/dao'

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

export interface ManageSubDaosData {
  toAdd: SubDao[]
  toRemove: { address: string }[]
}

const initialState: ManageSubDaosData = {
  toAdd: [
    {
      addr: '',
    },
  ],
  toRemove: [],
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageSubDAOsModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ManageSubDaosData>(initialState)

  const validate = useMemo(() => {
    if (formData.toAdd.length === 0 && formData.toRemove.length === 0) {
      return false
    }
    return !(
      formData.toAdd.some(({ addr }) => !isAccountAddress(addr)) ||
      formData.toRemove.some(({ address }) => !isAccountAddress(address))
    )
  }, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data) => ({ ...data, [key]: value }))
  }

  // handle toAdd
  const handleAddMemberToAdd = () => {
    handleUpdateFormData('toAdd', [...formData.toAdd, [{ addr: '' }]])
  }
  const handleUpdateMemberToAdd = (index: number, data: any) => {
    handleUpdateFormData(
      'toAdd',
      formData.toAdd.map((member: any, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToAdd = (index: number) => {
    handleUpdateFormData(
      'toAdd',
      formData.toAdd.filter((member: any, i: number) => i !== index),
    )
  }

  // handle toRemove
  const handleAddMemberToRemove = () => {
    handleUpdateFormData('toRemove', [...formData.toRemove, []])
  }
  const handleUpdateMemberToRemove = (index: number, data: any) => {
    handleUpdateFormData(
      'toRemove',
      formData.toRemove.map((member: any, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToRemove = (index: number) => {
    handleUpdateFormData(
      'toRemove',
      formData.toRemove.filter((member: any, i: number) => i !== index),
    )
  }

  const handleConfirm = () => {
    onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
      validate={validate}
    >
      <FlexBox direction='column' width='100%' gap={2}>
        <Typography color='black' weight='medium' size='xl'>
          SubDAOs to recognise
        </Typography>
        <FlexBox direction='column' width='100%' gap={4}>
          {formData.toAdd.map((member: SubDao, index: number) => (
            <FlexBox key={index} width='100%' gap={4} alignItems='center'>
              <Input
                name='smart_contract_address'
                height={inputHeight}
                placeholder='Smart Contract Address'
                inputValue={member.addr}
                handleChange={(value) => handleUpdateMemberToAdd(index, { ...member, addr: value })}
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
          {formData.toRemove.map((member: { address: string }, index: number) => (
            <FlexBox key={index} width='100%' gap={4} alignItems='center'>
              <Input
                name='smart_contract_address'
                height={inputHeight}
                placeholder='Smart Contract Address'
                inputValue={member.address}
                handleChange={(value) => handleUpdateMemberToRemove(index, { ...member, address: value })}
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
    </SetupActionModalTemplate>
  )
}

export default SetupManageSubDAOsModal
