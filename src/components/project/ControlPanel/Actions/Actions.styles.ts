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

export const ActionWrapper = styled.div`
  background: #dfe7f4;
  position: absolute;
  width: calc(200% + 60px);
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  border-right: 1px solid white;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 3px;
  padding: 15px;
  transform: translateX(0);
  transition: all 0.5s;
  z-index: -9;
  &.open {
    opacity: 1;
    transform: translateX(-100%);
  }
`

export const AssistantWrapper = styled.div`
  height: 100%;
  display: none;
  &.open {
    display: block;
  }
  .rw-conversation-container {
    box-shadow: none;
  }
`

export const SummaryWrapper = styled.div`
  height: 100%;
  background-color: white;
  display: none;
  &.open {
    display: block;
  }
`

export const Summary = styled.div`
  // TODO
`
