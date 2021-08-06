import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../types'

const FormContainer = styled.div`
  border-top: 1px solid #e8edee;
  margin-top: 4rem;
  padding-top: 1.25rem;
`

const ImportButton = styled.button`
  border: 1px solid #56ccf2;
  border-radius: 4px;
  color: #49bfe0;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  background: transparent;
  width: 115px;
  height: 50px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

interface Props extends FormCardProps {
  existingEntityDid: string
  error: string
  title: string
  handleFetchExistingEntity: (did: string) => void
  handleResetContent: () => void
}

const schema = {
  type: 'object',
  properties: {
    existingEntityDid: { type: 'string', title: 'Use an Existing Entity' },
  },
}

const uiSchema = {
  entityDid: {
    'ui:widget': 'text',
    'ui:placeholder': 'Paste a DID',
  },
}

// eslint-disable-next-line react/display-name
const ExistingEntityCard: FunctionComponent<Props> = React.forwardRef(
  (
    {
      existingEntityDid,
      error,
      title,
      handleSubmitted,
      handleUpdateContent,
      handleFetchExistingEntity,
      handleResetContent,
    },
    ref,
  ) => {
    const formData = {
      existingEntityDid,
    }

    const handleImportClick = (): void => {
      if (existingEntityDid) {
        handleFetchExistingEntity(existingEntityDid)
      }
    }

    let extraErrors = {}
    if (error) {
      extraErrors = {
        existingEntityDid: {
          __errors: [error],
        },
      }
    }

    const renderButton = () => {
      if (title) {
        return <ImportButton onClick={handleResetContent}>Restart</ImportButton>
      }

      return <ImportButton onClick={handleImportClick}>Import</ImportButton>
    }

    return (
      <FormContainer>
        <MultiControlForm
          formData={formData}
          ref={ref}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmitted}
          onFormDataChange={handleUpdateContent}
          liveValidate={false}
          extraErrors={extraErrors}
        >
          <ButtonContainer>{renderButton()}</ButtonContainer>
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default ExistingEntityCard
