import React, { useState } from 'react'
import Form from '@rjsf/core'
import { FormData } from '../types'
import { FormContainer } from '../JsonForm.styles'
import * as formUtils from '../JsonForm.utils'
import { ObjectFieldTemplate2Column } from '../CustomTemplates/ObjectFieldTemplate'

interface Props {
  multiColumn?: boolean
  formData: FormData
  schema: any
  uiSchema: any
  handleFormDataChange: (formData: any) => void
  handleSubmit: () => void
}

const MultiControlForm: React.FunctionComponent<Props> = ({
  children,
  formData,
  multiColumn,
  schema,
  uiSchema,
  handleFormDataChange,
  handleSubmit,
}) => {
  const [touched, setTouched] = useState({})

  const handleTouched = (id): void =>
    setTouched({ ...touched, [id.replace('root_', '.')]: true })

  return (
    <FormContainer>
      <Form
        formData={formData}
        onChange={(e): void => handleFormDataChange(e.formData)}
        onSubmit={handleSubmit}
        noHtml5Validate
        liveValidate
        showErrorList={false}
        schema={schema}
        uiSchema={uiSchema}
        transformErrors={(errors): any =>
          formUtils.transformErrorsTouched(errors, touched)
        }
        onBlur={handleTouched}
        onFocus={handleTouched}
        ObjectFieldTemplate={
          multiColumn ? ObjectFieldTemplate2Column : undefined
        }
      >
        {children}
      </Form>
    </FormContainer>
  )
}

MultiControlForm.defaultProps = {
  multiColumn: false,
}

export default MultiControlForm
