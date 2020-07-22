import React from 'react'
import Form from '@rjsf/core'
import { FormContainer } from '../JsonForm.styles'
import { FormControl, FormData, customControls } from '../types'
import * as formUtils from '../JsonForm.utils'
import { ControlContainer } from './SingleControlForm.styles'

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

  return (
    <FormContainer>
      <ControlContainer>
        <Form
          onSubmit={handleSubmit}
          formData={formData}
          onChange={(control): void => handleFormDataChange(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
        >
          <div className="buttons">
            {showPreviousButton && (
              <button type="button" onClick={handlePreviousClick}>
                Previous
              </button>
            )}
            <button type="submit" className="submitForm">
              {nextButtonText}
            </button>
          </div>
        </Form>
      </ControlContainer>
    </FormContainer>
  )
}

export default SingleControlForm
