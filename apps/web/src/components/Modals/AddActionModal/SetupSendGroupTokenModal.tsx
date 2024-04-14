import { Coin } from '@cosmjs/proto-signing'
import { contracts } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { useAccount } from 'hooks/account'
import { useCurrentEntityAdminAccount } from 'hooks/currentEntity'
import { Input } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from 'styled-components'
import { TProposalActionModel } from 'types/entities'
import { convertDenomToMicroDenomWithDecimals, convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { getContractNameByCodeId } from 'utils/dao'
import { isAccountAddress, isContractAddress } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entitiesExplorer/entitiesExplorer.selectors'

export interface SendGroupTokenData {
  amount: string
  contract: string
  toAddress: string
}
const initialState: SendGroupTokenData = {
  amount: '',
  contract: '',
  toAddress: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupSendGroupTokenModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const theme: any = useTheme()
  const { cwClient } = useAccount()
  const { entityId = "" } = useParams<{ entityId: string }>()
  const { accounts } = useAppSelector(getEntityById(entityId))
  const adminAccountAddress = useCurrentEntityAdminAccount(accounts)
  const [formData, setFormData] = useState<SendGroupTokenData>(initialState)
  const [tokenBalance, setTokenBalance] = useState<Coin>({ amount: '0', denom: '' })
  const [tokenDecimals, setTokenDecimals] = useState(0)
  const [isValidContract, setIsValidContract] = useState(false)

  const validate = useMemo(() => {
    return (
      new BigNumber(formData.amount).isGreaterThan(new BigNumber(0)) &&
      isValidContract &&
      isAccountAddress(formData.toAddress)
    )
  }, [formData, isValidContract])

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  useEffect(() => {
    if (isContractAddress(formData.contract)) {
      ;(async () => {
        const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, formData.contract)
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
  }, [formData.contract])

  useEffect(() => {
    if (isValidContract) {
      ;(async () => {
        const daoCoreClient = new contracts.DaoCore.DaoCoreQueryClient(cwClient, formData.contract)

        const votingModuleAddress = await daoCoreClient.votingModule()

        const daoVotingCw20StakedClient = new contracts.DaoVotingCw20Staked.DaoVotingCw20StakedQueryClient(
          cwClient,
          votingModuleAddress,
        )

        const tokenContract = await daoVotingCw20StakedClient.tokenContract()
        const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract)
        const tokenInfo = await cw20BaseClient.tokenInfo()
        const { balance: microBalance } = await cw20BaseClient.balance({ address: adminAccountAddress })
        const balance = convertMicroDenomToDenomWithDecimals(microBalance, tokenInfo.decimals).toString()

        setTokenBalance({ amount: balance, denom: tokenInfo.symbol })
        setTokenDecimals(tokenInfo.decimals)
      })()
    } else {
      setTokenBalance({ amount: '0', denom: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidContract])

  const handleUpdateFormData = (key: string, value: any) => {
    onSubmit && setFormData((data: any) => ({ ...data, [key]: value }))
  }

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox width='100%' $gap={2} $direction='column'>
        <Typography size='xl' weight='medium'>
          Token Group Address
        </Typography>
        <Input inputValue={formData.contract} handleChange={(value) => handleUpdateFormData('contract', value)} />
      </FlexBox>

      <FlexBox width='100%' $gap={2} $direction='column'>
        <Typography size='xl' weight='medium'>
          Amount
        </Typography>
        <FlexBox width='100%' $alignItems='center' $gap={6} color={tokenBalance.denom ? 'black' : theme.ixoGrey500}>
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
          <Typography size='xl' weight='medium' $noWrap>
            {tokenBalance.denom ? '$' + tokenBalance.denom.toUpperCase() : 'group token'}
          </Typography>
        </FlexBox>
      </FlexBox>

      <FlexBox width='100%' $gap={2} $direction='column'>
        <Typography size='xl' weight='medium'>
          Send to
        </Typography>
        <Input
          inputValue={formData.toAddress}
          handleChange={(value) => handleUpdateFormData('toAddress', value)}
          disabled={!tokenBalance.denom}
          wrapperStyle={!tokenBalance.denom ? { borderColor: theme.ixoGrey500 } : {}}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupSendGroupTokenModal
