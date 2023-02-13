import React from 'react'
import { customControls } from 'components/JsonForm/types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { Entity } from 'components/EntitySelector/types'
import { ObjectFieldTokenTemplateColumn } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'

interface Props extends FormCardProps {
  name: string
  collection: string
  denom: string
  quantity: string
  templateId: string
  templates: Entity[]
}

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
      handleRemoveSection,
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
        quantity: { type: 'number', title: 'Max Token Supply' },
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
      <>
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
        <div className='text-right'>
          <LinkButton type='button' onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)
TokenTemplateCard.displayName = 'TokenTemplateCard'

export default TokenTemplateCard
