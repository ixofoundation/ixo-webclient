import { FlexBox } from 'components/App/App.styles'
import React, { useEffect, useMemo, useState } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { useCreateEntity } from 'hooks/createEntity'
import { deviceWidth } from 'constants/device'
import { Member } from 'types/dao'
import * as Toast from 'utils/toast'
import { isAccountAddress } from 'utils/validation'
import BigNumber from 'bignumber.js'
import {
  GroupMemberships,
  RenderGroupIdentity,
  Staking,
  UnstakingPeriod,
  RenderMultisigGroupMembership,
  VotingDuration,
  RenderAdvancedSwitch,
  RenderAdvancedSettings,
  RenderActions,
} from './SetupGroupSettingsComponents'

const inputHeight = 48

interface Props {
  daoGroup: TDAOGroupModel
  onBack?: () => void
  onSubmit: (data: TDAOGroupModel) => void
}

const SetupGroupSettings: React.FC<Props> = ({ daoGroup, onBack, onSubmit }): JSX.Element => {
  const { CreateDAOCoreByGroupId } = useCreateEntity()
  const [data, setData] = useState<TDAOGroupModel>(daoGroup)
  const [useExistingToken, setUseExistingToken] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    setData(daoGroup)
  }, [daoGroup, setData])

  useEffect(() => {
    let members: Member[] = []

    if (data.type === 'staking') {
      ;(data.memberships ?? []).forEach((membership) => {
        const weight = new BigNumber(data.token?.tokenInfo.total_supply || '0')
          .dividedBy(100)
          .times(membership.weight)
          .dividedBy(membership.members.length)
          .toNumber()

        members = [
          ...members,
          ...membership.members.map((member) => ({
            addr: member,
            weight: Math.floor(weight),
          })),
        ]
      })
    } else {
      ;(data.memberships ?? []).forEach((membership) => {
        members = [
          ...members,
          ...membership.members.map((member) => ({
            addr: member,
            weight: membership.weight,
          })),
        ]
      })
    }
    setData((v) => ({ ...v, votingModule: { ...v.votingModule, members } }))
  }, [data.memberships, data.token?.tokenInfo.total_supply, data.type])

  const valid: boolean = useMemo(() => {
    switch (data.type) {
      case 'membership':
      case 'multisig': {
        if (!data.config.name || !data.config.description) {
          setErrMsg('Group Name & Description Required')
          return false
        }
        // check if no memebers
        if (data.votingModule.members.length === 0) {
          setErrMsg('Cannot instantiate a group contract with no initial members')
          return false
        }
        // check invalid account address
        if (data.votingModule.members.some(({ addr }) => !isAccountAddress(addr))) {
          setErrMsg('Invalid Address Detected')
          return false
        }
        // check duplication
        const memberAddrs = data.votingModule.members.map(({ addr }) => addr)
        if (new Set(memberAddrs).size !== memberAddrs.length) {
          setErrMsg('Duplicate Address Detected')
          return false
        }
        setErrMsg('')
        return true
      }
      case 'staking': {
        if (useExistingToken && !data.token?.config.token_address) {
          setErrMsg('Token Contract Address Required')
          return false
        }
        if (!data.config.name || !data.config.description) {
          setErrMsg('Group Name & Description Required')
          return false
        }
        if (!data.token?.tokenInfo.symbol || !data.token?.tokenInfo.name) {
          setErrMsg('Token Symbol & Name Required')
          return false
        }
        if (data.token.tokenInfo.name.length < 3) {
          setErrMsg('Name is not in the expected format (3-50 UTF-8 bytes)')
          return false
        }
        // check distribution percentage 100%
        const treasuryPercent = data.token?.treasuryPercent ?? 0
        const totalTokenDistributionPercentage = (data.memberships ?? [])?.reduce((acc, cur) => acc + cur.weight, 0)

        if (treasuryPercent + totalTokenDistributionPercentage !== 100) {
          setErrMsg(
            `Total token distribution percentage must equal 100%, but it currently sums to ${
              treasuryPercent + totalTokenDistributionPercentage
            }%.`,
          )
          return false
        }
        // check if no memebers
        if (data.votingModule.members.length === 0) {
          setErrMsg('Cannot instantiate a group contract with no initial members')
          return false
        }
        // check invalid account address
        if (data.votingModule.members.some(({ addr }) => !isAccountAddress(addr))) {
          setErrMsg('Invalid Address Detected')
          return false
        }
        // check duplication
        const memberAddrs = data.votingModule.members.map(({ addr }) => addr)
        if (new Set(memberAddrs).size !== memberAddrs.length) {
          setErrMsg('Duplicate Address Detected')
          return false
        }
        if (
          !data.token?.config.unstaking_duration ||
          ('time' in data.token.config.unstaking_duration && data.token.config.unstaking_duration.time === 0)
        ) {
          setErrMsg('Invalid Unstaking Period')
          return false
        }
        setErrMsg('')
        return true
      }
      default:
        return false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true)

    try {
      const daoCoreAddresss = await CreateDAOCoreByGroupId(data)
      if (daoCoreAddresss) {
        Toast.successToast(null, `Create Group Succeed`)
        setSubmitting(false)
        console.log({ daoCoreAddresss })
        onSubmit({ ...data, coreAddress: daoCoreAddresss })
      } else {
        throw new Error('Not found an address')
      }
    } catch (e: any) {
      Toast.errorToast('Create Group Failed', e.message)
      setSubmitting(false)
    }
  }

  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' width={deviceWidth.tablet + 'px'}>
        <RenderGroupIdentity setData={setData} data={data} inputHeight={inputHeight} />
        {data.type === 'membership' && <GroupMemberships setData={setData} data={data} inputHeight={inputHeight} />}
        {data.type === 'staking' && (
          <Staking
            setData={setData}
            data={data}
            inputHeight={inputHeight}
            useExistingToken={useExistingToken}
            setUseExistingToken={setUseExistingToken}
          />
        )}
        {data.type === 'staking' && <UnstakingPeriod setData={setData} data={data} inputHeight={inputHeight} />}
        {data.type === 'multisig' && (
          <RenderMultisigGroupMembership setData={setData} data={data} inputHeight={inputHeight} />
        )}
        {<VotingDuration setData={setData} data={data} inputHeight={inputHeight} />}
        {<RenderAdvancedSwitch showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced} />}
        {showAdvanced && <RenderAdvancedSettings setData={setData} data={data} inputHeight={inputHeight} />}
        {
          <RenderActions
            errMsg={errMsg}
            onBack={onBack}
            submitting={submitting}
            handleSubmit={handleSubmit}
            valid={valid}
          />
        }
      </FlexBox>
    </FlexBox>
  )
}

export default SetupGroupSettings
