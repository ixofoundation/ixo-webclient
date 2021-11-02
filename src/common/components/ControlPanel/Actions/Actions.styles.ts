import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const ActionLinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 0;
  width: 100%;
  > div {
    // width: 50% !important;
    width: 150px;
    height: 40px;
  }
  a {
    background: #F8F9FD;
    border-radius: 0.25rem;
    border: 1px solid #E0E5EF;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    color: #122045;
    transition: all 0.3s;
    cursor: pointer;
    min-height: 2.5rem;
    svg {
      // fill: #47568c;
      margin-right: 0.5rem;
      // min-width: 0.8rem;
      width: 14px;
      height: 14px;
    }
    span {
      // overflow: auto;
    }
    &:hover {
      border-color: #00D2FF;
      text-decoration: none;
    }
    &:focus {
      outline: none;
    }
    &.active {
      border: 1px solid ${(props: any): string => props.theme.ixoBlue};
    }
  }
`

export const AssistantContentWrapper = styled.div`
  height: 100%;
  background: white;
`

export const SummaryWrapper = styled(AssistantContentWrapper)`
  position: relative;
`

export const ActionWrapper = styled.div`
  background: #dfe7f4;
  position: absolute;
  width: 375px;
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
  z-index: -1;
  overflow: hidden auto;
  &.open {
    @keyframes openSection {
      0% {
        opacity: 0;
        transform: translateX(100%);
      }
      50% {
        opacity: 0;
        transform: translateX(-20%);
      }
      75% {
        opacity: 1;
      }
      100% {
        transform: translateX(-100%);
      }
    }
    animation: openSection 1s ease;
    opacity: 1;
    transform: translateX(-100%);
  }
  &.summary {
    width: calc(200% + 60px);
    @keyframes fadeInSummary {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0;
      }
      90% {
      }
      100% {
        opacity: 1;
      }
    }
    ${SummaryWrapper} > * {
      animation: fadeInSummary 1s ease-in-out;
    }
  }
  @media (max-width: ${deviceWidth.desktop}px) {
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
    &.summary {
      width: 100vw;
    }
  }
`

export const AssistantWrapper = styled.div`
  position: fixed;
  height: calc(100% - 72px);
  background: rgb(240, 243, 249);
  width: inherit;
  display: flex;
  box-shadow: inset 2px 0px 6px rgba(24, 103, 136, 0.13);
  flex-direction: column;
  .assistant-container {
    height: calc(100% - 20px);
  }
`

export const AssistantHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
  h3.assistant-heading {
    color: #436779;
    margin: 0;
    font-size: 18px;
  }
  .close-icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    box-shadow: 0px 1px 8px rgba(0, 42, 63, 0.1);
    cursor: pointer;
    svg {
      width: 13px;
      height: 13px;
    }
  }
  .back-icon {
    transform: rotate(180deg);
  }
`

export const AssistantProgress = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 2.25rem;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: black;
  }
  .icon-pulse-wrapper {
    padding: 1rem;
    border-radius: 50%;
    position: relative;
    z-index: 1;
    background: white;
    @keyframes iconPulse {
      0% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }
    &:after {
      content: '';
      display: block;
      position: absolute;
      z-index: -1;
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      border-radius: 50%;
      border: 2px solid #dfe3e8;
      opacity: 0;
      animation-delay: 1s;
      animation: iconPulse 1s ease-in-out;
      transform-origin: center;
    }
    &.repeat:after {
      animation-delay: 0;
      animation: iconPulse 1s infinite ease-in-out;
    }
  }
  .error {
    color: firebrick;
  }
  .close-button,
  button {
    background: none;
    border: none;
    outline: none !important;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.2;
    color: #a5adb0;
    text-decoration: none;
  }
`