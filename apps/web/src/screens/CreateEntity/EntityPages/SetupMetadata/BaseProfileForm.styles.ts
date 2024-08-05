import styled from 'styled-components'

export const FormWrapper = styled.div`
  background: ${(props): string => props.theme.ixoWhite};
  border: 1px solid ${(props): string => props.theme.colors.blue[5]};
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;

  width: 400px;
  display: flex;
  flex-direction: column;
`

export const FormHeader = styled.div``

export const FormBody = styled.div`
  padding: 8px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const FormRow = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`

export const Badge = styled.span<{ tagColor?: string }>`
  background-color: ${(props): string => props.tagColor ?? '#000000'};
  border-radius: 8px;
  padding: 5px 7px;
  color: #ffffff;

  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
`
