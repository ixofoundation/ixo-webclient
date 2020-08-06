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
  handleFormDataChange: (formData: any) => void
  handleSubmit: () => void
  handleError?: (fields: string[]) => void
}

const MultiControlForm: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      children,
      formData,
      multiColumn,
      schema,
      uiSchema,
      handleFormDataChange,
      handleSubmit,
      handleError,
    },
    ref,
  ) => {
    const jsonFormRef = React.createRef<Form<any>>()
    const [touched, setTouched] = useState({})
    const [validated, setValidated] = useState(false)

    useEffect(() => {
      if (validated) {
        jsonFormRef.current.submit()
        setValidated(false)
      }
    }, [validated])

    useImperativeHandle(ref, () => ({
      validateAndSubmit: (): void => {
        setValidated(true)
      },
    }))

    const handleTouched = (id): void =>
      setTouched({ ...touched, [id.replace('root_', '.')]: true })

    const onError = (errors: any[]): void => {
      handleError(errors.map(error => error.property.replace('.', '')))
    }

    return (
      <FormContainer>
        <Form
          ref={jsonFormRef}
          formData={formData}
          onChange={(e): void => handleFormDataChange(e.formData)}
          onSubmit={handleSubmit}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={(errors): any =>
            validated
              ? formUtils.transformErrors(errors)
              : formUtils.transformErrorsTouched(errors, touched)
          }
          onBlur={handleTouched}
          onFocus={handleTouched}
          onError={onError}
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
