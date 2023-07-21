import React, { useState } from 'react'
import _ from 'lodash'
import * as Modal from 'react-modal'
import { ModalStyles, CloseButton } from 'components/Modals/styles'
import { ReactComponent as CloseIcon } from 'assets/images/icon-close.svg'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Button, Input } from 'pages/CreateEntity/Components'
import { Typography } from 'components/Typography'
import ClaimTemplateCard from '../ClaimSetupModal/ClaimTemplateCard'
import { TEntityClaimTemplateModel } from 'types/protocol'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as SearchIcon } from 'assets/images/icon-search.svg'
import { ReactComponent as SlidersIcon } from 'assets/images/icon-sliders-h-solid.svg'
import { useAppSelector } from 'redux/hooks'
import { selectAllClaimProtocols } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useHistory } from 'react-router-dom'

const ClaimProtocolList = styled(FlexBox)`
  height: 290px;

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
  const history = useHistory()
  const theme: any = useTheme()
  const claimProtocols = useAppSelector(selectAllClaimProtocols)

  console.log({ claimProtocols })

  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState(false)
  const [template, setTemplate] = useState<TEntityClaimTemplateModel>()

  const handleCreate = (): void => {
    history.push('/create/entity/protocol/claim')
  }
  const handleContinue = (): void => {
    template && onSelect(template)
    onClose()
  }

  return (
    // @ts-ignore
    <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>

      <FlexBox direction='column' gap={8}>
        <FlexBox justifyContent='space-between' alignItems='center'>
          <Typography size='2xl'>Select a Verifiable Claim Protocol</Typography>
        </FlexBox>
        <FlexBox alignItems='center' gap={4} px={2.5}>
          <Input
            width='270px'
            height='48px'
            placeholder={'Search'}
            inputValue={keyword}
            handleChange={(value) => setKeyword(value)}
            preIcon={
              <SvgBox color={theme.ixoGrey300} svgWidth={6}>
                <SearchIcon />
              </SvgBox>
            }
            style={{ fontWeight: 500 }}
          />
          <Button
            variant={filter ? 'primary' : 'secondary'}
            size='custom'
            width={48}
            height={48}
            onClick={() => setFilter((pre) => !pre)}
          >
            <SvgBox svgWidth={6} color={filter ? theme.ixoWhite : theme.ixoGrey700}>
              <SlidersIcon />
            </SvgBox>
          </Button>
        </FlexBox>
        <ClaimProtocolList className='overflow-auto' p={2.5}>
          <FlexBox direction='column' gap={6}>
            {_.chunk(claimProtocols, 3).map((row, rowIdx) => (
              <FlexBox key={rowIdx} gap={6}>
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
        <FlexBox className='w-100' justifyContent='flex-end' gap={5}>
          <Button size='custom' width={190} height={48} variant='secondary' onClick={handleCreate}>
            Create New
          </Button>
          <Button size='custom' width={190} height={48} variant='primary' disabled={!template} onClick={handleContinue}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  )
}

export default ClaimSelectModal
