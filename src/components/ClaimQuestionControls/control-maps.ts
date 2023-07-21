import AvatarUpload from './AvatarUpload'
import DateRangeSelector from './DateRangeSelector'
import ImageUpload from './ImageUpload'
import Input from './Input'
import MultipleSelect from './MultipleSelect'
import Rating from './Rating'
import SingleDateSelector from './SingleDateSelector'
import Textarea from './Textarea'

export const ControlMaps = {
  text: Input,
  textarea: Textarea,
  checkboxes: MultipleSelect,
  imageupload: ImageUpload,
  avatarupload: AvatarUpload,
  radio: Rating,
  singledateselector: SingleDateSelector,
  daterangeselector: DateRangeSelector,
}
