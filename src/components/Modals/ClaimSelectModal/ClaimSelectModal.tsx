import { CloseButton, ModalStyles } from 'components/Modals/styles'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import * as Modal from 'react-modal'

import { FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { Button, Input } from 'screens/CreateEntity/Components'
import styled, { useTheme } from 'styled-components'
import { TEntityClaimTemplateModel } from 'types/entities'
import ClaimTemplateCard from '../ClaimSetupModal/ClaimTemplateCard'

import { currentRelayerNode } from 'constants/common'
import { useEntitiesQuery } from 'generated/graphql'
import { useAccount } from 'hooks/account'
import { getEntitiesFromGraphqlAction, updateEntityPropertyAction } from 'redux/entities/entities.actions'
import { selectAllClaimProtocols } from 'redux/entities/entities.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { apiEntityToEntity } from 'utils/entities'

const ClaimProtocolList = styled(FlexBox)`
  height: 350px;

  &::-webkit-scrollbar {
    width: 1em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.ixoGrey300};
    border-radius: 100px;
  }
`

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (template: TEntityClaimTemplateModel) => void
}

const ClaimSelectModal: React.FC<Props> = ({ open, onClose, onSelect }): JSX.Element => {
  const theme: any = useTheme()
  const dispatch = useAppDispatch()
  const { cwClient, address } = useAccount()

  const claimProtocols = useAppSelector(selectAllClaimProtocols)

  useEntitiesQuery({
    skip: claimProtocols.length > 0,
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        type: { equalTo: 'protocol/claim' },
        entityVerified: { equalTo: true },
      },
    },
    onCompleted: ({ entities }) => {
      const nodes = entities?.nodes ?? []
      if (nodes.length > 0) {
        dispatch(getEntitiesFromGraphqlAction(nodes as any[]))
        for (const entity of nodes) {
          apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
            dispatch(updateEntityPropertyAction(entity.id, key, data, merge))
          })
        }
      }
    },
  })

  const [keyword, setKeyword] = useState('')
  const [template, setTemplate] = useState<TEntityClaimTemplateModel>()

  const handleContinue = (): void => {
    template && onSelect(template)
    onClose()
  }

  const searchableClaims = useMemo(() => {
    const allowedProtocols = claimProtocols.filter(
      (claimProtocols) =>
        claimProtocols.relayerNode === currentRelayerNode ||
        claimProtocols.owner === address ||
        claimProtocols.entityVerified,
    )
    const searchResults =
      keyword.length > 2
        ? allowedProtocols.filter((protocol) => protocol.profile?.name?.includes(keyword))
        : allowedProtocols
    return searchResults
  }, [keyword, claimProtocols, address])

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <img src='/assets/images/icon-close.svg' />
      </CloseButton>

      <FlexBox $direction='column' $gap={8}>
        <FlexBox $justifyContent='space-between' $alignItems='center'>
          <Typography size='2xl'>Select a Verifiable Claim Protocol</Typography>
        </FlexBox>
        <FlexBox $alignItems='center' $gap={4} px={2.5}>
          <Input
            width='340px'
            height='48px'
            placeholder={'Search'}
            inputValue={keyword}
            handleChange={(value) => setKeyword(value)}
            preIcon={
              <SvgBox color={theme.ixoGrey300} $svgWidth={6}>
                <img src='/assets/images/icon-search.svg' />
              </SvgBox>
            }
            style={{ fontWeight: 500 }}
          />
        </FlexBox>
        <ClaimProtocolList className='overflow-auto' p={2.5}>
          <FlexBox $direction='column' $gap={6}>
            {_.chunk(searchableClaims, 3).map((row, rowIdx) => (
              <FlexBox key={rowIdx} $gap={6}>
                {row
                  .map((v) => ({
                    id: `${v.id}#${v.profile?.name || ''}`,
                    type: v.profile?.category || '',
                    title: v.profile?.name || '',
                    description: v.profile?.description || '',
                    creator: v.creator?.displayName || '',
                    createdAt: (v.metadata?.created as unknown as string) || '',
                  }))
                  .map((v, index) => (
                    <ClaimTemplateCard
                      key={index}
                      template={v}
                      selected={v.id === template?.id}
                      onClick={(): void => setTemplate(v)}
                    />
                  ))}
              </FlexBox>
            ))}
          </FlexBox>
        </ClaimProtocolList>
        <FlexBox className='w-100' $justifyContent='flex-end' $gap={5}>
          <Button size='custom' width={190} height={48} variant='primary' disabled={!template} onClick={handleContinue}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default ClaimSelectModal
