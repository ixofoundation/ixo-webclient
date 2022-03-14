import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { customControls } from 'common/components/JsonForm/types'

interface Props extends FormCardProps {
  versionNumber: string
  effectiveDate: string
  notes: string
}

const VersionCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      versionNumber,
      effectiveDate,
      notes,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      versionNumber,
      effectiveDate,
      notes,
    }

    const schema = {
      type: 'object',
      required: ['versionNumber', 'effectiveDate'],
      properties: {
        versionNumber: { type: 'string', title: 'Version' },
        effectiveDate: { type: 'string', title: 'Effective Date' },
        notes: { type: 'string', title: 'Notes (optional)' },
      },
    } as any

    const uiSchema = {
      versionNumber: {
        'ui:placeholder': 'Enter number',
      },
      effectiveDate: {
        'ui:widget': customControls['singledateselector'],
      },
      notes: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Describe the changes in this version',
      },
    }

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default VersionCard
