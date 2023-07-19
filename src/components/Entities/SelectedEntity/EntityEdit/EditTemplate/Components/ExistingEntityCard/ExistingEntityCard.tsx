import React, { FunctionComponent, useMemo } from 'react'
import styled from 'styled-components'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../../redux/editEntityOld/editEntity.types'

const FormContainer = styled.div`
  border-top: 1px solid #e8edee;
  margin-top: 4rem;
  padding-top: 1.25rem;
`

const ImportButton = styled.button`
  border: 1px solid #56ccf2;
  border-radius: 4px;
  color: ${(props) => props.theme.ixoNewBlue};
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
        >
          <ButtonContainer>{renderButton()}</ButtonContainer>
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default ExistingEntityCard
