import React, { useState, useImperativeHandle, useEffect } from 'react'
import Form, { FormValidation } from '@rjsf/core'
import { FormData } from '../types'
import { FormContainer } from '../JsonForm.styles'
import * as formUtils from '../JsonForm.utils'
import { ObjectFieldTemplate2Column } from '../CustomTemplates/ObjectFieldTemplate'

interface Props {
  ref?: any
  multiColumn?: boolean
  formData: FormData
  schema: any
  uiSchema: any
  extraErrors?: any
  liveValidate?: boolean
  onFormDataChange: (formData: any) => void
  onSubmit: () => void
  onError?: (fields: string[]) => void
  validate?: (formData:any, errors: FormValidation) => FormValidation
}

const MultiControlForm: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      children,
      formData,
      multiColumn,
      schema,
      uiSchema,
      extraErrors,
      liveValidate = true,
      onFormDataChange,
      onSubmit,
      onError,
      validate
    },
    ref,
  ) => {
    const jsonFormRef = React.createRef<Form<any>>()
    const [touched, setTouched] = useState({})
    const [validationComplete, setValidatedComplete] = useState(false)

    useEffect(() => {
      if (validationComplete) {
        jsonFormRef.current.submit()
      }
    }, [validationComplete, jsonFormRef])

    useImperativeHandle(ref, () => ({
      validateAndSubmit: (): void => {
        if (validationComplete) {
          jsonFormRef.current.submit()
        } else {
          setValidatedComplete(true)
        }
      }
    }))

    const handleTouched = (id): void => {
      setTouched({ ...touched, [id.replace('root_', '.')]: true })
    }

    const handleError = (errors: any[]): void => {
      onError(errors.map(error => {
        if (error.property) {
          error.property.replace('.', '')
        }

        return error
      }))
    }

    return (
      <FormContainer>
        <Form
          ref={jsonFormRef}
          formData={formData}
          onChange={(e): void => onFormDataChange(e.formData)}
          onSubmit={onSubmit}
          noHtml5Validate
          liveValidate={ liveValidate }
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          validate={validate}
          transformErrors={(errors): any =>
            validationComplete
              ? formUtils.transformErrors(errors)
              : formUtils.transformErrorsTouched(errors, touched)
          }
          onBlur={handleTouched}
          onFocus={handleTouched}
          onError={handleError}
          ObjectFieldTemplate={
            multiColumn ? ObjectFieldTemplate2Column : undefined
          }
          extraErrors={ extraErrors }
        >
          {children}
        </Form>
      </FormContainer>
    )
  },
)

MultiControlForm.defaultProps = {
  multiColumn: false,
}

export default MultiControlForm
