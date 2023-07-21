import AvatarUpload from './AvatarUpload'
import DateRangeSelector from './DateRangeSelector'
import ImageUpload from './ImageUpload'
import { ControlType } from 'components/JsonForm/types'
import Input from './Input'
import MultipleSelect from './MultipleSelect'
import Rating from './Rating'
import SingleDateSelector from './SingleDateSelector'
import Textarea from './Textarea'

export const ControlMaps = {
  [ControlType.Text]: Input,
  [ControlType.TextArea]: Textarea,
  [ControlType.CheckBoxes]: MultipleSelect,
  [ControlType.ImageUpload]: ImageUpload,
  [ControlType.AvatarUpload]: AvatarUpload,
  [ControlType.Rating]: Rating,
  [ControlType.SingleDateSelector]: SingleDateSelector,
  [ControlType.DateRangeSelector]: DateRangeSelector,
}
