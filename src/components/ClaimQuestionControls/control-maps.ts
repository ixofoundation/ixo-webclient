// import AvatarUpload from './AvatarUpload'
// import DateRangeSelector from './DateRangeSelector'
// import ImageUpload from './ImageUpload'
import { ControlType } from 'components/JsonForm/types'
import Input from './Input'
// import MultipleSelect from './MultipleSelect'
// import Rating from './Rating'
// import SingleDateSelector from './SingleDateSelector'
import Textarea from './Textarea'

export const ControlMaps = {
  [ControlType.Text]: Input,
  [ControlType.TextArea]: Textarea,
  // checkboxes: MultipleSelect,
  // imageupload: ImageUpload,
  // avatarupload: AvatarUpload,
  // radio: Rating,
  // singledateselector: SingleDateSelector,
  // daterangeselector: DateRangeSelector,
}
