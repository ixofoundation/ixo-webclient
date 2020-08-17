import * as React from 'react'
import styled from 'styled-components'
import { FormStyles } from '../../../../types/models'
import DynamicForm from '../../../../common/components/Form/DynamicForm/DynamicForm'
import { agentJson } from '../../../../lib/commonData'

const Container = styled.div`
  font-family: ${/*eslint-disable-line*/ props => props.theme.fontRoboto};
  min-width: 320px;
  max-width: 60vw;
  button {
    margin: 0 10px 10px 10px;
  }
`

const ByLine = styled.p`
  font-size: 16px;
  font-weight: 100;
  max-width: 400px;
  width: 100%;
`

export interface ParentProps {
  submitAgent: (role: string, agentData: object) => void
  role: string
  name: string
}

export interface State {
  name: string
}

export class NewAgent extends React.Component<ParentProps, State> {
  state = {
    name: this.props.name,
  }

  renderByLine = (role: string): JSX.Element | string => {
    switch (role) {
      case 'SA':
        return (
          <ByLine>
            Service Providers work on projects and make claims about their
            contributions.{' '}
          </ByLine>
        )
      case 'EA':
        return (
          <ByLine>
            Evaluators are individuals or entities with knowledge and experience
            in any given field. Using this experience, your role is to approve
            or reject the claims submmitted on the project.
          </ByLine>
        )
      case 'IA':
        return (
          <ByLine>Investors fund the project{"'"}s processing costs.</ByLine>
        )
      default:
        return 'role not found'
    }
  }

  handleNameChange = (event: any): void => {
    this.setState({ name: event.target.value })
  }

  render(): JSX.Element {
    const formJson = JSON.parse(agentJson)
    return (
      <Container>
        {this.renderByLine(this.props.role)}
        <DynamicForm
          formStyle={FormStyles.modal}
          formSchema={formJson.fields}
          submitText="Apply"
          handleSubmit={(e): void => this.props.submitAgent(this.props.role, e)}
        />
      </Container>
    )
  }
}
