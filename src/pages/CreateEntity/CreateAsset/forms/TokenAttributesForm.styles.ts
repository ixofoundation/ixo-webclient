import { Typography } from 'components/App/App.styles'
import styled from 'styled-components'
import { Input } from '../../components'

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

export const TokenAttributeInput = styled(Input)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3;
  height: 44px;
`
