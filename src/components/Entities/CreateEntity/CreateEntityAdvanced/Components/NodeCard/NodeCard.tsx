import React, { useCallback } from 'react'
import * as _ from 'lodash'
import { LinkButton } from 'components/JsonForm/JsonForm.styles'
import { NodeType } from '../../../../../../types/entities'
import { nodeTypeMap } from '../../../../../../types/entities.map'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import Axios from 'axios'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

const endpointHealthCheck = async (url: string): Promise<any> => {
  if (!url) {
    return {
      serviceEndpoint: {
        __errors: ['Check that you have the correct end-point.'],
      },
    }
  }
  return Axios.get(url)
    .then((response) => {
      if (response.status !== 200 || !response.data.toLowerCase().includes('running')) {
        throw new Error('Something went wrong!')
      } else {
        return { serviceEndpoint: { __errors: [] } }
      }
    })
    .catch((reason: any) => {
      return {
        serviceEndpoint: {
          __errors: ['Check that you have the correct end-point.'],
        },
      }
    })
}

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
    const [extraErrors, setExtraErrors] = React.useState<any>({
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
          enumNames: Object.keys(NodeType).map((key) => nodeTypeMap[NodeType[key]].title),
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

    const debounceFn = useCallback((url) => {
      _.debounce(() => endpointHealthCheck(url).then(setExtraErrors), 1000)()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <>
        <MultiControlForm
          ref={ref}
          onSubmit={handleSubmitted}
          onFormDataChange={(data) => {
            debounceFn(data.serviceEndpoint)
            handleUpdateContent(data)
          }}
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
          <div className='text-right'>
            <LinkButton type='button' onClick={handleRemoveSection}>
              - Remove
            </LinkButton>
          </div>
        )}
      </>
    )
  },
)
NodeCard.displayName = 'NodeCard'

export default NodeCard
