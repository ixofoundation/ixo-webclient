import styled from 'styled-components'

export const FormWrapper = styled.div`
  background: ${(props): string => props.theme.ixoWhite};
  border: 1px solid ${(props): string => props.theme.ixoNewBlue};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  width: 400px;
  display: flex;
  flex-direction: column;
`

export const FormHeader = styled.div`
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
`

export const FormBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const FormRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`
