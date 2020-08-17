import ShortText from '../../assets/icons/ShortText'
import DatePicker from '../../assets/icons/DatePicker'
import LongText from '../../assets/icons/LongText'
import Selection from '../../assets/icons/Selection'
import QRcode from '../../assets/icons/QRcode'
import Location from '../../assets/icons/Location'
import UploadImage from '../../assets/icons/UploadImage'
import UploadFile from '../../assets/icons/UploadFile'
import UploadAudio from '../../assets/icons/UploadAudio'
import UploadVideo from '../../assets/icons/UploadVideo'
// import Validation from '../../assets/icons/Validation'
import SelectPicture from '../../assets/icons/SelectPicture'
import { ControlType } from 'common/components/JsonForm/types'

export const questionTypeMap = {
  [ControlType.Text]: {
    icon: ShortText,
    title: 'Short Text',
    controlType: ControlType.Text,
  },
  [ControlType.TextArea]: {
    icon: LongText,
    title: 'Long Text',
    controlType: ControlType.TextArea,
  },
  [ControlType.CheckBoxes]: {
    icon: Selection,
    title: 'Multiple Select',
    controlType: ControlType.CheckBoxes,
  },
  [ControlType.ImageCheckboxes]: {
    icon: SelectPicture,
    title: 'Multiple Image Select',
    controlType: ControlType.ImageCheckboxes,
  },
  [ControlType.Rating]: {
    icon: Selection,
    title: 'Rating',
    controlType: ControlType.Rating,
  },
  [ControlType.SingleDateSelector]: {
    icon: DatePicker,
    title: 'Single Date Selector',
    controlType: ControlType.SingleDateSelector,
  },
  [ControlType.DateRangeSelector]: {
    icon: DatePicker,
    title: 'Date Range Selector',
    controlType: ControlType.DateRangeSelector,
  },
  [ControlType.QRCode]: {
    icon: QRcode,
    title: 'QR Code',
    controlType: ControlType.QRCode,
  },
  [ControlType.LocationSelector]: {
    icon: Location,
    title: 'Location Selector',
    controlType: ControlType.LocationSelector,
  },
  [ControlType.ImageUpload]: {
    icon: UploadImage,
    title: 'Image Upload',
    controlType: ControlType.ImageUpload,
  },
  [ControlType.AvatarUpload]: {
    icon: UploadImage,
    title: 'Avatar Upload',
    controlType: ControlType.AvatarUpload,
  },
  [ControlType.DocumentUpload]: {
    icon: UploadFile,
    title: 'Document Upload',
    controlType: ControlType.DocumentUpload,
  },
  [ControlType.VideoUpload]: {
    icon: UploadVideo,
    title: 'Video Upload',
    controlType: ControlType.VideoUpload,
  },
  [ControlType.AudioUpload]: {
    icon: UploadAudio,
    title: 'Audio Upload',
    controlType: ControlType.AudioUpload,
  },
}
