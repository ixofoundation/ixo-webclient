import styled from 'styled-components'

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
  > div {
    width: 50% !important;
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
