import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
// import { EntityClaimType } from 'modules/EntityClaims/types'
// import { entityClaimTypeMap } from 'modules/EntityClaims/strategy-map'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { useSelector } from 'react-redux'
import { getTags } from 'modules/Entities/Entities.utils'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  // type: EntityClaimType
  type: string
  title: string
  shortDescription: string
  entityType: string
}

const ClaimInfoCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      title,
      shortDescription,
      entityType,
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

export default ClaimInfoCard
