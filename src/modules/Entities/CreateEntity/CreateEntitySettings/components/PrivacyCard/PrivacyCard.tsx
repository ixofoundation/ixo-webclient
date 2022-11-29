import React from 'react'
import { PageView, EntityView } from '../../../../types'
import { pageViewMap, entityViewMap } from '../../../../strategy-map'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  pageView: PageView
  entityView: EntityView
}

const PrivacyCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ pageView, entityView, handleUpdateContent, handleSubmitted, handleError }, ref) => {
    const formData = {
      pageView,
      entityView,
    }

    const schema = {
      type: 'object',
      required: [],
      properties: {
        pageView: {
          type: 'string',
          title: 'Page View',
          enum: Object.keys(PageView).map((key) => PageView[key]),
          enumNames: Object.keys(PageView).map((key) => pageViewMap[PageView[key]].title),
        },
        entityView: {
          type: 'string',
          title: 'Entity View',
          enum: Object.keys(EntityView).map((key) => EntityView[key]),
          enumNames: Object.keys(EntityView).map((key) => entityViewMap[EntityView[key]].title),
        },
      },
    } as any

    const uiSchema = {
      pageView: {
        'ui:placeholder': 'Select Page View',
      },
      entityView: {
        'ui:placeholder': 'Select Entity View',
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
PrivacyCard.displayName = 'PrivacyCard'

export default PrivacyCard
