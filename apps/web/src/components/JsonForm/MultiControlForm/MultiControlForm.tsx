import React, { useState, useImperativeHandle, useEffect, ReactNode } from 'react'
import Form from '@rjsf/core'
import { FormData } from '../types'
import { FormContainer } from '../JsonForm.styles'
import * as formUtils from '../../../utils/forms'
import { TemplatesType } from '@rjsf/utils'
import validator from "@rjsf/validator-ajv8";

interface Props {
  ref?: any
  multiColumn?: boolean
  formData: FormData
  schema: any
  uiSchema: any
  extraErrors?: any
  liveValidate?: boolean
  customObjectFieldTemplate?: any
  onFormDataChange: (formData: any) => void
  onSubmit: () => void
  onError?: (fields: string[]) => void
  validate?: (formData: any, errors: any) => any
  children?: ReactNode
}

const MultiControlForm: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      children,
      formData,
      customObjectFieldTemplate,
      schema,
      uiSchema,
      extraErrors,
      liveValidate = true,
      onFormDataChange,
      onSubmit,
      onError,
      validate,
    },
    ref,
  ) => {
    const jsonFormRef = React.createRef<Form<any>>()
    const submitFormRef = React.createRef<HTMLButtonElement>()
    const [touched, setTouched] = useState({})
    const [validationComplete, setValidatedComplete] = useState(false)

    useEffect(() => {
      if (validationComplete) {
        jsonFormRef.current?.submit()
        submitFormRef.current?.click()
      }
      // eslint-disable-next-line
    }, [validationComplete])

    useImperativeHandle(
      ref,
      () => ({
        validate: (): void => {
          jsonFormRef.current?.submit()
        },
        validateAndSubmit: (): void => {
          if (validationComplete) {
            jsonFormRef.current?.submit()
            submitFormRef.current?.click()
          } else {
            setValidatedComplete(true)
          }
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    )

    const handleTouched = (id: any): void => {
      setTouched({ ...touched, [id.replace('root_', '.')]: true })
    }

    const handleError = (errors: any[]): void => {
      onError!(
        errors.map((error) => {
          if (error.property) {
            error.property.replace('.', '')
          }

          return error
        }),
      )
    }

    useEffect(() => {
      if (extraErrors && Object.values(extraErrors).some(({ __errors }: any) => __errors.length !== 0)) {
        onError!(Object.values(extraErrors))
      } else {
        onError!([])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extraErrors])

    const CustomObjectFieldTemplate = customObjectFieldTemplate

    const templates: Partial<TemplatesType> = {
      ObjectFieldTemplate: CustomObjectFieldTemplate
    };

    return (
      <FormContainer>
        <Form
        validator={validator}
          ref={jsonFormRef}
          formData={formData}
          onChange={(e): void => onFormDataChange(e.formData)}
          onSubmit={onSubmit}
          noHtml5Validate
          liveValidate={liveValidate}
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          customValidate={validate}
          transformErrors={(errors: any): any =>
            validationComplete ? formUtils.transformErrors(errors) : formUtils.transformErrorsTouched(errors, touched)
          }
          onBlur={handleTouched}
          onFocus={handleTouched}
          onError={handleError}
          templates={templates}
          extraErrors={extraErrors}
        >
          {children}
          <button ref={submitFormRef} type='submit' style={{ display: 'none' }} />
        </Form>
      </FormContainer>
    )
  },
)
MultiControlForm.displayName = 'MultiControlForm'

MultiControlForm.defaultProps = {
  multiColumn: false,
  customObjectFieldTemplate: undefined,
}

export default MultiControlForm
