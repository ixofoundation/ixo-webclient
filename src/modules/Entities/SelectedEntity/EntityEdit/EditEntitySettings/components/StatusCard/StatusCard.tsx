import React from 'react'
import { customControls } from 'common/components/JsonForm/types'
import { EntityStage, EntityStatus } from '../../../../../types'
import { entityStatusMap } from '../../../../../strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { useSelector } from 'react-redux'
import { getTags } from 'modules/Entities/Entities.utils'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

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
    const entityTypeMap = useSelector(selectEntityConfig)
    const formData = {
      dates: `${startDate || ''}|${endDate || ''}`,
      stage,
      status,
    }

    const stageList = getTags(entityTypeMap[entityType], 'Stage')
    const schema = {
      type: 'object',
      required: ['dates'],
      properties: {
        dates: { type: 'string', title: 'Implementation Period' },
        stage: {
          type: 'string',
          title: 'Stage',
          enum: Object.keys(stageList).map((key) => stageList[key].name),
          enumNames: Object.keys(stageList).map((key) => stageList[key].name),
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
        customObjectFieldTemplate={ObjectFieldTemplate2Column}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)

export default StatusCard
