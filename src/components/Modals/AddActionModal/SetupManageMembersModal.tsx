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
import { Member } from 'types/dao'
import { TitleAndDescription } from './Component'

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

export interface ManageMembersData {
  toAdd: Member[]
  toRemove: { addr: string }[]
}

const initialState: ManageMembersData = {
  toAdd: [],
  toRemove: [],
}

interface Props {
  open: boolean
  action: TDeedActionModel
  onClose: () => void
  onSubmit: (data: any) => void
}

const SetupManageMembersModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ManageMembersData>(initialState)

  const validate = useMemo(() => {
    if (formData.toAdd.length === 0 && formData.toRemove.length === 0) {
      return false
    }
    return !(
      formData.toAdd.some(({ weight, addr }) => !weight || !isAccountAddress(addr)) ||
      formData.toRemove.some(({ addr }) => !isAccountAddress(addr))
    )
  }, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddMemberToAdd = () => {
    handleUpdateFormData('toAdd', [...formData.toAdd, []])
  }
  const handleUpdateMemberToAdd = (index: number, data: any) => {
    handleUpdateFormData(
      'toAdd',
      formData.toAdd.map((member, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToAdd = (index: number) => {
    handleUpdateFormData(
      'toAdd',
      formData.toAdd.filter((member, i: number) => i !== index),
    )
  }

  const handleAddMemberToRemove = () => {
    handleUpdateFormData('toRemove', [...formData.toRemove, []])
  }
  const handleUpdateMemberToRemove = (index: number, data: any) => {
    handleUpdateFormData(
      'toRemove',
      formData.toRemove.map((member, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToRemove = (index: number) => {
    handleUpdateFormData(
      'toRemove',
      formData.toRemove.filter((member, i: number) => i !== index),
    )
  }

  const handleConfirm = () => {
    onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      width={'600px'}
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={handleConfirm}
      validate={validate}
    >
      <FlexBox direction='column' width='100%' gap={2}>
        <TitleAndDescription
          title='Members to add/update'
          description='Set the voting power of each address individually. DAO DAO will calculate the voting weight percentage for you.'
        />
        <FlexBox direction='column' width='100%' gap={4}>
          {formData.toAdd.map((member: any, index: number) => (
            <FlexBox key={index} width='100%' gap={4} alignItems='center'>
              <Input
                name='voting_weight'
                height={inputHeight}
                placeholder='Voting weight'
                inputValue={member.weight}
                handleChange={(value) => handleUpdateMemberToAdd(index, { ...member, weight: value })}
                style={{ textAlign: 'right' }}
                wrapperStyle={{ flex: '0 0 200px' }}
              />
              <Input
                name='member_address'
                height={inputHeight}
                placeholder='Address'
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
        <TitleAndDescription title='Members to remove' description='These addresses will be removed from the DAO.' />
        <FlexBox direction='column' width='100%' gap={4}>
          {formData.toRemove.map((member: any, index: number) => (
            <FlexBox key={index} width='100%' gap={4} alignItems='center'>
              <Input
                name='member_address'
                height={inputHeight}
                placeholder='Address'
                inputValue={member.addr}
                handleChange={(value) => handleUpdateMemberToRemove(index, { ...member, addr: value })}
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
