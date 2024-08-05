import React, { useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Vote } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalSingle.types'
import { ReactComponent as ThumbsUpIcon } from '/public/assets/images/icon-thumbs-up.svg'
import { ReactComponent as ThumbsDownIcon } from '/public/assets/images/icon-thumbs-down.svg'
import { ReactComponent as HandPaperIcon } from '/public/assets/images/icon-hand-paper.svg'
import { ReactComponent as QuestionCircleIcon } from '/public/assets/images/icon-question-circle.svg'
import { SignStep, TXStatus } from '../common'
import { useTheme } from 'styled-components'

const VoteOptions = [
  {
    value: 'yes',
    icon: ThumbsUpIcon,
    text: 'Yes',
  },
  {
    value: 'no',
    icon: ThumbsDownIcon,
    text: 'No',
  },
  {
    value: 'no',
    icon: HandPaperIcon,
    text: 'No with veto',
  },
  {
    value: 'abstain',
    icon: QuestionCircleIcon,
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
          VoteOptions.map(({ value, icon: Icon, text }, index) => (
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
