import React from 'react'
import { LinkButton } from '../../../../common/components/JsonForm/JsonForm.styles'
import { NodeType } from '../../../Entities/types'
import { nodeTypeMap } from '../../../Entities/strategy-map'
import { FormCardProps } from '../../../CreateEntity/types'
import MultiControlForm from '../../../..//common/components/JsonForm/MultiControlForm/MultiControlForm'

interface Props extends FormCardProps {
  type: NodeType
  nodeId: string
}

const NodeCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      nodeId,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const formData = {
      type,
      nodeId,
    }

    const schema = {
      type: 'object',
      required: ['type', 'nodeId'],
      properties: {
        type: {
          type: 'string',
          title: 'Node Type',
          enum: Object.keys(NodeType).map(key => NodeType[key]),
          enumNames: Object.keys(NodeType).map(
            key => nodeTypeMap[NodeType[key]].title,
          ),
        },
        nodeId: { type: 'string', title: 'Node ID' },
      },
    } as any

    const uiSchema = {
      type: {
        ['ui:placeholder']: 'Select Node Type',
      },
      nodeId: { ['ui:placeholder']: 'Enter !Name or DID' },
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
          multiColumn
        >
          &nbsp;
        </MultiControlForm>
        <div className="text-right">
          <LinkButton type="button" onClick={handleRemoveSection}>
            - Remove
          </LinkButton>
        </div>
      </>
    )
  },
)

export default NodeCard
