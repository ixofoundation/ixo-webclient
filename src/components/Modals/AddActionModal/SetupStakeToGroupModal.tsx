import { Coin } from '@cosmjs/proto-signing'
import { contracts } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { FlexBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TProposalActionModel } from 'types/protocol'
import { convertDenomToMicroDenomWithDecimals, convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { getContractNameByCodeId } from 'utils/dao'
import { isContractAddress } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface StakeToGroupData {
  amount: string
  tokenContract: string
  stakingContract: string
}
const initialState: StakeToGroupData = {
  amount: '',
  tokenContract: '',
  stakingContract: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupStakeToGroupModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  const { cwClient } = useAccount()
  const [formData, setFormData] = useState<StakeToGroupData>(initialState)
  const [tokenBalance, setTokenBalance] = useState<Coin>({ amount: '0', denom: '' })
  const [tokenDecimals, setTokenDecimals] = useState(0)
  const [isValidContract, setIsValidContract] = useState(false)
  const [groupContract, setGroupContract] = useState('')

  const validate = useMemo(() => {
    return (
      new BigNumber(formData.amount).isGreaterThan(new BigNumber(0)) &&
      isContractAddress(groupContract) &&
      isContractAddress(formData.tokenContract) &&
      isContractAddress(formData.stakingContract)
    )
  }, [formData, groupContract])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  useEffect(() => {
    if (isContractAddress(groupContract)) {
      ;(async () => {
        const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, groupContract)
        const votingModuleAddress = await daoCoreClient.votingModule()
        const { codeId } = await cwClient.getContract(votingModuleAddress)
        const contractName = getContractNameByCodeId(codeId)

        if (contractName === 'dao_voting_cw20_staked') {
          setIsValidContract(true)
        }
      })()
    } else {
      setIsValidContract(false)
      setTokenBalance({ amount: '0', denom: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupContract])

  useEffect(() => {
    if (isValidContract) {
      ;(async () => {
        const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, groupContract)

        const votingModuleAddress = await daoCoreClient.votingModule()

        const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
          cwClient,
          votingModuleAddress,
        )

        const stakingContract = await daoVotingCw20StakedClient.stakingContract()
        const tokenContract = await daoVotingCw20StakedClient.tokenContract()
        const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
        const tokenInfo = await cw20BaseClient.tokenInfo()
        const { balance: microBalance } = await cw20BaseClient.balance({ address: coreAddress })
        const balance = convertMicroDenomToDenomWithDecimals(microBalance, tokenInfo.decimals).toString()

        setTokenBalance({ amount: balance, denom: tokenInfo.symbol })
        setTokenDecimals(tokenInfo.decimals)
        handleUpdateFormData('tokenContract', tokenContract)
        handleUpdateFormData('stakingContract', stakingContract)
      })()
    } else {
      setTokenBalance({ amount: '0', denom: '' })
      setTokenDecimals(0)
      handleUpdateFormData('tokenContract', '')
      handleUpdateFormData('stakingContract', '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidContract])

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' gap={2} direction='column'>
        <Typography size='xl' weight='medium'>
          Stake to
        </Typography>
        <Input inputValue={groupContract} handleChange={(value) => setGroupContract(value)} />
      </FlexBox>

      <FlexBox width='100%' gap={2} direction='column'>
        <Typography size='xl' weight='medium'>
          Amount
        </Typography>
        <FlexBox width='100%' alignItems='center' gap={6} color={tokenBalance.denom ? 'black' : theme.ixoGrey500}>
          <FlexBox position='relative' width='100%'>
            <Input
              inputValue={
                tokenBalance.denom
                  ? convertMicroDenomToDenomWithDecimals(formData.amount, tokenDecimals).toString()
                  : ''
              }
              handleChange={(value) =>
                handleUpdateFormData('amount', convertDenomToMicroDenomWithDecimals(value, tokenDecimals).toString())
              }
              style={{ textAlign: 'right' }}
              disabled={!tokenBalance.denom}
              wrapperStyle={!tokenBalance.denom ? { borderColor: theme.ixoGrey500 } : {}}
            />
            {tokenBalance.denom && (
              <FlexBox position='absolute' right='1rem' top='-1rem'>
                <Typography color='blue' size='sm'>
                  {Number(tokenBalance.amount).toLocaleString()} {tokenBalance.denom} available
                </Typography>
              </FlexBox>
            )}
          </FlexBox>
          <Typography size='xl' weight='medium' noWrap>
            {tokenBalance.denom ? '$' + tokenBalance.denom.toUpperCase() : 'group token'}
          </Typography>
        </FlexBox>
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupStakeToGroupModal
