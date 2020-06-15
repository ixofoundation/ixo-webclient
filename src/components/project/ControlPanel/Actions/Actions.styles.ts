import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const ActionLinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
  > div {
    width: 50% !important;
  }

  a {
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
  overflow: hidden auto;
  &.open {
    opacity: 1;
    transform: translateX(-100%);
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    transform: translateX(0);
    border-radius: 0;
    &.open {
      transform: translateX(0);
    }
  }
`

export const AssistantWrapper = styled.div`
  height: calc(100% - 72px);
  .rw-conversation-container {
    box-shadow: none;
  }
`

export const AssistantHeader = styled.div`
  background: #143f54;
  padding: 18px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 72px;
  h3.assistant-heading {
    color: white;
    margin: 0;
    .chatbot-icon {
      width: 2.25rem;
      height: 2.25rem;
      background: #002a3f;
      margin-right: 1rem;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
  .back-icon {
    transform: rotate(180deg);
  }
`

export const SummaryWrapper = styled.div`
  height: 100%;
  background-color: white;
  position: relative;
`
