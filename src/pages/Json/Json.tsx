import * as React from 'react'
import styled from 'styled-components'
import DynamicForm from '../../components/Form/DynamicForm/DynamicForm'
import { FormStyles } from '../../types/models'

const formJson = {
  fields: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Number',
      name: 'Number',
      type: 'number',
    },
    {
      label: 'theimage',
      name: 'theimage',
      type: 'image',
    },
    {
      label: 'Owner email',
      name: 'email',
      type: 'text',
    },
    {
      label: 'About',
      name: 'about',
      type: 'textarea',
    },
    {
      label: 'Country',
      name: 'country',
      type: 'country',
    },
    {
      label: 'Agent Template',
      name: 'agentTemplate.name',
      type: 'template',
    },
    {
      label: 'Attended School',
      name: 'attended',
      type: 'select',
      options: [
        {
          label: 'Yes',
          value: 'true',
        },
        {
          label: 'No',
          value: 'false',
        },
      ],
    },
  ],
}

const Text = styled.textarea`
  margin: 20px 0;
  display: block;
  width: 100%;
  height: 300px;
`

const Container = styled.div`
  button {
    margin: 0 10px 10px 10px;
  }
`

export interface State {
  formJson: any
}
export class ProjectForm extends React.Component<any, State> {
  state = {
    formJson: formJson.fields,
  }

  handleJSONChange = (event: any): void => {
    this.setState({ formJson: JSON.parse(event.target.value) })
    this.handleRenderForm()
  }

  handleSubmitForm = (): void => {
    // Added as required prop
  }

  handleRenderForm = (): JSX.Element => {
    if (formJson.fields.length > 0) {
      return (
        <DynamicForm
          formStyle={FormStyles.standard}
          formSchema={this.state.formJson}
          handleSubmit={this.handleSubmitForm}
        />
      )
    } else {
      return <p>No Template found</p>
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <Container className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Text value={JSON.stringify(this.state.formJson)} onChange={this.handleJSONChange} />
              {this.handleRenderForm()}
              <button onClick={this.handleSubmitForm}>CREATE PROJECT</button>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
