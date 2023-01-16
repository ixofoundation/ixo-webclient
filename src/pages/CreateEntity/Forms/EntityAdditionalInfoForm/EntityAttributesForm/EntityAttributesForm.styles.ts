import { Typography } from 'components/Typography'
import styled from 'styled-components'
import { Input } from '../../../Components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const FormRow = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
`

export const AddLink = styled(Typography)`
  cursor: pointer;
  width: fit-content;
`

export const RemoveLink = styled(Typography)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(120%, -50%);
  cursor: pointer;
`

export const AttributeInput = styled(Input)`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  height: 44px;
`
