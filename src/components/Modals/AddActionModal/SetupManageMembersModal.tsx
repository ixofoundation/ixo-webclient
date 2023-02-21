import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TDeedActionModel } from 'types/protocol'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from 'assets/images/icon-times.svg'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { isAccountAddress } from 'utils/validation'

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
  membersToAdd: [],
  membersToRemove: [],
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageMembersModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<any>(initialState)

  const validate = useMemo(() => {
    if (formData.membersToAdd.length === 0 && formData.membersToRemove.length === 0) {
      return false
    }
    return !(
      formData.membersToAdd.some(
        ({ codeId, smartContractAddress }: any) => !codeId || !isAccountAddress(smartContractAddress),
      ) ||
      formData.membersToRemove.some(
        ({ codeId, smartContractAddress }: any) => !codeId || !isAccountAddress(smartContractAddress),
      )
    )
  }, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddMemberToAdd = () => {
    handleUpdateFormData('membersToAdd', [...formData.membersToAdd, []])
  }
  const handleUpdateMemberToAdd = (index: number, data: any) => {
    handleUpdateFormData(
      'membersToAdd',
      formData.membersToAdd.map((member: any, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToAdd = (index: number) => {
    handleUpdateFormData(
      'membersToAdd',
      formData.membersToAdd.filter((member: any, i: number) => i !== index),
    )
  }

  const handleAddMemberToRemove = () => {
    handleUpdateFormData('membersToRemove', [...formData.membersToRemove, []])
  }
  const handleUpdateMemberToRemove = (index: number, data: any) => {
    handleUpdateFormData(
      'membersToRemove',
      formData.membersToRemove.map((member: any, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToRemove = (index: number) => {
    handleUpdateFormData(
      'membersToRemove',
      formData.membersToRemove.filter((member: any, i: number) => i !== index),
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
          Members to add/update
        </Typography>
        <FlexBox direction='column' width='100%' gap={4}>
          {formData.membersToAdd.map((member: any, index: number) => (
            <FlexBox key={index} width='100%' gap={4} alignItems='center'>
              <Input
                name='code_id'
                height={inputHeight}
                placeholder='ID'
                inputValue={member.codeId}
                handleChange={(value) => handleUpdateMemberToAdd(index, { ...member, codeId: value })}
                style={{ textAlign: 'center' }}
                wrapperStyle={{ flex: '0 0 100px' }}
              />
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
          Members to remove
        </Typography>
        <FlexBox direction='column' width='100%' gap={4}>
          {formData.membersToRemove.map((member: any, index: number) => (
            <FlexBox key={index} width='100%' gap={4} alignItems='center'>
              <Input
                name='code_id'
                height={inputHeight}
                placeholder='ID'
                inputValue={member.codeId}
                handleChange={(value) => handleUpdateMemberToRemove(index, { ...member, codeId: value })}
                style={{ textAlign: 'center' }}
                wrapperStyle={{ flex: '0 0 100px' }}
              />
              <Input
                name='smart_contract_address'
                height={inputHeight}
                placeholder='Smart Contract Address'
                inputValue={member.smartContractAddress}
                handleChange={(value) => handleUpdateMemberToRemove(index, { ...member, smartContractAddress: value })}
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

export default SetupManageMembersModal
