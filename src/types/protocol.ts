import ShortText from 'assets/icons/ShortText'
import DatePicker from 'assets/icons/DatePicker'
import SingleDatePicker from 'assets/icons/SingleDatePicker'
import LongText from 'assets/icons/LongText'
import Selection from 'assets/icons/Selection'
import Rating from 'assets/icons/Rating'
import QRCode from 'assets/icons/QRcode'
import QRCodeScan from 'assets/icons/QRcodeScan'
import Location from 'assets/icons/Location'
import UploadImage from 'assets/icons/UploadImage'
import UploadAvatar from 'assets/icons/UploadAvatar'
import UploadFile from 'assets/icons/UploadFile'
import UploadAudio from 'assets/icons/UploadAudio'
import UploadVideo from 'assets/icons/UploadVideo'
import SelectPicture from 'assets/icons/SelectPicture'
import Currency from 'assets/icons/Currency'
import { ControlType, Type } from 'components/JsonForm/types'

export enum ELocalisation {
  EN = 'EN',
  FR = 'FR',
  ES = 'ES',
  CHI = 'CHI',
}

export enum EClaimType {
  Service = 'Service',
  Outcome = 'Outcome',
  Credential = 'Credential',
  UseOfFunds = 'Use of Funds',
  Payment = 'Payment',
  Investment = 'Investment',
  Banking = 'Banking',
  Procurement = 'Procurement',
  Provenance = 'Provenance',
  Ownership = 'Ownership',
  Custody = 'Custody',
  Dispute = 'Dispute',
  TheoryOfChange = 'Theory of Change',
  Staking = 'Staking',
  Impact = 'Impact',
}
export enum EClaimFeature {
  ShortText = 'Short Text',
  LongText = 'Long Text',
  MultipleSelect = 'Multiple Select',
  Currency = 'Currency',
  MultipleImageSelect = 'Multiple Image Select (Coming Soon)',
  Rating = 'Rating',
  SingleDateSelector = 'Single Date Selector',
  DateRangeSelector = 'Date Range Selector',
  QRCode = 'QR Code',
  QRCodeScan = 'QR Code Scan',
  LocationSelector = 'Location Selector',
  ImageUpload = 'Image Upload',
  AvatarUpload = 'Avatar Upload',
  DocumentUpload = 'Document Upload',
  VideoUpload = 'Video Upload',
  AudioUpload = 'Audio Upload',
  MixedForm = 'Mixed Form',
}
export const questionTypeMap = {
  [ControlType.Text]: {
    icon: ShortText,
    title: EClaimFeature.ShortText,
    controlType: ControlType.Text,
  },
  [ControlType.TextArea]: {
    icon: LongText,
    title: EClaimFeature.LongText,
    controlType: ControlType.TextArea,
  },
  [ControlType.CheckBoxes]: {
    icon: Selection,
    title: EClaimFeature.MultipleSelect,
    controlType: ControlType.CheckBoxes,
  },
  [ControlType.Currency]: {
    icon: Currency,
    title: EClaimFeature.Currency,
    controlType: ControlType.Currency,
  },
  [ControlType.ImageCheckboxes]: {
    icon: SelectPicture,
    title: EClaimFeature.MultipleImageSelect,
    controlType: ControlType.ImageCheckboxes,
  },
  [ControlType.Rating]: {
    icon: Rating,
    title: EClaimFeature.Rating,
    controlType: ControlType.Rating,
  },
  [ControlType.SingleDateSelector]: {
    icon: SingleDatePicker,
    title: EClaimFeature.SingleDateSelector,
    controlType: ControlType.SingleDateSelector,
  },
  [ControlType.DateRangeSelector]: {
    icon: DatePicker,
    title: EClaimFeature.DateRangeSelector,
    controlType: ControlType.DateRangeSelector,
  },
  [ControlType.QRCode]: {
    icon: QRCode,
    title: EClaimFeature.QRCode,
    controlType: ControlType.QRCode,
  },
  [ControlType.QRCodeScan]: {
    icon: QRCodeScan,
    title: EClaimFeature.QRCodeScan,
    controlType: ControlType.QRCodeScan,
  },
  [ControlType.LocationSelector]: {
    icon: Location,
    title: EClaimFeature.LocationSelector,
    controlType: ControlType.LocationSelector,
  },
  [ControlType.ImageUpload]: {
    icon: UploadImage,
    title: EClaimFeature.ImageUpload,
    controlType: ControlType.ImageUpload,
  },
  [ControlType.AvatarUpload]: {
    icon: UploadAvatar,
    title: EClaimFeature.AvatarUpload,
    controlType: ControlType.AvatarUpload,
  },
  [ControlType.DocumentUpload]: {
    icon: UploadFile,
    title: EClaimFeature.DocumentUpload,
    controlType: ControlType.DocumentUpload,
  },
  [ControlType.VideoUpload]: {
    icon: UploadVideo,
    title: EClaimFeature.VideoUpload,
    controlType: ControlType.VideoUpload,
  },
  [ControlType.AudioUpload]: {
    icon: UploadAudio,
    title: EClaimFeature.AudioUpload,
    controlType: ControlType.AudioUpload,
  },
}
export interface TQuestion {
  id: string
  title: string
  description: string
  label: string
  required: boolean
  type: Type
  control: ControlType
  attributeType: string
  minItems?: number
  maxItems?: number
  values?: string[]
  itemValues?: string[]
  itemLabels?: string[]
  itemImages?: string[]
  placeholder?: string
  initialValue?: string
  inline?: boolean
  order: number
  currency?: string
}

export interface FormCardProps {
  ref?: any
  handleUpdateContent: (formData: FormData) => void
  handleError: (errors: string[]) => void
  handleSubmitted: () => void
  handleRemoveSection?: () => void
}

export interface QuestionCardBaseProps {
  title: string
  description: string
  label: string
  attributeType: string
}
