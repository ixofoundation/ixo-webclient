import styled from 'styled-components'

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
  > div {
    width: 50% !important;
  }
`

export const ActionLink = styled.a`
  background: #ffffff;
  border-radius: 0.75rem;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 1.2;
  display: flex;
  align-items: center;
  width: calc(100% - 1rem) !important;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem;
  color: #47568c;
  transition: all 0.3s;
  border: 1px solid transparent;
  cursor: pointer;
  svg {
    fill: #47568c;
    margin-right: 1rem;
  }
  &:hover {
    color: #47568c;
    text-decoration: none;
    border: 1px solid ${(props): string => props.theme.ixoBlue};
  }
  &:focus {
    outline: none;
  }
`

export const AssistantWrapper = styled.div`
  position: absolute;
  width: calc(100% + 30px);
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transform: translateX(0);
  transition: all 0.3s;
  &.open {
    opacity: 1;
    transform: translateX(-100%);
  }
`

export const SummaryWrapper = styled.div`
  background: white;
  position: absolute;
  width: calc(200% + 60px);
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transform: translateX(0);
  transition: all 0.3s;
  &.open {
    opacity: 1;
    transform: translateX(-100%);
  }
`
