import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import { NodeType } from '../../../Entities/types'
import { nodeTypeMap } from '../../../Entities/strategy-map'
import { FormWrapper, RemoveButton } from '../CreateEntityAdvanced.styles'

interface Props {
  id: string
  type: NodeType
  nodeId: string
  handleUpdate: (id: string, formData: FormData) => void
  handleRemoveSection: (id: string) => void
}

const NodeCard: React.FunctionComponent<Props> = ({
  id,
  type,
  nodeId,
  handleUpdate,
  handleRemoveSection,
}) => {
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

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <FormWrapper>
          <Form
            formData={formData}
            onChange={(control): void =>
              handleUpdateDebounce(id, control.formData)
            }
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
        </FormWrapper>
      </div>
      <div className="col-lg-12 text-right">
        <RemoveButton
          type="button"
          onClick={(): void => handleRemoveSection(id)}
        >
          Remove
        </RemoveButton>
      </div>
    </FormContainer>
  )
}

export default NodeCard
