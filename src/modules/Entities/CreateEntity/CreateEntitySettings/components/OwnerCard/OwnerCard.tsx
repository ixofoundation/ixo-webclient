import React from 'react'
import styled from 'styled-components'
import { customControls } from 'common/components/JsonForm/types'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'

interface Props extends FormCardProps {
  displayName: string
  location: string
  email: string
  website: string
  mission: string
  ownerId: string
  fileSrc: string
  entityType: string
  uploadingImage: boolean
  handleCopyFromOwner: () => void
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  > div {
    width: 100%;
  }
`

const ButtonContainer = styled.div`
  position: absolute;
  top: -2.5rem;
  right: 0;
  width: auto !important;

  button {
    width: 220px;
    height: 40px;
    font-weight: normal;
    font-size: 1rem;
    line-height: 19px;
    border-radius: 4px;
    border: none;
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    color: #fff;
    margin-left: 1.25rem;

    &:focus {
      outline-style: none;
      box-shadow: none;
      border: 1px solid #fff;
    }

    &:disabled {
      opacity: 0.8;
      color: ${(props: any): string => props.theme.fontLightGreyBlue};
    }
  }
`

const OwnerCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      displayName,
      location,
      email,
      website,
      mission,
      ownerId,
      fileSrc,
      entityType,
      uploadingImage,
      handleUpdateContent,
      handleSubmitted,
      handleError,
      handleCopyFromOwner,
    },
    ref,
  ) => {
    const formData = {
      displayName,
      location,
      email,
      website,
      mission,
      ownerId,
      fileSrc,
    }

    const schema = {
      type: 'object',
      required: ['ownerId'],
      properties: {
        fileSrc: { type: 'string', title: 'Logo or Profile Pic' },
        empty: { type: 'null' },
        displayName: { type: 'string', title: 'Display Name' },
        location: { type: 'string', title: 'Country of Origin' },
        email: { type: 'string', title: 'Public Email', format: 'email' },
        website: { type: 'string', title: 'Public Website', format: 'uri' },
        mission: { type: 'string', title: 'Mission' },
        ownerId: { type: 'string', title: 'Identifier' },
      },
    } as any

    const uiSchema = {
      fileSrc: {
        'ui:widget': customControls['imageupload'],
        'ui:uploading': uploadingImage,
        'ui:maxDimension': 440,
        'ui:previewWidth': 160,
        'ui:aspect': 1,
        'ui:circularCrop': false,
      },
      displayName: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Title',
      },
      location: {
        'ui:widget': customControls['countryselector'],
      },
      email: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Email',
      },
      website: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter /Paste URL',
      },
      mission: {
        'ui:widget': 'text',
        'ui:placeholder': 'Short Description',
      },
      ownerId: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter ID or !name',
      },
    }

    return (
      <FormContainer>
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
        <ButtonContainer>
          <button onClick={handleCopyFromOwner}>
            Copy from {entityType.toLowerCase()} creator
          </button>
        </ButtonContainer>
      </FormContainer>
    )
  },
)

export default OwnerCard
