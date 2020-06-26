import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ShortText from '../../../../assets/icons/ShortText'
import DatePicker from '../../../../assets/icons/DatePicker'
import LongText from '../../../../assets/icons/LongText'
import Selection from '../../../../assets/icons/Selection'
import QRcode from '../../../../assets/icons/QRcode'
// When we add more types then add the relevant icons
/*
import UploadImage from '../../../../assets/icons/UploadImage'
import UploadAudio from '../../../../assets/icons/UploadAudio'
import UploadFile from '../../../../assets/icons/UploadFile'
import Validation from '../../../../assets/icons/Validation'
import Location from '../../../../assets/icons/Location'
import UploadVideo from '../../../../assets/icons/UploadVideo'
*/
import SelectPicture from '../../../../assets/icons/SelectPicture'
import {
  Container,
  ContentWrapper,
  ListItems,
  ButtonWrapper,
  StartButton,
  SubHeader,
} from './Instructions.styles'

interface Props {
  backLink: string
  listItems: { control: string; title: string }[]
  toggleInstructions: () => void
}

const Instructions: React.FunctionComponent<Props> = ({
  backLink,
  listItems,
  toggleInstructions,
}) => {
  const icons = {
    ['text']: ShortText,
    ['textarea']: LongText,
    ['checkboxes']: Selection,
    ['imagecheckboxes']: SelectPicture,
    ['radio']: Selection,
    ['singledateselector']: DatePicker,
    ['daterangeselector']: DatePicker,
    ['qrcode']: QRcode,
  }

  return (
    <Container>
      <ContentWrapper>
        <h1>Submit a claim</h1>
        <SubHeader>
          Thank you for being interested in our project. In order to complete
          the claim you’ll need to complete the following:
        </SubHeader>
        <ListItems>
          {listItems.map(
            (item, index): JSX.Element => {
              return (
                <div key={index}>
                  {React.createElement(icons[item.control], {
                    fill: '#C3D0E5',
                  })}

                  {item.title}
                </div>
              )
            },
          )}
        </ListItems>
      </ContentWrapper>
      <ButtonWrapper>
        <NavLink className="close-button" to={backLink}>
          Come back later
        </NavLink>
        <StartButton onClick={toggleInstructions}>Start</StartButton>
      </ButtonWrapper>
    </Container>
  )
}

export default Instructions
