import React, { useState, useImperativeHandle, useEffect } from 'react'
import Form from '@rjsf/core'
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
  onFormDataChange: (formData: any) => void
  onSubmit: () => void
  onError?: (fields: string[]) => void
}

const MultiControlForm: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      children,
      formData,
      multiColumn,
      schema,
      uiSchema,
      onFormDataChange,
      onSubmit,
      onError,
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
    }, [validationComplete])

    useImperativeHandle(ref, () => ({
      validateAndSubmit: (): void => {
        if (validationComplete) {
          jsonFormRef.current.submit()
        } else {
          setValidatedComplete(true)
        }
      },
    }))

    const handleTouched = (id): void =>
      setTouched({ ...touched, [id.replace('root_', '.')]: true })

    const handleError = (errors: any[]): void => {
      onError(errors.map(error => error.property.replace('.', '')))
    }

    return (
      <FormContainer>
        <Form
          ref={jsonFormRef}
          formData={formData}
          onChange={(e): void => onFormDataChange(e.formData)}
          onSubmit={onSubmit}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
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
