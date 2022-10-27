import styled from 'styled-components'
import { Input } from '../components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 10px;
`

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > * {
    white-space: nowrap;
  }
`

export const FormInput = styled(Input)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3;
  height: 44px;
`
