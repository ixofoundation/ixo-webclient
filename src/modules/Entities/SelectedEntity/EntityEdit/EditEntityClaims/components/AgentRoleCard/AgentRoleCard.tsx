import React from 'react'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'
import { LinkButton } from 'common/components/JsonForm/JsonForm.styles'
import { AgentRole } from 'modules/Account/types'
import { agentRoleMap } from 'modules/Account/strategy-map'

interface Props extends FormCardProps {
  role: string
  credential: string
  autoApprove: boolean
}

const AgentRoleCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      role,
      credential,
      autoApprove,
      handleUpdateContent,
      handleSubmitted,
      handleRemoveSection,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      role,
      credential,
      autoApprove,
    }

    const schema = {
      type: 'object',
      required: ['role', 'credential', 'autoApprove'],
      properties: {
        role: {
          type: 'string',
          title: 'Agent Role',
          enum: Object.keys(AgentRole).map((key) => AgentRole[key]),
          enumNames: Object.keys(AgentRole).map(
            (key) => agentRoleMap[AgentRole[key]].title,
          ),
        },
        credential: {
          type: 'string',
          title: 'Credential required to perform this role  ',
        },
        autoApprove: {
          type: 'boolean',
          title: 'Auto-approve Agents in this role',
        },
      },
    } as any

    const uiSchema = {
      role: {
        'ui:placeholder': 'Select Role',
      },
      credential: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      autoApprove: {
        'ui:widget': 'select',
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

export default AgentRoleCard
