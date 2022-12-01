import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px 40px;
  background: #f0f3f9;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  font-weight: normal;
  padding-bottom: 100px;
`

export const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  border-radius: 5px;

  button {
    color: #373d3f;
    width: 85px;
    height: 42px;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border: 1.5px solid #49bfe0;
    background: transparent;

    &:first-child {
      border-radius: 5px 0px 0px 5px;
    }

    &:nth-child(2) {
      border-radius: 0px 5px 5px 0px;
      border-left: none;
    }
  }
`

export const SectionTitle = styled.div`
  font-weight: normal;
  font-size: 22px;
`

export const ActionButton = styled.button`
  color: #01293c;
  min-width: 170px;
  height: 42px;
  font-weight: bold;
  font-size: 16px;
  outline: none;
  border: 1.5px solid #49bfe0;
  border-radius: 5px;
  background: transparent;
`
export const Card = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f2f5fb 100%);
  box-shadow: 0px 4px 25px #e1e5ec;
  border-radius: 0.25rem;
  padding: 1.5rem;
  margin: 0px 10px;
`

export const CardTitle = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: #01283b;
`
