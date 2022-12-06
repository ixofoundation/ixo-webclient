import React from 'react'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../../redux/editEntity/editEntity.types'
// import { EntityClaimType } from 'modules/EntityClaims/types'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { getTags } from 'utils/entities'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  // type: EntityClaimType
  type: string
  title: string
  shortDescription: string
  entityType: string
}

const ClaimInfoCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ type, title, shortDescription, entityType, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const entityTypeMap = useAppSelector(selectEntityConfig)
    const formData = {
      title,
      shortDescription,
      type,
    }

    const claimList = getTags(entityTypeMap[entityType], 'Claim Type')

    const schema = {
      type: 'object',
      required: ['type', 'title'],
      properties: {
        type: {
          type: 'string',
          title: 'Claim Type',
          enum: Object.keys(claimList).map((key) => claimList[key].name),
          enumNames: Object.keys(claimList).map((key) => claimList[key].name),
          // enum: Object.keys(EntityClaimType).map((key) => EntityClaimType[key]),
          // enumNames: Object.keys(EntityClaimType).map(
          //   (key) => entityClaimTypeMap[EntityClaimType[key]].title,
          // ),
        },
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
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
ClaimInfoCard.displayName = 'ClaimInfoCard'

export default ClaimInfoCard
