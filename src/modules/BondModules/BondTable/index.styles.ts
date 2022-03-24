import styled from 'styled-components'

export const TransactionTableWrapper = styled.div``

export const TransactionTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const TransactionTableTitle = styled.div`
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;

  color: #ffffff;
`

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 20px;
`

export const StyledButton = styled.button`
  background: unset;
  padding: 10px 20px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #39c3e6;
  border-radius: 4px;
  border: 1px solid #39c3e6;
  cursor: pointer;

  &.disable {
    opacity: 0.5;
    pointer-events: none;
  }
`

export const TransactionTableBody = styled.div``
