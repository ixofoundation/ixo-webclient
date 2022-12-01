import React from 'react'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { LiquiditySource } from '../../../../../../types/entities'
import { liquiditySourceMap } from '../../../../../../types/entities.map'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  source: LiquiditySource
  liquidityId: string
}

const LiquidityCard: React.FunctionComponent<Props> = React.forwardRef(
  ({ source, liquidityId, handleUpdateContent, handleSubmitted, handleError, handleRemoveSection }, ref) => {
    const formData = {
      source,
      liquidityId,
    }

    const schema = {
      type: 'object',
      required: ['source', 'liquidityId'],
      properties: {
        source: {
          type: 'string',
          title: 'Source of Liquidity',
          enum: Object.keys(LiquiditySource).map((key) => LiquiditySource[key]),
          enumNames: Object.keys(LiquiditySource).map((key) => liquiditySourceMap[LiquiditySource[key]].title),
        },
        liquidityId: { type: 'string', title: 'Identity of Liquidity Source' },
      },
    } as any

    const uiSchema = {
      source: {
        'ui:placeholder': 'Select a Liquidity Source',
      },
      liquidityId: { 'ui:placeholder': 'Enter DID or !name' },
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
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
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
LiquidityCard.displayName = 'LiquidityCard'

export default LiquidityCard
