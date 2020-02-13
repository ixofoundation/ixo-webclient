import * as React from 'react'
import { LayoutWrapperClaims } from '../common/LayoutWrapperClaims'
import { WidgetWrapperClaims } from '../common/WidgetWrapperClaims'
import DynamicForm from '../form/DynamicForm'
import { decode as base64Decode } from 'base-64'
import { Data } from '../../types/models/project'
import styled from 'styled-components'
import { FormStyles } from '../../types/models'
import { Spinner } from '../common/Spinner'
import { successToast } from '../helpers/Toast'

const FormContainer = styled.div`
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
`

const Divider = styled.div`
  height: 2px;
  background: ${/* eslint-disable-line */ props => props.theme.bg.lightBlue};
  width: 36%;
  position: absolute;
  left: 15px;
`

const DividerShadow = styled.div`
  height: 1px;
  background: ${/* eslint-disable-line */ props => props.theme.bg.lightGrey};
  width: 100%;
`

const FormProgressBar = styled.div`
  background: ${/* eslint-disable-line */ props => props.theme.bg.green};
  height: 6px;
  width: 100%;
  border-radius: 4px 4px 0px 0px;
`

export interface ParentProps {
  submitClaim: (claimData: object) => void
  ixo?: any
  projectData: Data
}
export class ProjectNewClaim extends React.Component<ParentProps> {
  state = {
    fetchedFile: null,
  }

  fetchFormFile = (claimFormKey: string, pdsURL: string): void => {
    this.props.ixo.project
      .fetchPublic(claimFormKey, pdsURL)
      .then((res: any) => {
        console.log('Fetched: ', res)
        const fileContents = base64Decode(res.data)
        this.setState({ fetchedFile: fileContents })
      })
  }

  componentDidMount(): void {
    this.fetchFormFile(
      this.props.projectData.templates.claim.form,
      this.props.projectData.serviceEndpoint,
    )
  }

  handleSubmit = (claimData: any): void => {
    // upload all the images and change the value to the returned hash of the image
    const formDef = JSON.parse(this.state.fetchedFile)
    const pdsUrl = this.props.projectData.serviceEndpoint
    const promises = []
    formDef.fields.forEach(field => {
      if (field.type === 'image') {
        if (claimData[field.name] && claimData[field.name].length > 0) {
          promises.push(
            this.props.ixo.project
              .createPublic(claimData[field.name], pdsUrl)
              .then((res: any) => {
                claimData[field.name] = res.result
                // console.log(field.name + ': ' + claimData[field.name]);
                successToast(field.name + ' successfully uploaded')
                return res.result
              }),
          )
        }
      }
    })
    Promise.all(promises).then(() => {
      this.props.submitClaim(claimData)
    })
  }

  render(): JSX.Element {
    const claimParsed = JSON.parse(this.state.fetchedFile)
    if (claimParsed) {
      return (
        <LayoutWrapperClaims>
          <FormContainer className="container">
            <FormProgressBar />
            <div className="row">
              <div className="col-md-12">
                <WidgetWrapperClaims>
                  <h3>Submit a Claim</h3>
                  <DividerShadow>
                    <Divider />
                  </DividerShadow>
                  <DynamicForm
                    formStyle={FormStyles.standard}
                    projectDID={this.props.projectData.projectDid}
                    formSchema={claimParsed.fields}
                    handleSubmit={(claimData): void =>
                      this.handleSubmit(claimData)
                    }
                    submitText={'Submit Claim'}
                  />
                </WidgetWrapperClaims>
              </div>
            </div>
          </FormContainer>
        </LayoutWrapperClaims>
      )
    } else {
      return <Spinner info="App: Loading Claim " />
    }
  }
}
