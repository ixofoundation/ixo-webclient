import * as React from 'react'
import { ControlType } from 'common/components/JsonForm/types'
import { QuestionBarWrapper } from './AddQuestionBar.styles'
import { Tooltip } from 'common/components/Tooltip'
import ShortText from 'assets/icons/ShortText'
import DatePicker from 'assets/icons/DatePicker'
import LongText from 'assets/icons/LongText'
import Selection from 'assets/icons/Selection'
import QRcode from 'assets/icons/QRcode'
import Location from 'assets/icons/Location'
import UploadImage from 'assets/icons/UploadImage'
import UploadFile from 'assets/icons/UploadFile'
import UploadAudio from 'assets/icons/UploadAudio'
import UploadVideo from 'assets/icons/UploadVideo'
// import Validation from '../../../../assets/icons/Validation'
import SelectPicture from 'assets/icons/SelectPicture'

const commands = [
  {
    icon: ShortText,
    title: 'Short Text',
    controlType: ControlType.Text,
  },
  {
    icon: LongText,
    title: 'Long Text',
    controlType: ControlType.TextArea,
  },
  {
    icon: Selection,
    title: 'Multiple Select',
    controlType: ControlType.CheckBoxes,
  },
  {
    icon: SelectPicture,
    title: 'Multiple Image Select',
    controlType: ControlType.ImageCheckboxes,
  },
  {
    icon: Selection,
    title: 'Rating',
    controlType: ControlType.Rating,
  },
  {
    icon: DatePicker,
    title: 'Single Date Selector',
    controlType: ControlType.SingleDateSelector,
  },
  {
    icon: DatePicker,
    title: 'Date Range Selector',
    controlType: ControlType.DateRangeSelector,
  },
  {
    icon: QRcode,
    title: 'QR Code',
    controlType: ControlType.QRCode,
  },
  {
    icon: Location,
    title: 'Location Selector',
    controlType: ControlType.LocationSelector,
  },
  {
    icon: UploadImage,
    title: 'Image Upload',
    controlType: ControlType.ImageUpload,
  },
  {
    icon: UploadImage,
    title: 'Avatar Upload',
    controlType: ControlType.AvatarUpload,
  },
  {
    icon: UploadFile,
    title: 'Document Upload',
    controlType: ControlType.DocumentUpload,
  },
  {
    icon: UploadVideo,
    title: 'Video Upload',
    controlType: ControlType.VideoUpload,
  },
  {
    icon: UploadAudio,
    title: 'Audio Upload',
    controlType: ControlType.AudioUpload,
  },
]

interface Props {
  addQuestion(controlType: ControlType): void
}

const AddQuestionBar: React.FunctionComponent<Props> = ({ addQuestion }) => {
  return (
    <QuestionBarWrapper>
      {commands.map(
        (command): JSX.Element => {
          return (
            <Tooltip text={`Add ${command.title}`} key={command.title}>
              <button
                key={command.controlType}
                onClick={(): void => addQuestion(command.controlType)}
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
