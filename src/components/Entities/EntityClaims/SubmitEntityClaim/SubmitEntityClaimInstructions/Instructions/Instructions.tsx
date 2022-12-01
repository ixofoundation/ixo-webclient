import * as React from 'react'
import { NavLink } from 'react-router-dom'
import ShortText from 'assets/icons/ShortText'
import DatePicker from 'assets/icons/DatePicker'
import LongText from 'assets/icons/LongText'
import Selection from 'assets/icons/Selection'
import QRCode from 'assets/icons/QRcode'
import QRCodeScan from 'assets/icons/QRcodeScan'
import Location from 'assets/icons/Location'
import UploadImage from 'assets/icons/UploadImage'
import UploadFile from 'assets/icons/UploadFile'
import UploadAudio from 'assets/icons/UploadAudio'
import UploadVideo from 'assets/icons/UploadVideo'
import Validation from 'assets/icons/Validation'
// When we add more types then add the relevant icons
/*
 */
import SelectPicture from 'assets/icons/SelectPicture'
import { Container, ContentWrapper, ListItems, ButtonWrapper, SubHeader } from './Instructions.styles'

interface Props {
  backLink: string
  listItems: { control: string; title: string }[]
  formLink: string
}

const Instructions: React.FunctionComponent<Props> = ({ backLink, listItems, formLink }) => {
  const icons = {
    text: ShortText,
    textarea: LongText,
    checkboxes: Selection,
    imagecheckboxes: SelectPicture,
    radio: Selection,
    singledateselector: DatePicker,
    daterangeselector: DatePicker,
    qrcode: QRCode,
    qrcodescan: QRCodeScan,
    locationselector: Location,
    imageupload: UploadImage,
    avatarupload: UploadImage,
    documentupload: UploadFile,
    videoupload: UploadVideo,
    audioupload: UploadAudio,
    emailvalidation: Validation,
    phonevalidation: Validation,
  }

  const totalRows = Math.ceil(listItems.length / 2)
  const rowArray = new Array(totalRows).fill(null)
  return (
    <Container>
      <ContentWrapper>
        <h1>Submit a claim</h1>
        <SubHeader>
          Thank you for being interested in our project. In order to complete the claim you’ll need to complete the
          following:
        </SubHeader>
        {rowArray.map((v, i) => {
          const property1 = listItems[i * 2]
          const property2 = listItems[i * 2 + 1]

          return (
            <div key={i} className='form-row'>
              <div key={property1.title} className='col-lg-6'>
                <ListItems>
                  {React.createElement(icons[property1.control], {
                    fill: '#C3D0E5',
                  })}
                  {property1.title}
                </ListItems>
              </div>
              {property2 && (
                <div key={property2.title} className='col-lg-6'>
                  <ListItems>
                    {React.createElement(icons[property2.control], {
                      fill: '#C3D0E5',
                    })}
                    {property2.title}
                  </ListItems>
                </div>
              )}
            </div>
          )
        })}
      </ContentWrapper>
      <ButtonWrapper>
        <NavLink className='close-button' to={backLink}>
          Come back later
        </NavLink>
        <NavLink className='start-button' to={formLink}>
          Start
        </NavLink>
      </ButtonWrapper>
    </Container>
  )
}

export default Instructions
