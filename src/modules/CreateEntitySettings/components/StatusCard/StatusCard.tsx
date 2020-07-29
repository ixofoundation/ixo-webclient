import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { customControls } from '../../../../common/components/JsonForm/types'
import { EntityStage, EntityStatus } from 'src/modules/Entities/types'

interface Props {
  startDate: string
  endDate: string
  stage: EntityStage
  status: EntityStatus
  handleUpdate: (formData: FormData) => void
}

const StatusCard: React.FunctionComponent<Props> = ({
  startDate,
  endDate,
  stage,
  status,
  handleUpdate,
}) => {
  const formData = {
    dates: `${startDate || ''}|${endDate || ''}`,
    stage,
    status,
  }

  const schema = {
    type: 'object',
    required: ['dates', 'stage', 'status'],
    properties: {
      dates: { type: 'string', title: 'Dates' },
      stage: {
        type: 'string',
        title: 'Stage',
        enum: Object.keys(EntityStage).map(key => EntityStage[key]),
      },
      status: {
        type: 'string',
        title: 'Status',
        enum: Object.keys(EntityStatus).map(key => EntityStatus[key]),
      },
    },
  } as any

  const uiSchema = {
    dates: {
      ['ui:widget']: customControls['daterangeselector'],
    },
    stage: {
      ['ui:placeholder']: 'Select Stage',
    },
    status: {
      ['ui:placeholder']: 'Select Status',
    },
  }

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <Form
          formData={formData}
          onChange={(control): void => handleUpdateDebounce(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
          ObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          &nbsp;
        </Form>
      </div>
    </FormContainer>
  )
}

export default StatusCard
