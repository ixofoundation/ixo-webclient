import * as React from 'react'
import styled from 'styled-components'
import Calendar from '../../../assets/icons/Calendar'

export const Container = styled.div`
  position: relative;
  z-index: 10;
  left: 303px;
  bottom: 90px;
  width: 826px;
  height: 750px;
  background: white;
  border-radius: 4px;
  padding: 2.5rem;
  overflow: hidden;

  h1 {
  }

  h3 {
  }

  hr {
    border: 1px solid #dfe3e8;
    width: 500%;
    margin-left: -200%;
    margin-top: 3rem;
  }
`

export const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const ListItems = styled.div`
  height: 300px;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-content: flex-start;
  max-width: calc(100% / 2 - 2.5rem);
`
export const ButtonSection = styled.div`
  display: inline-block;
`
export const ReturnButton = styled.button`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  color: #a5adb0;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`

export const StartButton = styled.button`
  background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
  border-radius: 4px;
  border-color: transparent;
  color: #fff;
  margin-left: 33rem;
`
// export interface Props {}

export const ClaimInfoPage: React.FunctionComponent<{}> = (): JSX.Element => {
  const listItems = [
    { icon: 'short', description: 'Fill in short answer' },
    { icon: 'date', description: 'Date Picker' },
    { icon: 'long', description: 'Give a long text answer' },
    { icon: 'selector', description: 'Selector rate out of 10' },
    { icon: 'image', description: 'Upload an image' },
    { icon: 'recording', description: 'Upload audio recording' },
    { icon: 'file', description: 'Upload a file/document' },
    { icon: 'valid', description: 'Validation field' },
    { icon: 'location', description: 'Enter location' },
    { icon: 'options', description: 'Choose between options' },
    { icon: 'picture', description: 'Select a picture' },
    { icon: 'video', description: 'Upload a video' },
    { icon: 'qr', description: 'Scan a QR code' },
  ]

  const renderIcon = (icon: string): JSX.Element => {
    switch (icon) {
      case 'short':
        return <Calendar fill="#000" />
      case 'date':
        return <Calendar fill="#000" />
      case 'long':
        return <Calendar fill="#000" />
      case 'selector':
        return <Calendar fill="#000" />
      case 'image':
        return <Calendar fill="#000" />
      case 'recording':
        return <Calendar fill="#000" />
      case 'file':
        return <Calendar fill="#000" />
      case 'valid':
        return <Calendar fill="#000" />
      case 'location':
        return <Calendar fill="#000" />
      case 'options':
        return <Calendar fill="#000" />
      case 'picture':
        return <Calendar fill="#000" />
      case 'video':
        return <Calendar fill="#000" />
      case 'qr':
        return <Calendar fill="#000" />
      default:
        return null
    }
  }
  return (
    <Container>
      <h1>Submit a claim</h1>
      <h3>
        Thank you for being interested in our project. In order to complete the
        claim you’ll need to complete the following:
      </h3>
      <ListItems>
        {listItems.map(
          (item, index): JSX.Element => {
            return (
              <div
                key={index}
                style={{ marginRight: '4rem', marginBottom: '1rem' }}
              >
                {renderIcon(item.icon)} {item.description}
              </div>
            )
          },
        )}
      </ListItems>
      <hr />
      <ButtonSection>
        <ReturnButton>Come back later</ReturnButton>
        <StartButton>Start</StartButton>
      </ButtonSection>
    </Container>
  )
}

export default ClaimInfoPage
