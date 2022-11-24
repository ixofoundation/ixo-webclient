import * as React from 'react'
import styled from 'styled-components'
import { formJson } from '../../lib/commonData'
import DynamicForm from '../../common/components/Form/DynamicForm/DynamicForm'
import { FormStyles } from '../../types/models'

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
