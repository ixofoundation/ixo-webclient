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

interface Props {
  formControl: FormControl
  formData: FormData
  savingFormData: boolean
  nextButtonText: string
  showPreviousButton: boolean
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleFormDataChange: (formData: any) => void
}

const customControls = {
  ['imagecheckboxes']: ImageCheckboxes,
  ['singledateselector']: SingleDateSelector,
  ['daterangeselector']: DateRangeSelector,
  ['qrcode']: QRCode,
  ['locationselector']: LocationSelector,
  ['imageupload']: ImageUpload,
}

const SingleControlForm: React.FunctionComponent<Props> = ({
  formControl,
  formData,
  savingFormData,
  nextButtonText,
  showPreviousButton,
  handlePreviousClick,
  handleNextClick,
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

  return (
    <FormContainer>
      <div>
        <Form
          formData={formData}
          onChange={(control): void => handleFormDataChange(control.formData)}
          liveValidate
          noHtml5Validate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
        >
          <div className="buttons">
            {showPreviousButton && (
              <button type="button" onClick={handlePreviousClick}>
                Previous
              </button>
            )}
            <button type="submit" onClick={handleNextClick}>
              {nextButtonText}
            </button>
          </div>
        </Form>
      </div>
    </FormContainer>
  )
}

export default SingleControlForm
