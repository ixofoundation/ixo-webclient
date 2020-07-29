import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { FormData } from '../../../../common/components/JsonForm/types'
import ImageLoader from '../../../../common/components/DropZone/ImageLoader/ImageLoader'
import { customControls } from '../../../../common/components/JsonForm/types'

interface Props {
  name: string
  country: string
  email: string
  website: string
  mission: string
  identifier: string
  matrixId: string
  imageDid: string
  uploadingImage: boolean
  handleUpdate: (formData: FormData) => void
  handleUploadImage: (base64EncodedImage: string) => void
}

const OwnerCard: React.FunctionComponent<Props> = ({
  name,
  country,
  email,
  website,
  mission,
  identifier,
  matrixId,
  imageDid,
  uploadingImage,
  handleUpdate,
  handleUploadImage,
}) => {
  const formData = {
    name,
    country,
    email,
    website,
    mission,
    identifier,
    matrixId,
  }

  const schema = {
    type: 'object',
    required: [
      'name',
      'country',
      'email',
      'website',
      'mission',
      'identifier',
      'matrixId',
    ],
    properties: {
      name: { type: 'string', title: 'Display Name' },
      country: { type: 'string', title: 'Country of Origin' },
      email: { type: 'string', title: 'Public Email', format: 'email' },
      website: { type: 'string', title: 'Public Website', format: 'uri' },
      mission: { type: 'string', title: 'Mission' },
      identifier: { type: 'string', title: 'Identifier' },
      matrixId: { type: 'string', title: 'Public MatrixID' },
    },
  } as any

  const uiSchema = {
    name: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Title',
    },
    country: {
      ['ui:widget']: customControls['countryselector'],
    },
    email: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter Email',
    },
    website: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter /Paste URL',
    },
    mission: {
      ['ui:widget']: 'textarea',
      ['ui:placeholder']: 'Short Description',
    },
    identifier: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter ID or !name',
    },
    matrixId: {
      ['ui:widget']: 'text',
      ['ui:placeholder']: 'Enter MatrixID',
    },
  }

  const handleUpdateDebounce = debounce(handleUpdate, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-6">
        <div className="form-group">
          <label className="control-label">
            Logo or Profile Pic<span className="required">*</span>
          </label>
          <ImageLoader
            keepCropSelection={true}
            circularCrop={false}
            uploadedImageSrc={
              imageDid
                ? `${process.env.REACT_APP_PDS_URL}public/${imageDid}`
                : null
            }
            uploading={uploadingImage}
            handleSave={(base64EncodedImage): void =>
              handleUploadImage(base64EncodedImage)
            }
            imageWidth={100}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <Form
          formData={formData}
          onChange={(control): void => handleUpdateDebounce(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
        >
          &nbsp;
        </Form>
      </div>
    </FormContainer>
  )
}

export default OwnerCard
