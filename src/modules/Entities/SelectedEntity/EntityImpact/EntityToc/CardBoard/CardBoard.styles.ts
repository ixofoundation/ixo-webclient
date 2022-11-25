import styled from 'styled-components'

export const Column = styled.div`
  flex: 1;
  margin: 0rem 0.5rem;
  display: flex;
  flex-direction: column;
`

export const ColumnHeader = styled.div`
  color: #83d9f2;
  font-size: 1rem;
  font-weight: 700;
  text-transform: Uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`

export const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #0c3549;
  border-radius: 0.25rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(242, 245, 251, 0.9) 100%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.180339);
  padding: 0.375rem 0.625rem;
  flex: 1;
`
