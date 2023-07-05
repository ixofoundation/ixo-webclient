import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  box-shadow: none;
  padding-top: 2rem;
`

export const MessagesContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 70px) !important;
  height: calc(100% - 70px) !important;
  background-color: transparent;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1cbd0;
    border-radius: 8px;
  }
`

export const SendButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  transition: 1s;
  background: ${(props) => props.theme.ixoNewBlue};
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;

  &:disabled {
    opacity: 0;
  }
`

export const MessageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  line-height: 1.25;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  white-space: pre-line;
`

export const MessageIn = styled.div`
  color: #090c0e;
  margin-bottom: 12px;
  box-shadow: 0px 2px 15px rgba(212, 221, 232, 0.4);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafd 112.49%);
  padding: 13px 15px;
  max-width: 85%;
  border-radius: 0 15px 15px 15px;
  overflow-wrap: break-word;
`

export const MessageOut = styled.div`
  color: #fff;
  margin-bottom: 12px;
  box-shadow: 0px 2px 15px rgba(212, 221, 232, 0.4);
  background: linear-gradient(180deg, #10597b 0%, #1b6e90 93.09%);
  border-radius: 15px 0px 15px 15px;
  padding: 13px 15px;
  margin-left: auto;
  overflow-wrap: break-word;
  max-width: 85%;
`

export const StyledForm = styled.form`
  margin-top: auto;
  background: white;
  display: flex;
  align-items: center;
  box-shadow: inset 2px 0px 6px rgba(24, 103, 136, 0.13);
  padding: 12px 1.5rem;

  textarea {
    border: none;
    outline: none;
    width: 100%;
    height: 28px;
  }
`

const Wave = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }

  100% {
    opacity: 0;
  }
`

export const TypingIndicator = styled.div`
  position: relative;
  text-align: center;
  width: 25px;
  height: 13px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;

  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 2px;
    background: #b2cad7;
    animation: ${Wave} 1.6s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.4s;
    }

    &:nth-child(3) {
      animation-delay: -1.2s;
    }
  }
`

export const ActionButtonContainer = styled(MessageWrapper)`
  margin-bottom: 1rem;
`

export const ActionButton = styled.button`
  background: transparent;
  border: 1px solid #1a6b8c;
  border-radius: 23px;
  height: 2.5rem;
  color: #125c7e;
  margin-right: 0.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

export const StyledTextarea = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 28px;
  margin-bottom: 0;
  padding: 0;
  line-height: 1.5;

  ::placeholder {
    color: #a5adb0;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`
