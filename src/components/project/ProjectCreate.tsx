import * as React from 'react'
import { ImageLoader, imageQuality } from '../common/ImageLoader'
import { RootState } from '../../common/redux/types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { decode as base64Decode } from 'base-64'
import { blankProjectData, testProjectData } from '../../lib/commonData'
import { Button, ButtonTypes } from '../common/Buttons'
import { FileLoader } from '../common/FileLoader'
import InputImage from '../../common/components/Form/InputImage/InputImage'
import { successToast, errorToast } from '../../common/utils/Toast'
import { ErrorTypes } from '../../types/models'

const Text = styled.input`
  margin: 20px 0;
  display: block;
  width: 100%;
`

const TextArea = styled.textarea`
  margin: 20px 0;
  display: block;
  width: 100%;
  height: 150px;
`

const SmallTextArea = TextArea.extend`
  height: 50px;
`
const BigTextArea = TextArea.extend`
  height: 150px;
`

const Container = styled.div`
  button {
    margin: 0 10px 10px 10px;
  }
`
export interface StateProps {
  ixo: any
  keysafe?: any
}

export interface State {
  croppedImg: any
  imageKey: string
  claimSchema: string
  claimSchemaKey: string
  claimForm: string
  claimFormKey: string
  projectJson: string
  project: Record<string, any>

  fetchedImage: string
  fetchedFile: string
}

export class ProjectCreate extends React.Component<StateProps, State> {
  state = {
    croppedImg: null,
    imageKey: null,
    claimSchema: '',
    claimSchemaKey: null,
    claimForm: '',
    claimFormKey: null,
    projectJson: blankProjectData,
    project: JSON.parse(blankProjectData),
    fetchedImage: null,
    fetchedFile: '',
  }

  handleCreateProject = (): void => {
    if (this.props.keysafe === null) {
      errorToast('Please install IXO Credential Manager first.')
    } else {
      if (
        this.state.croppedImg &&
        this.state.claimSchema.length > 0 &&
        this.state.claimForm.length > 0
      ) {
        const promises = []
        promises.push(
          this.props.ixo.project
            .createPublic(
              this.state.croppedImg,
              this.state.project.serviceEndpoint,
            )
            .then((res: any) => {
              successToast('Uploaded image successfully')
              const newProject = this.state.project
              newProject.imageLink = res.result
              this.setState({
                project: newProject,
                projectJson: JSON.stringify(newProject),
              })
              return res.result
            }),
        )
        promises.push(
          this.props.ixo.project
            .createPublic(
              this.state.claimSchema,
              this.state.project.serviceEndpoint,
            )
            .then((res: any) => {
              successToast('Uploaded Schema successfully')
              const newProject = this.state.project
              newProject.templates.claim.schema = res.result
              this.setState({
                project: newProject,
                projectJson: JSON.stringify(newProject),
              })
              return res.result
            }),
        )
        promises.push(
          this.props.ixo.project
            .createPublic(
              this.state.claimForm,
              this.state.project.serviceEndpoint,
            )
            .then((res: any) => {
              successToast('Uploaded Form JSON successfully')
              const newProject = this.state.project
              newProject.templates.claim.form = res.result
              this.setState({
                project: newProject,
                projectJson: JSON.stringify(newProject),
              })
              return res.result
            }),
        )
        Promise.all(promises).then(() => {
          const projectObj: string = this.state.projectJson
          this.props.keysafe.requestSigning(
            projectObj,
            (error: any, signature: any) => {
              this.props.ixo.project
                .createProject(
                  JSON.parse(projectObj),
                  signature,
                  this.state.project.serviceEndpoint,
                )
                .then((res: any) => {
                  if (res.error) {
                    errorToast(res.error.message, ErrorTypes.message)
                  } else {
                    successToast('Project created successfully')
                  }
                })
            },
            'base64',
          )
        })
      }
    }
  }

  handlePdsUrlChange = (event: any): void => {
    const newProject = this.state.project
    newProject.serviceEndpoint = event.target.value
    this.setState({
      project: newProject,
      projectJson: JSON.stringify(newProject),
    })
  }

  handleProjectChange = (event: any): void => {
    this.setState({
      project: JSON.parse(event.target.value),
      projectJson: event.target.value,
    })
  }

  handleImage = (base64Image): void => {
    this.setState({ croppedImg: base64Image })
  }

  uploadImage = (): void => {
    this.props.ixo.project
      .createPublic(this.state.croppedImg, this.state.project.serviceEndpoint)
      .then((res: any) => {
        const newProject = this.state.project
        newProject.imageLink = res.result
        this.setState({
          project: newProject,
          projectJson: JSON.stringify(newProject),
        })
      })
  }

  fetchImage = (): void => {
    this.props.ixo.project
      .fetchPublic(
        this.state.project.imageLink,
        this.state.project.serviceEndpoint,
      )
      .then((res: any) => {
        const imageSrc = 'data:' + res.contentType + ';base64,' + res.data
        this.setState({ fetchedImage: imageSrc })
      })
  }

  handleFileSelected = (type, base64File): void => {
    if (type === 'schema') {
      this.setState({ claimSchema: base64File })
    }
    if (type === 'form') {
      this.setState({ claimForm: base64File })
    }
  }

  uploadFile = (type): void => {
    let fileToUpload: string
    if (type === 'schema') {
      fileToUpload = this.state.claimSchema
    }
    if (type === 'form') {
      fileToUpload = this.state.claimForm
    }

    this.props.ixo.project
      .createPublic(fileToUpload, this.state.project.serviceEndpoint)
      .then((res: any) => {
        const newProject = this.state.project
        if (type === 'schema') {
          newProject.templates.claim.schema = res.result
        }
        if (type === 'form') {
          newProject.templates.claim.form = res.result
        }
        this.setState({
          project: newProject,
          projectJson: JSON.stringify(newProject),
        })
      })
  }

  fetchFile = (): void => {
    this.props.ixo.project
      .fetchPublic(
        this.state.claimSchemaKey,
        this.state.project.serviceEndpoint,
      )
      .then((res: any) => {
        const fileContents = base64Decode(res.data)
        this.setState({ fetchedFile: fileContents })
      })
  }

  fetchFormFile = (): void => {
    this.props.ixo.project
      .fetchPublic(this.state.claimFormKey, this.state.project.serviceEndpoint)
      .then((res: any) => {
        const fileContents = base64Decode(res.data)
        this.setState({ fetchedFile: fileContents })
      })
  }

  handlePropertyChanged = (prop: string, event: any): void => {
    const newProject = this.state.project
    newProject[prop] = event.target.value
    this.setState({
      project: newProject,
      projectJson: JSON.stringify(newProject),
    })
  }

  handleRequiredClaimsChanged = (event: any): void => {
    const newProject = this.state.project
    newProject.requiredClaims = String(event.target.value.trim())
    this.setState({
      project: newProject,
      projectJson: JSON.stringify(newProject),
    })
  }

  handleOwnerNameChanged = (event: any): void => {
    const newProject = this.state.project
    newProject.ownerName = event.target.value
    // newProject.founder.name = event.target.value;
    this.setState({
      project: newProject,
      projectJson: JSON.stringify(newProject),
    })
  }

  handleOwnerEmailChanged = (event: any): void => {
    const newProject = this.state.project
    newProject.ownerEmail = event.target.value.trim()
    // newProject.founder.email = event.target.value.trim();
    this.setState({
      project: newProject,
      projectJson: JSON.stringify(newProject),
    })
  }

  handleSDGChanged = (event: any): void => {
    const newProject = this.state.project
    let sdgs = event.target.value
    // remove all whitespaces
    sdgs = sdgs.replace(/ /g, '')
    const sdgList = sdgs.split(',')

    newProject.sdgs = sdgList
    this.setState({
      project: newProject,
      projectJson: JSON.stringify(newProject),
    })
  }

  loadTestData = (): void => {
    this.setState({
      projectJson: testProjectData,
      project: JSON.parse(testProjectData),
    })
  }

  renderDevPortion(): JSX.Element {
    if (process.env.REACT_APP_DEV) {
      return (
        <div>
          <br />
          <br />
          <br />
          <TextArea
            value={this.state.projectJson}
            onChange={this.handleProjectChange}
          />
          <Button type={ButtonTypes.dark} onClick={this.fetchImage}>
            Fetch image
          </Button>
          <img src={this.state.fetchedImage} />
          <Button type={ButtonTypes.dark} onClick={this.fetchFile}>
            Fetch file
          </Button>
          <Button type={ButtonTypes.dark} onClick={this.fetchFormFile}>
            Fetch Form file
          </Button>
          <TextArea value={this.state.fetchedFile} />
          <InputImage
            text="Choose a nice file"
            id="file1"
            imageWidth={400}
            onChange={(v): void => console.log(v)}
          />
        </div>
      )
    } else {
      return null
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <Container className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <Button
                type={ButtonTypes.gradient}
                onClick={(): void => this.loadTestData()}
              >
                Load Example Data
              </Button>
              <Text
                placeholder="Project datastore url example: http://104.155.142.57:5000/ or http://beta.elysian.ixo.world:5000/"
                value={this.state.project.serviceEndpoint}
                onChange={this.handlePdsUrlChange}
              />
              <Text
                placeholder="Title"
                value={this.state.project.title}
                onChange={(ev): void => this.handlePropertyChanged('title', ev)}
              />
              <Text
                placeholder="Owner Name"
                value={this.state.project.ownerName}
                onChange={this.handleOwnerNameChanged}
              />
              <Text
                placeholder="Owner Email"
                value={this.state.project.ownerEmail}
                onChange={this.handleOwnerEmailChanged}
              />
              <SmallTextArea
                placeholder="Short Description"
                value={this.state.project.shortDescription}
                onChange={(ev): void =>
                  this.handlePropertyChanged('shortDescription', ev)
                }
              />
              <BigTextArea
                placeholder="Long Description"
                value={this.state.project.longDescription}
                onChange={(ev): void =>
                  this.handlePropertyChanged('longDescription', ev)
                }
              />
              <Text
                placeholder="Impact Action (e.g. trees planted)"
                value={this.state.project.impactAction}
                onChange={(ev): void =>
                  this.handlePropertyChanged('impactAction', ev)
                }
              />
              <Text
                placeholder="Required number of claims"
                value={this.state.project.requiredClaims}
                onChange={this.handleRequiredClaimsChanged}
              />
              <Text
                placeholder="SDG list (comma separated)"
                value={this.state.project.sdgs}
                onChange={this.handleSDGChanged}
              />
              <ImageLoader
                quality={imageQuality.medium}
                placeholder="Choose project image file"
                imageWidth={960}
                aspect={16 / 9}
                imageCallback={this.handleImage}
              />
              <br />
              <FileLoader
                placeholder="Choose claim schema file"
                acceptType="application/json"
                selectedCallback={(dataUrl): void =>
                  this.handleFileSelected('schema', dataUrl)
                }
              />
              <br />
              <FileLoader
                placeholder="Choose claim form file"
                acceptType="application/json"
                selectedCallback={(dataUrl): void =>
                  this.handleFileSelected('form', dataUrl)
                }
              />
              <br />
              <Button
                type={ButtonTypes.gradient}
                onClick={this.handleCreateProject}
              >
                CREATE PROJECT
              </Button>
              {this.renderDevPortion()}
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

function mapStateToProps(state: RootState): StateProps {
  return {
    ixo: state.ixo.ixo,
    keysafe: state.keySafe.keysafe,
  }
}

export const ProjectCreateConnected = connect(mapStateToProps)(ProjectCreate)
