import styled from 'styled-components'
import { Input } from '../../../Components'

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FormMetricRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${(props): string => props.theme.ixoGrey100};

  & > .remove {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: ${(props): string => props.theme.ixoWhite};
    background: ${(props): string => props.theme.ixoGrey300};

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 30px;
    font-weight: 500;

    &:hover {
      background: ${(props): string => props.theme.ixoNewBlue};
    }
  }
`

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
