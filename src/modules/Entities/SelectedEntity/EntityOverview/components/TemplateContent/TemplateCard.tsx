import React from 'react'
import { QuestionForm } from 'modules/EntityClaims/types'
import SingleControlForm from 'common/components/JsonForm/SingleControlForm/SingleControlForm'
import { customControls } from 'common/components/JsonForm/types'

interface Props {
  question: QuestionForm
}

const TemplateCard: React.FunctionComponent<Props> = ({ question }) => {
  const handleSubmit = (): void => {
    //
  }
  // eslint-disable-next-line
  const [data, setData] = React.useState<any>()

  const id = Object.keys(question.uiSchema)[0]
  const widgetName = question.uiSchema[id]['ui:widget']
  const widget = customControls[widgetName] ? customControls[widgetName] : widgetName

  const uiSchema = {
    ...question.uiSchema,
    [id]: {
      ...question.uiSchema[id],
      'ui:widget': widget,
      'ui:uploading': false,
    },
  }

  return (
    <SingleControlForm
      formData={data}
      handleFormDataChange={(): void => {
        //
      }}
      handleSubmit={handleSubmit}
      schema={question.schema}
      uiSchema={uiSchema}
    >
      <></>
    </SingleControlForm>
  )
}

export default TemplateCard
