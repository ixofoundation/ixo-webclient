import React from 'react'
import { customControls } from 'common/components/JsonForm/types'
import { EntityStage, EntityStatus } from '../../../../types'
import { entityStatusMap, getStage } from '../../../../strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'

interface Props extends FormCardProps {
  startDate: string
  endDate: string
  stage: EntityStage
  status: EntityStatus
  entityType: string
}

const StatusCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      startDate,
      endDate,
      stage,
      status,
      entityType,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      dates: `${startDate || ''}|${endDate || ''}`,
      stage,
      status,
    }

    const stageList = getStage(entityType)
    
    const schema = {
      type: 'object',
      required: ['dates'],
      properties: {
        dates: { type: 'string', title: 'Implementation Period' },
        stage: {
          type: 'string',
          title: 'Stage',
          enum: Object.keys(stageList).map(
            (key) => stageList[key].name,
          ),
          enumNames: Object.keys(stageList).map(
            (key) => stageList[key].name,
          ),
        },
        status: {
          type: 'string',
          title: 'Status',
          enum: Object.keys(EntityStatus).map((key) => EntityStatus[key]),
          enumNames: Object.keys(EntityStatus).map(
            (key) => entityStatusMap[EntityStatus[key]].title,
          ),
        },
      },
    } as any

    const uiSchema = {
      dates: {
        'ui:widget': customControls['daterangeselector'],
      },
      stage: {
        'ui:placeholder': 'Select Stage',
      },
      status: {
        'ui:placeholder': 'Select Status',
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

export default StatusCard
