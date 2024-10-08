import React, { useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { FlexBox, SvgBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { Vote } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { SignStep, TXStatus } from '../common'
import { useTheme } from 'styled-components'

const VoteOptions = [
  {
    value: 'yes',
    icon: '/assets/images/icon-thumbs-up.svg',
    text: 'Yes',
  },
  {
    value: 'no',
    icon: '/assets/images/icon-thumbs-down.svg',
    text: 'No',
  },
  {
    value: 'no',
    icon: '/assets/images/icon-hand-paper.svg',
    text: 'No with veto',
  },
  {
    value: 'abstain',
    icon: '/assets/images/icon-question-circle.svg',
    text: 'Abstain',
  },
]

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onVote: (value: Vote) => Promise<string>
}

const VoteModal: React.FunctionComponent<Props> = ({ open, setOpen, onVote }) => {
  const theme: any = useTheme()
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
          VoteOptions.map(({ value, icon, text }, index) => (
            <FlexBox
              key={index}
              $direction='column'
              $alignItems='center'
              $gap={2}
              color={'white'}
              cursor='pointer'
              hover={{ color: theme.ixoNewBlue }}
            >
              <FlexBox
                width='120px'
                height='120px'
                $borderRadius='8px'
                $justifyContent='center'
                $alignItems='center'
                $borderColor={theme.ixoNewBlue}
                $borderWidth={'1px'}
                $borderStyle='solid'
                color='currentColor'
                transition='all .2s'
                hover={{ $borderWidth: '3px' }}
                onClick={handleVote(value as Vote)}
              >
                <SvgBox $svgWidth={12.5} $svgHeight={12.5} color='currentColor'>
                  <img src={icon} />
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
