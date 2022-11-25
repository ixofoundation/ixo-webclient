import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { useSelector } from 'react-redux'
import { getTags } from 'modules/Entities/Entities.utils'
import { ObjectFieldProtocolInformationColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { questionTypeMap } from '../../strategy-map'

interface Props extends FormCardProps {
  // type: EntityClaimType
  type: string
  title: string
  shortDescription: string
  entityType: string
  feature?: string
  reliability?: string
  userGuide?: string
  reference?: string
  keywords?: string[]
}

const ClaimInfoCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      title,
      shortDescription,
      entityType,
      feature,
      reliability,
      userGuide,
      reference,
      keywords,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const entityTypeMap = useSelector(selectEntityConfig)
    const formData = {
      title,
      shortDescription,
      type,
      feature,
      reliability,
      userGuide,
      reference,
      keywords,
    }

    const claimList = getTags(entityTypeMap[entityType], 'Claim Type')

    const featureEnums = Object.keys(questionTypeMap).map((key) => questionTypeMap[key].title)
    featureEnums.push('Mixed form')

    const schema = {
      type: 'object',
      required: ['type', 'title'],
      properties: {
        type: {
          type: 'string',
          title: 'Claim Type',
          enum: Object.keys(claimList).map((key) => claimList[key].name),
          enumNames: Object.keys(claimList).map((key) => claimList[key].name),
        },
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
        feature: {
          type: 'string',
          title: 'Features',
          enum: featureEnums,
          enumNames: featureEnums,
        },
        reliability: { type: 'number', title: 'Reliability' },
        userGuide: { type: 'string', title: 'User Guide' },
        reference: { type: 'string', title: 'Reference' },
        keywords: {
          type: 'array',
          title: 'Keywords',
          items: { type: 'string' },
        },
      },
    } as any

    const uiSchema = {
      type: { 'ui:placeholder': 'Select Type' },
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Name',
      },
      shortDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
      feature: { 'ui:placeholder': 'Select question type here' },
      reliability: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter reliability score',
      },
      userGuide: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Enter User Guide here',
      },
      reference: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Enter Reference here',
      },
      keywords: { placeholder: 'Enter keyword here' },
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
        customObjectFieldTemplate={ObjectFieldProtocolInformationColumn}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)
ClaimInfoCard.displayName = 'ClaimInfoCard'

export default ClaimInfoCard
