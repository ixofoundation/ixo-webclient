import React, { useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Vote } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { SignStep, TXStatus } from '../common'
import { useMantineTheme } from '@mantine/core'
import { IconThumbsUp, IconThumbsDown, IconHandPaper, IconQuestionCircle } from 'components/IconPaths'

const VoteOptions = [
  {
    value: 'yes',
    icon: IconThumbsUp,
    text: 'Yes',
  },
  {
    value: 'no',
    icon: IconThumbsDown,
    text: 'No',
  },
  {
    value: 'no',
    icon: IconHandPaper,
    text: 'No with veto',
  },
  {
    value: 'abstain',
    icon: IconQuestionCircle,
    text: 'Abstain',
  },
]

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onVote: (value: Vote) => Promise<string>
}

const VoteModal: React.FunctionComponent<Props> = ({ open, setOpen, onVote }) => {
  const theme = useMantineTheme()
  const [txStatus, setTxStatus] = useState<TXStatus>(TXStatus.UNDEFINED)
  const [txHash, setTxHash] = useState<string>('')

  const handleVote = (vote: Vote) => () => {
    setTxStatus(TXStatus.PENDING)
    onVote(vote).then((hash) => {
      if (hash) {
        setTxHash(hash)
        setTxStatus(TXStatus.SUCCESS)
      } else {
        setTxStatus(TXStatus.ERROR)
      }
    })
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Vote',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <FlexBox $gap={4} py={12} $justifyContent='center' width='560px'>
        {txStatus === TXStatus.UNDEFINED &&
          VoteOptions.map(({ value, icon: Icon, text }, index) => (
            <FlexBox
              key={index}
              $direction='column'
              $alignItems='center'
              $gap={2}
              color={'white'}
              cursor='pointer'
              hover={{ color: theme.colors.blue[5] }}
            >
              <FlexBox
                width='120px'
                height='120px'
                $borderRadius='8px'
                $justifyContent='center'
                $alignItems='center'
                $borderColor={theme.colors.blue[5]}
                $borderWidth={'1px'}
                $borderStyle='solid'
                color='currentColor'
                transition='all .2s'
                hover={{ $borderWidth: '3px' }}
                onClick={handleVote(value as Vote)}
              >
                <SvgBox $svgWidth={12.5} $svgHeight={12.5} color='currentColor'>
                  <Icon />
                </SvgBox>
              </FlexBox>
              <Typography size='sm' weight='bold' transform='uppercase' color='inherit'>
                {text}
              </Typography>
            </FlexBox>
          ))}
        {txStatus !== TXStatus.UNDEFINED && <SignStep status={txStatus} hash={txHash} />}
      </FlexBox>
    </ModalWrapper>
  )
}

export default VoteModal
