import React from 'react'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { NodeType } from '../../../../../types'
import { nodeTypeMap } from '../../../../../strategy-map'
import { FormCardProps } from '../../../types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import Axios from 'axios'
import { ObjectFieldTemplate2Column } from 'common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
  type: NodeType
  nodeId: string
  serviceEndpoint: string
  removable: boolean
}

const NodeCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      type,
      nodeId,
      serviceEndpoint,
      removable = true,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleRemoveSection,
    },
    ref,
  ) => {
    const [extraErrors, setExtraErrors] = React.useState({
      serviceEndpoint: { __errors: [] },
    })

    const formData = {
      type,
      nodeId,
      serviceEndpoint,
    }

    const schema = {
      type: 'object',
      required: ['type', 'nodeId', 'serviceEndpoint'],
      properties: {
        type: {
          type: 'string',
          title: 'Node Type',
          enum: Object.keys(NodeType).map((key) => NodeType[key]),
          enumNames: Object.keys(NodeType).map(
            (key) => nodeTypeMap[NodeType[key]].title,
          ),
        },
        nodeId: { type: 'string', title: 'Node ID' },
        serviceEndpoint: {
          type: 'string',
          title: 'URL or IP Address',
          format: 'uri',
        },
      },
    } as any

    const uiSchema = {
      type: {
        'ui:placeholder': 'Select Node Type',
      },
      nodeId: { 'ui:placeholder': 'Enter !Name or DID' },
      serviceEndpoint: {
        'ui:placeholder': 'Enter a valid URL in the format https://',
      },
    }

    const endpointHealthCheck = async (url): Promise<boolean> => {
      const isWorking = await Axios.get(url)
        .then((response) => {
          if (response.status === 200) {
            return response.data.includes('API is running')
          }
        })
        .catch((reason: any) => false)

      if (isWorking) {
        setExtraErrors({ serviceEndpoint: { __errors: [] } })
      } else {
        setExtraErrors({
          serviceEndpoint: {
            __errors: ['Check that you have the correct end-point.'],
          },
        })
      }
      return isWorking
    }

    const handleSubmit = async (): Promise<boolean> => {
      const isWorking = await endpointHealthCheck(formData.serviceEndpoint)

      if (isWorking) {
        setExtraErrors({ serviceEndpoint: { __errors: [] } })
      } else {
        setExtraErrors({
          serviceEndpoint: {
            __errors: ['Check that you have the correct end-point.'],
          },
        })
      }

      if (isWorking) {
        handleSubmitted()
      }

      return isWorking
    }

    return (
      <>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmit}
          onFormDataChange={handleUpdateContent}
          onError={handleError}
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          liveValidate={true}
          extraErrors={extraErrors}
          customObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          &nbsp;
        </MultiControlForm>
        {removable && (
          <div className="text-right">
            <LinkButton type="button" onClick={handleRemoveSection}>
              - Remove
            </LinkButton>
          </div>
        )}
      </>
    )
  },
)

export default NodeCard
