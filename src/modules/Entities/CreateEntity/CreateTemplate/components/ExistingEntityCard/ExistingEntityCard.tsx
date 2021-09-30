import React, { FunctionComponent, useMemo } from 'react'
import styled from 'styled-components'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { NetworkType } from '../../../../types'
import { FormCardProps } from '../../../types'
import * as Toast from 'common/utils/Toast'

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
  sourceNet: NetworkType
  existingEntityDid: string
  error: string
  title: string
  handleFetchExistingEntity: (did: string, sourceNet: string) => void
  handleResetContent: () => void
}

const schema = {
  type: 'object',
  properties: {
    sourceNet: {
      type: 'string',
      title: 'Network',
      enum: Object.keys(NetworkType).map((key) => NetworkType[key]),
      enumNames: Object.keys(NetworkType).map((key) => NetworkType[key]),
    },
    existingEntityDid: { type: 'string', title: 'Use an Existing Entity' },
  },
}

const uiSchema = {
  sourceNet: {
    'ui:placeholder': 'Select Network',
  },
  entityDid: {
    'ui:widget': 'text',
    'ui:placeholder': 'Paste a DID',
  },
}

// eslint-disable-next-line react/display-name
const ExistingEntityCard: FunctionComponent<Props> = React.forwardRef(
  (
    {
      sourceNet,
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
      sourceNet,
      existingEntityDid,
    }

    const handleImportClick = (): void => {
      if (existingEntityDid) {
        if (!sourceNet) {
          Toast.successToast('Select Network')
          return;
        }
        handleFetchExistingEntity(existingEntityDid, sourceNet)
      }
    }

    const extraErrors = useMemo(() => {
      if (error === '') {
        return {}
      }

      return {
        existingEntityDid: {
          __errors: [error],
        },
      }
    }, [error])

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
          multiColumn
        >
          <ButtonContainer>{renderButton()}</ButtonContainer>
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default ExistingEntityCard
