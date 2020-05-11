import styled from 'styled-components'

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
`

export const ActionLink = styled.a`
  background: #ffffff;
  border-radius: 0.75rem;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.2;
  display: flex;
  align-items: center;
  width: calc(50% - 1rem);
  padding: 0.5rem 0.75rem;
  margin: 0.5rem;
  color: #47568c;
  transition: all 0.3s;
  border: 1px solid transparent;
  svg {
    fill: #47568c;
    margin-right: 1rem;
  }
  &:hover {
    color: #47568c;
    text-decoration: none;
    border: 1px solid ${(props): string => props.theme.ixoBlue};
  }
`
