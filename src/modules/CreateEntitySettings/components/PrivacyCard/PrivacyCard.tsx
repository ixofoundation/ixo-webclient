import React from 'react'
import { FormData } from '../../../../common/components/JsonForm/types'
import { PageView, EntityView } from 'src/modules/Entities/types'
import { FormWrapper } from './PrivacyCard.styles'
import { pageViewMap, entityViewMap } from 'src/modules/Entities/strategy-map'
import MultiControlForm from 'src/common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props {
  pageView: PageView
  entityView: EntityView
  handleUpdate: (formData: FormData) => void
}

const PrivacyCard: React.FunctionComponent<Props> = ({
  pageView,
  entityView,
  handleUpdate,
}) => {
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
        enum: Object.keys(PageView).map(key => PageView[key]),
        enumNames: Object.keys(PageView).map(
          key => pageViewMap[PageView[key]].title,
        ),
      },
      entityView: {
        type: 'string',
        title: 'Entity View',
        enum: Object.keys(EntityView).map(key => EntityView[key]),
        enumNames: Object.keys(EntityView).map(
          key => entityViewMap[EntityView[key]].title,
        ),
      },
    },
  } as any

  const uiSchema = {
    pageView: {
      ['ui:placeholder']: 'Select Page View',
    },
    entityView: {
      ['ui:placeholder']: 'Select Entity View',
    },
  }

  return (
    <FormWrapper>
      <MultiControlForm
        handleSubmit={(): void => null}
        handleFormDataChange={handleUpdate}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        multiColumn
      >
        &nbsp;
      </MultiControlForm>
    </FormWrapper>
  )
}

export default PrivacyCard
