import ImageCheckboxes from './CustomWidgets/ImageCheckboxes/ImageCheckboxes'
import SingleDateSelector from './CustomWidgets/SingleDateSelector/SingleDateSelector'
import DateRangeSelector from './CustomWidgets/DateRangeSelector/DateRangeSelector'
import LocationSelector from './CustomWidgets/LocationSelector/LocationSelector'
import QRCode from './CustomWidgets/QRCode/QRCode'
import QRCodeScan from './CustomWidgets/QRCodeScan/QRCodeScan'
import ImageUpload from './CustomWidgets/ImageUpload/ImageUpload'
import AvatarUpload from './CustomWidgets/AvatarUpload/AvatarUpload'
import DocumentUpload from './CustomWidgets/DocumentUpload/DocumentUpload'
import AudioUpload from './CustomWidgets/AudioUpload/AudioUpload'
import VideoUpload from './CustomWidgets/VideoUpload/VideoUpload'
import EmailValidation from './CustomWidgets/EmailValidation/EmailValidation'
import CountrySelector from './CustomWidgets/CountrySelector/CountrySelector'
import SDGSelector from './CustomWidgets/SDGSelector/SDGSelector'
import SocialTextBox from './CustomWidgets/SocialTextBox/SocialTextBox'
import EmbeddedUrlTextBox from './CustomWidgets/EmbeddedUrlTextBox/EmbeddedUrlTextBox'
import EntitySelector from './CustomWidgets/EntitySelector/EntitySelector'
import ResourceType from './CustomWidgets/ResourceType/ResourceType'
import Switch from './CustomWidgets/Switch/Switch'
import BaseBondingCurve from './CustomWidgets/BaseBondingCurve/BaseBondingCurve'
import InlineSwitch from './CustomWidgets/InlineSwitch/InlineSwitch'
import AffixText from './CustomWidgets/AffixText/AffixText'

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
  currency?: string
}

export enum Type {
  String = 'string',
  Number = 'number',
  Array = 'array',
}

export enum ControlType {
  Text = 'text',
  TextArea = 'textarea',
  Rating = 'radio',
  CheckBoxes = 'checkboxes',
  ImageCheckboxes = 'imagecheckboxes',
  AvatarUpload = 'avatarupload',
  AudioUpload = 'audioupload',
  ImageUpload = 'imageupload',
  VideoUpload = 'videoupload',
  FileUpload = 'fileupload',
  DocumentUpload = 'documentupload',
  LocationSelector = 'locationselector',
  CountrySelector = 'countryselector',
  SDGSelector = 'sdgselector',
  DateRangeSelector = 'daterangeselector',
  SingleDateSelector = 'singledateselector',
  SocialTextBox = 'socialtextbox',
  EmbeddedTextBox = 'embeddedtextbox',
  QRCode = 'qrcode',
  QRCodeScan = 'qrcodescan',
  EntitySelector = 'entityselector',
  EmailValidation = 'emailvalidation',
  Currency = 'currency',
  ResourceType = 'resourcetype',
  Switch = 'switch',
  InlineSwitch = 'inlineswitch',
  BaseBondingCurve = 'basebondingcurve',
  AffixText = 'affixtext',
}

export const customControls = {
  [ControlType.ImageCheckboxes]: ImageCheckboxes,
  [ControlType.SingleDateSelector]: SingleDateSelector,
  [ControlType.DateRangeSelector]: DateRangeSelector,
  [ControlType.CountrySelector]: CountrySelector,
  [ControlType.SDGSelector]: SDGSelector,
  [ControlType.LocationSelector]: LocationSelector,
  [ControlType.SocialTextBox]: SocialTextBox,
  [ControlType.EmbeddedTextBox]: EmbeddedUrlTextBox,
  [ControlType.ImageUpload]: ImageUpload,
  [ControlType.AvatarUpload]: AvatarUpload,
  [ControlType.DocumentUpload]: DocumentUpload,
  [ControlType.AudioUpload]: AudioUpload,
  [ControlType.VideoUpload]: VideoUpload,
  [ControlType.EmailValidation]: EmailValidation,
  [ControlType.EntitySelector]: EntitySelector,
  [ControlType.QRCode]: QRCode,
  [ControlType.QRCodeScan]: QRCodeScan,
  [ControlType.ResourceType]: ResourceType,
  [ControlType.Switch]: Switch,
  [ControlType.InlineSwitch]: InlineSwitch,
  [ControlType.BaseBondingCurve]: BaseBondingCurve,
  [ControlType.AffixText]: AffixText,
}
