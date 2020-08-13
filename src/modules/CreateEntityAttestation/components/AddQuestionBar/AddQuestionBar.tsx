import * as React from 'react'
import { ControlType } from '../../../../common/components/JsonForm/types'
import { QuestionBarWrapper } from './AddQuestionBar.styles'
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
// import Validation from '../../../../assets/icons/Validation'
import SelectPicture from '../../../../assets/icons/SelectPicture'

const commands = [
  {
    icon: ShortText,
    title: 'Short Text',
    type: ControlType.Text,
  },
  {
    icon: LongText,
    title: 'Long Text',
    type: ControlType.TextArea,
  },
  {
    icon: Selection,
    title: 'Multiple Select',
    type: ControlType.CheckBoxes,
  },
  {
    icon: SelectPicture,
    title: 'Multiple Image Select',
    type: ControlType.ImageCheckboxes,
  },
  {
    icon: Selection,
    title: 'Rating',
    type: ControlType.Rating,
  },
  {
    icon: DatePicker,
    title: 'Single Date Selector',
    type: ControlType.SingleDateSelector,
  },
  {
    icon: DatePicker,
    title: 'Date Range Selector',
    type: ControlType.DateRangeSelector,
  },
  {
    icon: QRcode,
    title: 'QR Code',
    type: ControlType.QRCode,
  },
  {
    icon: Location,
    title: 'Location Selector',
    type: ControlType.LocationSelector,
  },
  {
    icon: UploadImage,
    title: 'Image Upload',
    type: ControlType.ImageUpload,
  },
  {
    icon: UploadImage,
    title: 'Avatar Upload',
    type: ControlType.AvatarUpload,
  },
  {
    icon: UploadFile,
    title: 'Document Upload',
    type: ControlType.DocumentUpload,
  },
  {
    icon: UploadVideo,
    title: 'Video Upload',
    type: ControlType.VideoUpload,
  },
  {
    icon: UploadAudio,
    title: 'Audio Upload',
    type: ControlType.AudioUpload,
  },
]

interface Props {
  addQuestion(type: ControlType): void
}

const AddQuestionBar: React.FunctionComponent<Props> = ({ addQuestion }) => {
  return (
    <QuestionBarWrapper>
      {commands.map(
        (command): JSX.Element => {
          return (
            <Tooltip text={`Add ${command.title}`} key={command.title}>
              <button
                key={command.type}
                onClick={(): void => addQuestion(command.type)}
              >
                {React.createElement(command.icon, {
                  fill: '#C3D0E5',
                  width: '28',
                })}
              </button>
            </Tooltip>
          )
        },
      )}
    </QuestionBarWrapper>
  )
}

export default AddQuestionBar
