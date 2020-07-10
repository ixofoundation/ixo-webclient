import React from 'react'
import Form from '@rjsf/core'
import { FormContainer } from './SingleControlForm.styles'
import ImageCheckboxes from '../CustomWidgets/ImageCheckboxes/ImageCheckboxes'
import SingleDateSelector from '../CustomWidgets/SingleDateSelector/SingleDateSelector'
import DateRangeSelector from '../CustomWidgets/DateRangeSelector/DateRangeSelector'
import LocationSelector from '../CustomWidgets/LocationSelector/LocationSelector'
import QRCode from '../CustomWidgets/QRCode/QRCode'
import { FormControl, FormData } from '../types'
import ImageUpload from '../CustomWidgets/ImageUpload/ImageUpload'
import AvatarUpload from '../CustomWidgets/AvatarUpload/AvatarUpload'
import DocumentUpload from '../CustomWidgets/DocumentUpload/DocumentUpload'
import AudioUpload from '../CustomWidgets/AudioUpload/AudioUpload'
import VideoUpload from '../CustomWidgets/VideoUpload/VideoUpload'

interface Props {
  formControl: FormControl
  formData: FormData
  savingFormData: boolean
  nextButtonText: string
  showPreviousButton: boolean
  handlePreviousClick: () => void
  handleSubmit: () => void
  handleFormDataChange: (formData: any) => void
}

const customControls = {
  ['imagecheckboxes']: ImageCheckboxes,
  ['singledateselector']: SingleDateSelector,
  ['daterangeselector']: DateRangeSelector,
  ['qrcode']: QRCode,
  ['locationselector']: LocationSelector,
  ['imageupload']: ImageUpload,
  ['avatarupload']: AvatarUpload,
  ['documentupload']: DocumentUpload,
  ['audioupload']: AudioUpload,
  ['videoupload']: VideoUpload,
}

const SingleControlForm: React.FunctionComponent<Props> = ({
  formControl,
  formData,
  savingFormData,
  nextButtonText,
  showPreviousButton,
  handlePreviousClick,
  handleSubmit,
  handleFormDataChange,
}) => {
  const {
    id,
    title,
    description,
    label,
    required,
    inline,
    type,
    control,
    placeholder,
    minItems,
    maxItems,
    values,
    itemValues,
    itemLabels,
    itemImages,
    initialValue,
  } = formControl

  const schema = {
    title,
    description,
    type: 'object',
    required: required ? [id] : [],
    properties: {
      [id]: {
        type,
        title: label,
        enum: values,
        default: initialValue,
        items: {
          type: 'string',
          enum: itemValues,
          enumNames: itemLabels,
        },
        uniqueItems: true,
        minItems,
        maxItems,
      },
    },
  } as any

  const uiSchema = {
    [id]: {
      ['ui:widget']: customControls[control]
        ? customControls[control]
        : control,
      ['ui:placeholder']: placeholder,
      ['ui:images']: itemImages,
      ['ui:options']: {
        inline,
      },
      ['ui:savingFormData']: savingFormData,
    },
  }

  const transformErrors = (errors): any => {
    return errors.map(error => {
      if (error) {
        return {
          ...error,
          message: `This field ${error.message}`,
        }
      }
      return error
    })
  }

  return (
    <FormContainer>
      <div>
        <Form
          onSubmit={handleSubmit}
          formData={formData}
          onChange={(control): void => handleFormDataChange(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={transformErrors}
        >
          <div className="buttons">
            {showPreviousButton && (
              <button type="button" onClick={handlePreviousClick}>
                Previous
              </button>
            )}
            <button type="submit">{nextButtonText}</button>
          </div>
        </Form>
      </div>
    </FormContainer>
  )
}

export default SingleControlForm
