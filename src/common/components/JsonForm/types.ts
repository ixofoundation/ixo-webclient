import ImageCheckboxes from './CustomWidgets/ImageCheckboxes/ImageCheckboxes'
import SingleDateSelector from './CustomWidgets/SingleDateSelector/SingleDateSelector'
import DateRangeSelector from './CustomWidgets/DateRangeSelector/DateRangeSelector'
import LocationSelector from './CustomWidgets/LocationSelector/LocationSelector'
import QRCode from './CustomWidgets/QRCode/QRCode'
import ImageUpload from './CustomWidgets/ImageUpload/ImageUpload'
import AvatarUpload from './CustomWidgets/AvatarUpload/AvatarUpload'
import DocumentUpload from './CustomWidgets/DocumentUpload/DocumentUpload'
import AudioUpload from './CustomWidgets/AudioUpload/AudioUpload'
import VideoUpload from './CustomWidgets/VideoUpload/VideoUpload'
import EmailValidation from './CustomWidgets/EmailValidation/EmailValidation'
import CountrySelector from './CustomWidgets/CountrySelector/CountrySelector'
import SDGSelector from './CustomWidgets/SDGSelector/SDGSelector'

export type FormData = {
  [id: string]: any
}

export interface FormControl {
  id: string
  title: string
  description: string
  required: boolean
  inline?: boolean
  type: string
  label: string
  control: string
  placeholder?: string
  values?: any[]
  itemValues?: any[]
  itemLabels?: string[]
  itemImages?: string[]
  minItems?: number
  maxItems?: number
  initialValue?: string
}

export const customControls = {
  ['imagecheckboxes']: ImageCheckboxes,
  ['singledateselector']: SingleDateSelector,
  ['daterangeselector']: DateRangeSelector,
  ['countryselector']: CountrySelector,
  ['sdgselector']: SDGSelector,
  ['locationselector']: LocationSelector,
  ['imageupload']: ImageUpload,
  ['avatarupload']: AvatarUpload,
  ['documentupload']: DocumentUpload,
  ['audioupload']: AudioUpload,
  ['videoupload']: VideoUpload,
  ['emailvalidation']: EmailValidation,
  ['qrcode']: QRCode,
}
