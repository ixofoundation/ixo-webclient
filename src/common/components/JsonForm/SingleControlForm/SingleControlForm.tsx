import React from 'react'
import Form from '@rjsf/core'
import { FormContainer } from './SingleControlForm.styles'
import ImageCheckboxes from '../CustomWidgets/ImageCheckboxes/ImageCheckboxes'
import { FormControl } from '../types'

interface Props {
  formControl: FormControl
  nextButtonText: string
  showPreviousButton: boolean
  handlePreviousClick: () => void
  handleNextClick: () => void
}

const customControls = {
  ['imagecheckboxes']: ImageCheckboxes,
}

const SingleControlForm: React.FunctionComponent<Props> = ({
  formControl,
  nextButtonText,
  showPreviousButton,
  handlePreviousClick,
  handleNextClick,
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
    itemIds,
    itemLabels,
    itemImages,
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
        items: {
          type: 'string',
          enum: itemIds,
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
    },
  }

  return (
    <FormContainer>
      <div>
        <Form
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
