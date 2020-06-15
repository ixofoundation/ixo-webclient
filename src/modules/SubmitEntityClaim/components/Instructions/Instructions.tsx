import * as React from 'react'
import CalendarSort from '../../../../assets/icons/CalendarSort'
import Location from '../../../../assets/icons/Location'
import UploadFile from '../../../../assets/icons/UploadFile'
import Validation from '../../../../assets/icons/Validation'
import ShortText from '../../../../assets/icons/ShortText'
import LongText from '../../../../assets/icons/LongText'
import Selection from '../../../../assets/icons/Selection'
import UploadImage from '../../../../assets/icons/UploadImage'
import UploadAudio from '../../../../assets/icons/UploadAudio'
import SelectPicture from '../../../../assets/icons/SelectPicture'
import UploadVideo from '../../../../assets/icons/UploadVideo'
import QRcode from '../../../../assets/icons/QRcode'
import {
  Container,
  ListItems,
  PositionButtons,
  ReturnButton,
  StartButton,
} from './Instructions.styles'

interface Props {
  toggleInstructions: () => void
}

export const Instructions: React.FunctionComponent<Props> = ({
  toggleInstructions,
}) => {
  const listItems = [
    { icon: 'short', description: 'Fill in short answer' },
    { icon: 'date', description: 'Date Picker' },
    { icon: 'long', description: 'Give a long text answer' },
    { icon: 'selection', description: 'Selector rate out of 10' },
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
        return <ShortText fill="#C3D0E5" />
      case 'date':
        return <CalendarSort fill="#C3D0E5" />
      case 'long':
        return <LongText fill="#C3D0E5" />
      case 'selection':
        return <Selection fill="#C3D0E5" />
      case 'image':
        return <UploadImage fill="#C3D0E5" />
      case 'recording':
        return <UploadAudio fill="#C3D0E5" />
      case 'file':
        return <UploadFile fill="#C3D0E5" />
      case 'valid':
        return <Validation fill="#C3D0E5" />
      case 'location':
        return <Location fill="#C3D0E5" />
      case 'options':
        return <Selection fill="#C3D0E5" />
      case 'picture':
        return <SelectPicture fill="#C3D0E5" />
      case 'video':
        return <UploadVideo fill="#C3D0E5" />
      case 'qr':
        return <QRcode fill="#C3D0E5" />
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
              <div key={index}>
                {renderIcon(item.icon)} {item.description}
              </div>
            )
          },
        )}
      </ListItems>
      <hr />
      <PositionButtons>
        <ReturnButton>Come back later</ReturnButton>
        <StartButton onClick={toggleInstructions}>Start</StartButton>
      </PositionButtons>
    </Container>
  )
}

export default Instructions
