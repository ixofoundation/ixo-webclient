import React, { ReactNode } from 'react'
import { JSONSchema7 } from 'json-schema'
import Form from '@rjsf/core'
import { FormContainer } from '../JsonForm.styles'
import { FormData } from '../types'
import * as formUtils from '../../../utils/forms'
import { ControlContainer } from './SingleControlForm.styles'
import validator from "@rjsf/validator-ajv8";
interface Props {
  schema: JSONSchema7
  uiSchema: any
  formData: FormData
  handleSubmit?: (event: any) => void
  handleFormDataChange: (formData: any) => void
  children?: ReactNode
}

const SingleControlForm: React.FunctionComponent<Props> = ({
  children,
  schema,
  uiSchema,
  formData,
  handleSubmit,
  handleFormDataChange,
}) => {
  return (
    <FormContainer>
      <ControlContainer>
        <Form
        validator={validator}
          onSubmit={handleSubmit ? handleSubmit : undefined}
          formData={formData}
          onChange={(control): void => handleFormDataChange(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
        >
          {children}
        </Form>
      </ControlContainer>
    </FormContainer>
  )
}

export default SingleControlForm
