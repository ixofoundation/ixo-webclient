import React, { useState } from 'react'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { ChainSelector, Input } from 'screens/CreateEntity/Components'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'

import SearchIcon from 'assets/images/icon-search.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useGetEntityById } from 'graphql/entities'

const Body = styled(FlexBox)`
  input {
    height: 100%;
  }
`

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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [chainId, setChainId] = useState(undefined)
  const [entityDid, setEntityDid] = useState('')
  const { error: validate } = useGetEntityById(entityDid)

  const handleConfirm = () => {
    onSubmit && navigate({ pathname: `/edit/entity/${entityDid}`, search: `?redirectTo=${pathname}` })
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={!!validate}
    >
      <Body width='100%' height='100%' $gap={4}>
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
