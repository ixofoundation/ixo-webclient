import React from 'react'
import styled from 'styled-components'
import { QuestionForm } from 'modules/EntityClaims/types'
import SingleControlForm from 'common/components/JsonForm/SingleControlForm/SingleControlForm'
import { customControls } from 'common/components/JsonForm/types'

const Container = styled.div`
  background: #F0F3F9;
  border-radius: 0.25rem;
  padding: 1rem 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const Title = styled.div`
  font-size: 1.375rem;
  font-weight: 400;
  color: black;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`

const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #4A4E50;
  margin-bottom: 0.5rem;
`

const Control = styled.span`
  font-size: 1rem;
  font-weight: normal;
  margin-left: 0.5rem;
`

interface Props {
  question: QuestionForm
}

const TemplateCard: React.FunctionComponent<Props> = ({ question }) => {
  const handleSubmit = (): void => {
  }
  const [data, setData] = React.useState()

  const id = Object.keys(question.uiSchema)[0]
  const widgetName = question.uiSchema[id]['ui:widget']
  const widget = customControls[widgetName]
    ? customControls[widgetName]
    : widgetName

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
      handleFormDataChange={(formData): void => {return null}}
      handleSubmit={handleSubmit}
      schema={question.schema}
      uiSchema={uiSchema}
    >
      <></>
    </SingleControlForm>
  )
}

export default TemplateCard