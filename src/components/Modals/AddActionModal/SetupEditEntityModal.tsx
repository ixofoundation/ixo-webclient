import React, { useEffect, useState } from 'react'
import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import { ChainSelector, Input } from 'pages/CreateEntity/Components'
import { TProposalActionModel } from 'types/protocol'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { ReactComponent as SearchIcon } from 'assets/images/icon-search.svg'
import { BlockSyncService } from 'services/blocksync'
import { validateEntityDid } from 'utils/validation'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const bsService = new BlockSyncService()

const Body = styled(FlexBox)`
  input {
    height: 100%;
  }
`

const SearchInputStyles = {
  fontFamily: theme.secondaryFontFamily,
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 28,
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupEditEntityModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const history = useHistory()
  const [chainId, setChainId] = useState(undefined)
  const [entityDid, setEntityDid] = useState('')
  const [validate, setValidate] = useState(false)

  useEffect(() => {
    if (validateEntityDid(entityDid)) {
      bsService.entity
        .getEntityById(entityDid)
        .then(() => setValidate(true))
        .catch(() => setValidate(false))
    } else {
      setValidate(false)
    }
  }, [entityDid])

  // const handleUpdateFormData = (key: string, value: any) => {
  //   onSubmit && setFormData((data) => ({ ...data, [key]: value }))
  // }

  const handleConfirm = () => {
    // onSubmit && onSubmit({ ...action, data: formData })
    onSubmit && history.push(`/edit/entity/${entityDid}`)
    // onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <Body width='100%' height='100%' gap={4}>
        <ChainSelector chainId={chainId!} onChange={setChainId as any} />
        <Input
          name='entitydid'
          inputValue={entityDid}
          handleChange={setEntityDid}
          placeholder='Type to Search or enter a DID'
          preIcon={
            <SvgBox color={theme.ixoGrey700}>
              <SearchIcon />
            </SvgBox>
          }
          width='400px'
          height='48px'
          style={SearchInputStyles}
        />
      </Body>
    </SetupActionModalTemplate>
  )
}

export default SetupEditEntityModal
