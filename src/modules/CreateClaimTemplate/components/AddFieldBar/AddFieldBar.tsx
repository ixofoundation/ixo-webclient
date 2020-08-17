import * as React from 'react'
import { FieldBarWrapper } from './AddFieldBar.styles'
import { Tooltip } from '../../../../common/components/Tooltip'
import ShortText from '../../../../assets/icons/ShortText'
import DatePicker from '../../../../assets/icons/DatePicker'
import LongText from '../../../../assets/icons/LongText'
import Selection from '../../../../assets/icons/Selection'
import QRcode from '../../../../assets/icons/QRcode'
import Location from '../../../../assets/icons/Location'
import UploadImage from '../../../../assets/icons/UploadImage'
import UploadFile from '../../../../assets/icons/UploadFile'
import UploadAudio from '../../../../assets/icons/UploadAudio'
import UploadVideo from '../../../../assets/icons/UploadVideo'
import Validation from '../../../../assets/icons/Validation'
import SelectPicture from '../../../../assets/icons/SelectPicture'

import questions from '../../question_types.json'

interface Props {
  addField(control): void
}

class AddFieldBar extends React.Component<Props> {
  icons = {
    ['text']: ShortText,
    ['textarea']: LongText,
    ['checkboxes']: Selection,
    ['imagecheckboxes']: SelectPicture,
    ['radio']: Selection,
    ['singledateselector']: DatePicker,
    ['daterangeselector']: DatePicker,
    ['qrcode']: QRcode,
    ['locationselector']: Location,
    ['imageupload']: UploadImage,
    ['avatarupload']: UploadImage,
    ['documentupload']: UploadFile,
    ['videoupload']: UploadVideo,
    ['audioupload']: UploadAudio,
    ['emailvalidation']: Validation,
    ['phonevalidation']: Validation,
  }

  render(): JSX.Element {
    const { addField } = this.props
    return (
      <FieldBarWrapper>
        {questions.questions.map(
          (question): JSX.Element => {
            return (
              <Tooltip text={`Add ${question.title}`} key={question.title}>
                <button
                  key={question.title}
                  onClick={(): void => addField(question.control)}
                >
                  {React.createElement(this.icons[question.control], {
                    fill: '#C3D0E5',
                    width: '28',
                  })}
                </button>
              </Tooltip>
            )
          },
        )}
      </FieldBarWrapper>
    )
  }
}

export default AddFieldBar
