import React, { useEffect, useState } from 'react'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { ChainSelector, Input } from 'pages/CreateEntity/Components'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { ReactComponent as SearchIcon } from 'assets/images/icon-search.svg'
import { BlockSyncService } from 'services/blocksync'
import { validateEntityDid } from 'utils/validation'
import { useHistory } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'

const bsService = new BlockSyncService()

const Body = styled(FlexBox)`
  input {
    height: 100%;
  }
`

export interface ManageStorageItemsData {
  setting: boolean
  key: string
  value: string
}
const initialState: ManageStorageItemsData = {
  setting: true,
  key: '',
  value: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupEditEntityModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const theme: any = useTheme()
  const SearchInputStyles = {
    fontFamily: theme.secondaryFontFamily,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28,
  }
  const history = useHistory()
  const [, setFormData] = useState<ManageStorageItemsData>(initialState)
  const [chainId, setChainId] = useState(undefined)
  const [entityDid, setEntityDid] = useState('')
  const [validate, setValidate] = useState(false)

  useEffect(() => {
    if (action.data) {
      setFormData(action.data)
    }
  }, [action.data])

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

  const handleConfirm = () => {
    onSubmit &&
      history.push({ pathname: `/edit/entity/${entityDid}`, search: `?redirectTo=${history.location.pathname}` })
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
