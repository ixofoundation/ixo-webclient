import cx from 'classnames'
import MultiControlForm from 'common/components/JsonForm/MultiControlForm/MultiControlForm'
import { RootState } from 'common/redux/types'
import React, { FunctionComponent, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
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
  &.active {
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    color: ${(props: any): string => props.theme.fontLightGreyBlue};
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  column-gap: 1rem;
`

interface Props extends FormCardProps {
  sourceNet: string
  existingEntityDid: string
  error: string
  handleMethod: (method: string) => void
  method: string
  handleNewClick: () => void
  handleCopyClick: () => void
}

// eslint-disable-next-line react/display-name
const ExistingEntityCard: FunctionComponent<Props> = React.forwardRef(
  (
    {
      sourceNet,
      existingEntityDid,
      error,
      handleSubmitted,
      handleUpdateContent,
      handleMethod,
      method,
      handleNewClick,
      handleCopyClick,
    },
    ref,
  ) => {
    const formData = {
      sourceNet,
      existingEntityDid,
    }
    const relayers = useSelector((state: RootState) => state.relayers)

    const schema = {
      type: 'object',
      properties: {
        sourceNet: {
          type: 'string',
          title: 'Select a Source Network',
          enum: relayers.map((relayer) => relayer.name),
          enumNames: relayers.map((relayer) => relayer.name),
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

    const extraErrors = useMemo(() => {
      if (!error) {
        return {}
      }
      handleMethod(null)
      return {
        existingEntityDid: {
          __errors: [error],
        },
      }
      // eslint-disable-next-line
    }, [error])

    return (
      <FormContainer>
        <MultiControlForm
          formData={formData}
          ref={ref}
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={handleSubmitted}
          onFormDataChange={(formData: FormData): void => {
            handleMethod(null)
            handleUpdateContent(formData)
          }}
          liveValidate={false}
          extraErrors={extraErrors}
          multiColumn
        >
          <ButtonContainer>
            <ImportButton
              onClick={handleCopyClick}
              disabled={!existingEntityDid || !sourceNet}
              className={cx([
                {
                  active: method === 'copy',
                },
              ])}
            >
              Copy
            </ImportButton>
            <ImportButton
              onClick={handleNewClick}
              className={cx([
                {
                  active: method === 'new',
                },
              ])}
            >
              New
            </ImportButton>
          </ButtonContainer>
        </MultiControlForm>
      </FormContainer>
    )
  },
)

export default ExistingEntityCard
