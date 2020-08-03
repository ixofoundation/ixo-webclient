import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { PageView, EntityView } from 'src/modules/Entities/types'
import { pageViewMap, entityViewMap } from 'src/modules/Entities/strategy-map'

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
    required: ['pageView', 'entityView'],
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

export default PrivacyCard
