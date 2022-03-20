import React from 'react'
import styled from 'styled-components'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { Entity } from 'common/components/EntitySelector/types'
import { ObjectFieldTokenTemplateColumn } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  name: string
  collection: string
  denom: string
  quantity: string
  templateId: string
  templates: Entity[]
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  > div {
    width: 100%;
  }
`

const TokenTemplateCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      name,
      collection,
      denom,
      quantity,
      templateId,
      templates,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      name,
      collection,
      denom,
      quantity,
      templateId,
    }

    const schema = {
      type: 'object',
      required: ['templateId', 'name', 'collection', 'denom', 'quantity'],
      properties: {
        templateId: { type: 'string', title: 'Use a Token Class Template' },
        name: { type: 'string', title: 'Token Name' },
        collection: { type: 'string', title: 'Collection/Set' },
        denom: { type: 'string', title: 'Token ID or Denom' },
        quantity: { type: 'string', title: 'Max Token Supply' },
      },
    } as any

    const uiSchema = {
      templateId: {
        'ui:widget': customControls['entityselector'],
        'ui:entities': templates,
        classNames: 'selectTemplate',
      },
      name: {
        'ui:widget': 'text',
        'ui:placeholder': 'Give this Token a Name',
      },
      collection: {
        'ui:widget': 'text',
        'ui:placeholder': 'Belongs to this Collection or Set ID',
      },
      denom: {
        'ui:widget': 'text',
        'ui:placeholder': 'Identifier',
      },
      quantity: {
        'ui:widget': 'text',
        'ui:placeholder': 'Quantity',
      },
    }

    return (
      <FormContainer>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          onError={handleError}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          customObjectFieldTemplate={ObjectFieldTokenTemplateColumn}
        >
          &nbsp;
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default TokenTemplateCard
