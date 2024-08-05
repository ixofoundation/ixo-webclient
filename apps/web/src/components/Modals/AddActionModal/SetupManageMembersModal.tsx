import React, { useEffect, useMemo, useState } from 'react'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Input } from 'screens/CreateEntity/Components'
import { Typography } from 'components/Typography'
import { TProposalActionModel } from 'types/entities'
import styled from 'styled-components'
import { ReactComponent as PlusIcon } from '/public/assets/images/icon-plus.svg'
import { ReactComponent as TimesIcon } from '/public/assets/images/icon-times.svg'
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
  border: 1px solid ${(props) => props.theme.colors.blue[5]};
  border-radius: 8px;
  cursor: pointer;
`

export interface ManageMembersData {
  add: Member[]
  remove: { addr: string }[]
}

const initialState: ManageMembersData = {
  add: [],
  remove: [],
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupManageMembersModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const [formData, setFormData] = useState<ManageMembersData>(initialState)

  const validate = useMemo(() => {
    if (formData.add.length === 0 && formData.remove.length === 0) {
      return false
    }
    return !(
      formData.add.some(({ weight, addr }) => !weight || !isAccountAddress(addr)) ||
      formData.remove.some(({ addr }) => !isAccountAddress(addr))
    )
  }, [formData])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleAddMemberToAdd = () => {
    handleUpdateFormData('add', [...formData.add, []])
  }
  const handleUpdateMemberToAdd = (index: number, data: any) => {
    handleUpdateFormData(
      'add',
      formData.add.map((member, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToAdd = (index: number) => {
    handleUpdateFormData(
      'add',
      formData.add.filter((member, i: number) => i !== index),
    )
  }

  const handleAddMemberToRemove = () => {
    handleUpdateFormData('remove', [...formData.remove, []])
  }
  const handleUpdateMemberToRemove = (index: number, data: any) => {
    handleUpdateFormData(
      'remove',
      formData.remove.map((member, i: number) => (i === index ? data : member)),
    )
  }
  const handleRemoveMemberToRemove = (index: number) => {
    handleUpdateFormData(
      'remove',
      formData.remove.filter((member, i: number) => i !== index),
    )
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      width={'600px'}
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox $direction='column' width='100%' $gap={2}>
        <TitleAndDescription
          title='Members to add/update'
          description='Set the voting power of each address individually. DAO DAO will calculate the voting weight percentage for you.'
        />
        <FlexBox $direction='column' width='100%' $gap={4}>
          {formData.add.map((member: any, index: number) => (
            <FlexBox key={index} width='100%' $gap={4} $alignItems='center'>
              <Input
                name='voting_weight'
                height={inputHeight}
                placeholder='Voting weight'
                inputValue={member.weight}
                handleChange={(value) => handleUpdateMemberToAdd(index, { ...member, weight: Number(value) })}
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

          <AddButton $alignItems='center' $gap={2.5} onClick={handleAddMemberToAdd}>
            <SvgBox color='black'>
              <PlusIcon />
            </SvgBox>
            <Typography size='xl' weight='medium'>
              Add
            </Typography>
          </AddButton>
        </FlexBox>
      </FlexBox>

      <FlexBox $direction='column' width='100%' $gap={2}>
        <TitleAndDescription title='Members to remove' description='These addresses will be removed from the DAO.' />
        <FlexBox $direction='column' width='100%' $gap={4}>
          {formData.remove.map((member: any, index: number) => (
            <FlexBox key={index} width='100%' $gap={4} $alignItems='center'>
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

          <AddButton $alignItems='center' $gap={2.5} onClick={handleAddMemberToRemove}>
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
