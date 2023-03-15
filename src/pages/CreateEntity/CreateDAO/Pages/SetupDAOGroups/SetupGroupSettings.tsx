import { FlexBox, SvgBox, theme } from 'components/App/App.styles'
import React, { useState } from 'react'
import { TDAOGroupModel } from 'types/protocol'
import { CardWrapper, PlusIcon } from './SetupGroupSettings.styles'
import { Typography } from 'components/Typography'
import {
  AccountValidStatus,
  Button,
  Dropdown2,
  InputWithLabel,
  NumberCounter,
  SimpleSelect,
  Switch,
  TextArea,
} from 'pages/CreateEntity/Components'
import { useCreateEntity, useCreateEntityState } from 'hooks/createEntity'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as BinIcon } from 'assets/images/icon-bin-lg.svg'
import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock.svg'
import { ReactComponent as VoteSwitchingIcon } from 'assets/images/icon-vote-switching.svg'
import { ReactComponent as CoinsSolidIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as ThresholdIcon } from 'assets/images/icon-threshold.svg'
import { ReactComponent as TokenContractIcon } from 'assets/images/icon-token-contract.svg'
import { deviceWidth } from 'constants/device'
import { DepositRefundPolicy } from 'types/dao'
import * as Toast from 'utils/toast'

export const initialMembership = { category: '', weight: 1, members: [''] }
const initialStakingDistribution = { category: '', totalSupplyPercent: 0, members: [''] }
const inputHeight = 48

interface Props {
  id: string
  onBack: () => void
  onSubmit: (data: TDAOGroupModel) => void
}

const SetupGroupSettings: React.FC<Props> = ({ id, onBack, onSubmit }): JSX.Element => {
  const { CreateDAOCoreByGroupId } = useCreateEntity()
  const { daoGroups } = useCreateEntityState()
  const [data, setData] = useState<TDAOGroupModel>(daoGroups[id])
  const [useExistingToken, setUseExistingToken] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true)

    const daoContractAddress = await CreateDAOCoreByGroupId(data)
    if (!daoContractAddress) {
      Toast.errorToast(`Create DAO Core Failed`)
      setSubmitting(false)
      return
    } else {
      Toast.successToast(`Create DAO Core Succeed`)
      setSubmitting(false)
      console.log({ daoContractAddress })
    }
    onSubmit({ ...data, contractAddress: daoContractAddress })
  }

  const renderGroupIdentity = (): JSX.Element => {
    return (
      <CardWrapper direction='column' gap={5} marginBottom={7}>
        <FlexBox gap={2} alignItems='center'>
          <InfoIcon />
          <Typography size='xl' weight='medium'>
            Group Identity
          </Typography>
        </FlexBox>
        <FlexBox>
          <InputWithLabel
            height={inputHeight + 'px'}
            label='Group Name'
            inputValue={data.name}
            handleChange={(value): void => setData((pre) => ({ ...pre, name: value }))}
          />
        </FlexBox>
        <FlexBox>
          <TextArea
            height='100px'
            label='Short Description'
            inputValue={data.description || ''}
            handleChange={(value): void => setData((pre) => ({ ...pre, description: value }))}
          />
        </FlexBox>
      </CardWrapper>
    )
  }
  /**
   * @type membership
   * @returns
   */
  const renderGroupMemberships = (): JSX.Element => {
    const handleAddMembership = (): void => {
      setData((pre) => ({ ...pre, memberships: [...(pre.memberships ?? []), initialMembership] }))
    }
    const handleUpdateMembership = (membershipIdx: number, key: string, value: any): void => {
      setData((pre) => ({
        ...pre,
        memberships: pre.memberships?.map((membership, i) => {
          if (membershipIdx === i) {
            return { ...membership, [key]: value }
          }
          return membership
        }),
      }))
    }
    const handleRemoveMembership = (membershipIdx: number): void => {
      if (data.memberships?.length !== 1) {
        setData((pre) => ({ ...pre, memberships: pre.memberships?.filter((item, i) => membershipIdx !== i) }))
      } else {
        setData((pre) => ({ ...pre, memberships: [initialMembership] }))
      }
    }
    const handleAddMember = (membershipIdx: number): void => {
      const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
      handleUpdateMembership(membershipIdx, 'members', [...members, ''])
    }
    const handleUpdateMember = (membershipIdx: number, memberIdx: number, value: string): void => {
      const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
      handleUpdateMembership(
        membershipIdx,
        'members',
        members.map((item, index) => {
          if (index === memberIdx) {
            return value
          }
          return item
        }),
      )
    }
    const handleRemoveMember = (membershipIdx: number, memberIdx: number): void => {
      const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
      if (members.length === 1) {
        handleUpdateMembership(membershipIdx, 'members', [''])
      } else {
        handleUpdateMembership(
          membershipIdx,
          'members',
          members.filter((item, index) => memberIdx !== index),
        )
      }
    }
    return (
      <FlexBox direction='column' width='100%' gap={7} marginBottom={7}>
        {data.memberships.map((membership, membershipIdx) => (
          <CardWrapper direction='column' gap={5} key={membershipIdx}>
            <FlexBox justifyContent='space-between' alignItems='center'>
              <FlexBox gap={2} alignItems='center'>
                <ProfileIcon />
                <Typography size='xl' weight='medium'>
                  Group Membership
                </Typography>
              </FlexBox>
              <Button
                variant='grey900'
                size='custom'
                width={52}
                height={48}
                onClick={(): void => handleRemoveMembership(membershipIdx)}
              >
                <BinIcon />
              </Button>
            </FlexBox>
            <FlexBox direction='column' gap={5}>
              <Typography size='xl' weight='medium'>
                Categories
              </Typography>
              <FlexBox width='100%' alignItems='center' gap={4}>
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Membership Category'
                  inputValue={membership.category}
                  handleChange={(value): void => handleUpdateMembership(membershipIdx, 'category', value)}
                />
                <NumberCounter
                  label='Voting Weight per Member'
                  height={inputHeight + 'px'}
                  value={membership.weight ?? 0}
                  onChange={(value): void => handleUpdateMembership(membershipIdx, 'weight', value)}
                />
              </FlexBox>
            </FlexBox>
            <FlexBox direction='column' gap={5}>
              <Typography size='xl' weight='medium'>
                Members
              </Typography>
              <FlexBox direction='column' gap={4} width='100%'>
                {membership.members.map((member, memberIdx) => (
                  <FlexBox key={memberIdx} alignItems='center' gap={4} width='100%'>
                    <InputWithLabel
                      height={inputHeight + 'px'}
                      label='Member Account Address or Name'
                      inputValue={member}
                      handleChange={(value): void => handleUpdateMember(membershipIdx, memberIdx, value)}
                      wrapperStyle={{ flexGrow: 1 }}
                    />
                    <AccountValidStatus address={member} style={{ flex: '0 0 52px' }} />
                    <Button
                      variant='grey900'
                      size='custom'
                      width={52}
                      height={48}
                      style={{ flex: '0 0 52px' }}
                      onClick={(): void => handleRemoveMember(membershipIdx, memberIdx)}
                    >
                      <BinIcon />
                    </Button>
                  </FlexBox>
                ))}
                <Button size='custom' width={230} height={48} onClick={(): void => handleAddMember(membershipIdx)}>
                  <FlexBox alignItems='center' gap={2}>
                    <PlusIcon color={theme.ixoWhite} />
                    Add Account
                  </FlexBox>
                </Button>
              </FlexBox>
            </FlexBox>
          </CardWrapper>
        ))}
        <CardWrapper className='cursor-pointer' width='100%' alignItems='center' gap={2} onClick={handleAddMembership}>
          <PlusIcon />
          <Typography color='blue' size='xl' weight='medium'>
            Add a Membership Category
          </Typography>
        </CardWrapper>
      </FlexBox>
    )
  }
  /**
   * @type staking
   * @returns
   */
  const renderStaking = (): JSX.Element => {
    const handleUpdateStaking = (key: string, value: any): void => {
      setData((pre) => ({ ...pre, staking: { ...pre.staking, [key]: value } }))
    }
    const handleAddDistributionCategory = (): void => {
      handleUpdateStaking('distributions', [...(data.staking?.distributions ?? []), initialMembership])
    }
    const handleUpdateDistribution = (distributionIdx: number, key: string, value: any): void => {
      handleUpdateStaking(
        'distributions',
        data.staking?.distributions?.map((distribution, i) => {
          if (distributionIdx === i) {
            return { ...distribution, [key]: value }
          }
          return distribution
        }),
      )
    }
    const handleRemoveDistribution = (distributionIdx: number): void => {
      if (data.staking?.distributions?.length !== 1) {
        handleUpdateStaking(
          'distributions',
          data.staking?.distributions?.filter((item, i) => distributionIdx !== i),
        )
      } else {
        handleUpdateStaking('distributions', [initialStakingDistribution])
      }
    }
    const handleAddMember = (distributionIdx: number): void => {
      const members = (data.staking?.distributions ?? [])[distributionIdx]?.members ?? ['']
      handleUpdateDistribution(distributionIdx, 'members', [...members, ''])
    }
    const handleUpdateMember = (distributionIdx: number, memberIdx: number, value: string): void => {
      const members = (data.staking?.distributions ?? [])[distributionIdx]?.members ?? ['']
      handleUpdateDistribution(
        distributionIdx,
        'members',
        members.map((item, index) => {
          if (index === memberIdx) {
            return value
          }
          return item
        }),
      )
    }
    const handleRemoveMember = (distributionIdx: number, memberIdx: number): void => {
      const members = (data.staking?.distributions ?? [])[distributionIdx]?.members ?? ['']
      if (members.length === 1) {
        handleUpdateDistribution(distributionIdx, 'members', [''])
      } else {
        handleUpdateDistribution(
          distributionIdx,
          'members',
          members.filter((item, index) => memberIdx !== index),
        )
      }
    }
    return (
      <FlexBox direction='column' width='100%' gap={7} marginBottom={7}>
        {/* render buttons `Create a Token` & `Use an existing Token` */}
        <FlexBox width='100%' gap={7}>
          <Button
            variant={!useExistingToken ? 'primary' : 'grey500'}
            style={{ width: '100%' }}
            onClick={(): void => {
              if (useExistingToken) {
                setUseExistingToken(false)
                setData((pre) => ({ ...pre, staking: { distributions: [initialStakingDistribution] } }))
              }
            }}
          >
            Create a Token
          </Button>
          <Button
            variant={useExistingToken ? 'primary' : 'grey500'}
            style={{ width: '100%' }}
            onClick={(): void => {
              if (!useExistingToken) {
                setUseExistingToken(true)
                setData((pre) => ({ ...pre, staking: {} }))
              }
            }}
          >
            Use an existing Token
          </Button>
        </FlexBox>

        {!useExistingToken ? (
          <>
            {/* Token Creation */}
            <CardWrapper direction='column' gap={5}>
              <FlexBox gap={2} alignItems='center'>
                <TokenContractIcon />
                <Typography size='xl' weight='medium'>
                  Token Creation
                </Typography>
              </FlexBox>
              <FlexBox gap={5}>
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Token Symbol'
                  inputValue={data.staking?.tokenSymbol}
                  handleChange={(value): void => handleUpdateStaking('tokenSymbol', value)}
                />
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Token Name'
                  inputValue={data.staking?.tokenName}
                  handleChange={(value): void => handleUpdateStaking('tokenName', value)}
                />
              </FlexBox>
              <FlexBox gap={5}>
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Token Supply'
                  inputValue={data.staking?.tokenSupply}
                  handleChange={(value): void => handleUpdateStaking('tokenSupply', value)}
                />
                <FlexBox alignItems='center' gap={4} width='100%'>
                  <NumberCounter
                    height={inputHeight + 'px'}
                    label='Treasury Percent'
                    value={data.staking?.treasuryPercent ?? 0}
                    onChange={(value): void => handleUpdateStaking('treasuryPercent', value)}
                  />
                  <Typography size='xl' weight='medium'>
                    %
                  </Typography>
                </FlexBox>
              </FlexBox>
            </CardWrapper>

            {/* Distribution Category */}
            {(data.staking?.distributions ?? []).map((distribution, distributionIdx) => (
              <CardWrapper direction='column' gap={5} key={distributionIdx}>
                <FlexBox justifyContent='space-between' alignItems='center'>
                  <FlexBox gap={2} alignItems='center'>
                    <ProfileIcon />
                    <Typography size='xl' weight='medium'>
                      Distribution Category
                    </Typography>
                  </FlexBox>
                  <Button
                    variant='grey900'
                    size='custom'
                    width={52}
                    height={48}
                    onClick={(): void => handleRemoveDistribution(distributionIdx)}
                  >
                    <BinIcon />
                  </Button>
                </FlexBox>
                <FlexBox direction='column' gap={5}>
                  <FlexBox width='100%' alignItems='center' gap={5}>
                    <InputWithLabel
                      height={inputHeight + 'px'}
                      label='Category Name'
                      inputValue={distribution.category}
                      handleChange={(value): void => handleUpdateDistribution(distributionIdx, 'category', value)}
                    />
                    <FlexBox alignItems='center' gap={4} width='100%'>
                      <NumberCounter
                        height={inputHeight + 'px'}
                        label='Percent of total supply'
                        value={distribution.totalSupplyPercent}
                        onChange={(value): void =>
                          handleUpdateDistribution(distributionIdx, 'totalSupplyPercent', value)
                        }
                      />
                      <Typography size='xl' weight='medium'>
                        %
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
                <FlexBox direction='column' gap={5}>
                  <Typography size='xl' weight='medium'>
                    Members
                  </Typography>
                  <FlexBox direction='column' gap={4} width='100%'>
                    {distribution.members.map((member, memberIdx) => (
                      <FlexBox key={memberIdx} alignItems='center' gap={4} width='100%'>
                        <InputWithLabel
                          height={inputHeight + 'px'}
                          label='Member Account'
                          inputValue={member}
                          handleChange={(value): void => handleUpdateMember(distributionIdx, memberIdx, value)}
                        />
                        <AccountValidStatus address={member} style={{ flex: '0 0 52px' }} />
                        <Button
                          variant='grey900'
                          size='custom'
                          width={52}
                          height={48}
                          style={{ flex: '0 0 52px' }}
                          onClick={(): void => handleRemoveMember(distributionIdx, memberIdx)}
                        >
                          <BinIcon />
                        </Button>
                      </FlexBox>
                    ))}
                    <Button
                      size='custom'
                      width={230}
                      height={48}
                      onClick={(): void => handleAddMember(distributionIdx)}
                    >
                      <FlexBox alignItems='center' gap={2}>
                        <PlusIcon color={theme.ixoWhite} />
                        Add Account
                      </FlexBox>
                    </Button>
                  </FlexBox>
                </FlexBox>
              </CardWrapper>
            ))}

            {/* Add a Distribution Category */}
            <CardWrapper
              className='cursor-pointer'
              width='100%'
              alignItems='center'
              gap={2}
              marginBottom={7}
              onClick={handleAddDistributionCategory}
            >
              <PlusIcon />
              <Typography color='blue' size='xl' weight='medium'>
                Add a Distribution Category
              </Typography>
            </CardWrapper>
          </>
        ) : (
          <CardWrapper direction='column' gap={5} marginBottom={7}>
            <FlexBox gap={2} alignItems='center'>
              <TokenContractIcon />
              <Typography size='xl' weight='medium'>
                Validate the Token Contract Address
              </Typography>
            </FlexBox>
            <FlexBox gap={4}>
              <InputWithLabel
                height={inputHeight + 'px'}
                label='Enter ixo Address'
                inputValue={data.staking?.tokenContractAddress}
                handleChange={(value): void => handleUpdateStaking('tokenContractAddress', value)}
              />
              <AccountValidStatus address={data.staking?.tokenContractAddress ?? ''} style={{ flex: '0 0 52px' }} />
            </FlexBox>
          </CardWrapper>
        )}
      </FlexBox>
    )
  }
  /**
   * @type multisig
   * @returns
   */
  const renderMultisigGroupMembership = (): JSX.Element => {
    const handleUpdateMembership = (membershipIdx: number, key: string, value: any): void => {
      setData((pre) => ({
        ...pre,
        memberships: pre.memberships?.map((membership, i) => {
          if (membershipIdx === i) {
            return { ...membership, [key]: value }
          }
          return membership
        }),
      }))
    }
    const handleAddMember = (membershipIdx: number): void => {
      const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
      handleUpdateMembership(membershipIdx, 'members', [...members, ''])
    }
    const handleUpdateMember = (membershipIdx: number, memberIdx: number, value: string): void => {
      const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
      handleUpdateMembership(
        membershipIdx,
        'members',
        members.map((item, index) => {
          if (index === memberIdx) {
            return value
          }
          return item
        }),
      )
    }
    const handleRemoveMember = (membershipIdx: number, memberIdx: number): void => {
      const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
      if (members.length === 1) {
        handleUpdateMembership(membershipIdx, 'members', [''])
      } else {
        handleUpdateMembership(
          membershipIdx,
          'members',
          members.filter((item, index) => memberIdx !== index),
        )
      }
    }
    return (
      <FlexBox direction='column' gap={7} marginBottom={7} width={'100%'}>
        {/* Multisig Group Membership */}
        <CardWrapper direction='column' gap={5}>
          <FlexBox gap={2} alignItems='center'>
            <ProfileIcon />
            <Typography size='xl' weight='medium'>
              Multisig Group Membership
            </Typography>
          </FlexBox>
          <FlexBox direction='column' gap={5}>
            <Typography size='xl' weight='medium'>
              Members
            </Typography>
            <FlexBox direction='column' gap={4} width='100%'>
              {data.memberships[0].members.map((member, memberIdx) => (
                <FlexBox key={memberIdx} alignItems='center' gap={4} width='100%'>
                  <InputWithLabel
                    height={inputHeight + 'px'}
                    label='Member Account Address or Name'
                    inputValue={member}
                    handleChange={(value): void => handleUpdateMember(0, memberIdx, value)}
                  />
                  <AccountValidStatus address={member} style={{ flex: '0 0 52px' }} />
                  <Button
                    variant='grey900'
                    size='custom'
                    width={52}
                    height={48}
                    style={{ flex: '0 0 52px' }}
                    onClick={(): void => handleRemoveMember(0, memberIdx)}
                  >
                    <BinIcon />
                  </Button>
                </FlexBox>
              ))}
              <Button size='custom' width={230} height={48} onClick={(): void => handleAddMember(0)}>
                <FlexBox alignItems='center' gap={2}>
                  <PlusIcon color={theme.ixoWhite} />
                  Add Account
                </FlexBox>
              </Button>
            </FlexBox>
          </FlexBox>
        </CardWrapper>
        {/* Passing Threshold */}
        <CardWrapper direction='column' gap={5} marginBottom={7}>
          <FlexBox alignItems='center' gap={2}>
            <ThresholdIcon />
            <Typography size='xl' weight='medium'>
              Passing Threshold
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={4}>
            <InputWithLabel
              label='Minimum Number of Signatories'
              height={inputHeight + 'px'}
              inputValue={''}
              handleChange={(value): void => {
                // TODO:
              }}
              width='50%'
            />
            <Typography size='xl'>of {data.memberships[0].members.filter(Boolean).length ?? 0} accounts</Typography>
          </FlexBox>
        </CardWrapper>
      </FlexBox>
    )
  }
  const renderVotingDuration = (): JSX.Element => {
    return (
      <CardWrapper direction='column' gap={5}>
        <FlexBox alignItems='center' gap={2}>
          <SandClockIcon />
          <Typography size='xl' weight='medium'>
            Voting Duration
          </Typography>
        </FlexBox>
        <FlexBox>
          <Typography size='md'>
            The duration for which proposals are open for voting. A low proposal duration may increase the speed at
            which your DAO can pass proposals. Setting the duration too low may make it difficult for proposals to pass
            as voters will have limited time to vote. After this time elapses, the proposal will either pass or fail.
          </Typography>
        </FlexBox>
        <FlexBox alignItems='center' justifyContent='flex-end' gap={4}>
          <NumberCounter
            direction='row-reverse'
            width='200px'
            height={inputHeight + 'px'}
            value={data.proposalDuration}
            onChange={(value: number): void => setData((pre) => ({ ...pre, proposalDuration: value }))}
          />
          <Typography weight='medium' size='xl'>
            <SimpleSelect
              value={data.proposalDurationUnits}
              options={['seconds', 'minutes', 'hours', 'days', 'weeks']}
              onChange={(value) =>
                setData((pre) => ({
                  ...pre,
                  proposalDurationUnits: value as 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds',
                }))
              }
            />
          </Typography>
        </FlexBox>
      </CardWrapper>
    )
  }
  const renderAdvancedSwitch = (): JSX.Element => {
    return (
      <FlexBox marginTop={15} marginBottom={15}>
        <Switch onLabel='Show Advanced Settings' value={showAdvanced} onChange={setShowAdvanced} />
      </FlexBox>
    )
  }
  const renderAdvancedSettings = (): JSX.Element => {
    return (
      <FlexBox direction='column' gap={7}>
        {/* Allow Vote Switching */}
        <CardWrapper direction='column' gap={5}>
          <FlexBox alignItems='center' gap={2}>
            <VoteSwitchingIcon />
            <Typography size='xl' weight='medium'>
              Allow Vote Switching
            </Typography>
          </FlexBox>
          <FlexBox>
            <Typography size='md'>
              Members will be allowed to change their vote before the voting deadline has expired. This will result in
              all proposals having to complete the full voting duration, even if consensus is reached early.
            </Typography>
          </FlexBox>
          <FlexBox justifyContent='flex-end'>
            <Switch
              onLabel='YES'
              offLabel='NO'
              value={data.allowRevoting}
              onChange={(value) => setData((pre) => ({ ...pre, allowRevoting: value }))}
            />
          </FlexBox>
        </CardWrapper>

        {/* Proposal Deposit */}
        <CardWrapper direction='column' gap={5}>
          <FlexBox alignItems='center' gap={2}>
            <SvgBox svgWidth={8} svgHeight={8} color='black'>
              <CoinsSolidIcon />
            </SvgBox>
            <Typography size='xl' weight='medium'>
              Proposal Deposit
            </Typography>
          </FlexBox>
          <FlexBox>
            <Typography size='md'>
              The number of tokens that must be deposited to create a proposal. Setting this may deter spam, but setting
              it too high may limit broad participation.
            </Typography>
          </FlexBox>
          <FlexBox justifyContent='flex-end'>
            <Switch
              onLabel='ENABLED'
              offLabel='DISABLED'
              value={data.depositRequired}
              onChange={(value) => setData((pre) => ({ ...pre, depositRequired: value }))}
            />
          </FlexBox>
          {data.depositRequired && (
            <>
              <FlexBox width='100%' justifyContent='flex-end' gap={2}>
                <NumberCounter
                  direction='row-reverse'
                  width='200px'
                  height={inputHeight + 'px'}
                  value={Number(data.depositInfo.amount)}
                  onChange={(value) =>
                    setData((pre) => ({ ...pre, depositInfo: { ...pre.depositInfo, amount: String(value) } }))
                  }
                />
                <Typography weight='medium' size='xl'>
                  <SimpleSelect
                    value={data.depositInfo.denomOrAddress}
                    options={['$IXO']}
                    onChange={(value) =>
                      setData((pre) => ({ ...pre, depositInfo: { ...pre.depositInfo, denomOrAddress: value } }))
                    }
                  />
                </Typography>
              </FlexBox>
              <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
                <Typography size='md'>Once a proposal completes, when should deposits be refunded?</Typography>
                <Dropdown2
                  value={data.depositInfo.refundPolicy}
                  options={[
                    [DepositRefundPolicy.Always, 'Always'],
                    [DepositRefundPolicy.OnlyPassed, 'Only passed proposals'],
                    [DepositRefundPolicy.Never, 'Never'],
                  ].map(([value, text]) => ({ value, text }))}
                  onChange={(e) =>
                    setData((pre) => ({
                      ...pre,
                      depositInfo: { ...pre.depositInfo, refundPolicy: e.target.value as DepositRefundPolicy },
                    }))
                  }
                  wrapperStyle={{ width: '320px' }}
                  style={{ height: '48px', textAlign: 'center' }}
                />
              </FlexBox>
            </>
          )}
        </CardWrapper>

        {/* Passing Threshold */}
        {data.type !== 'multisig' && (
          <CardWrapper direction='column' gap={5}>
            <FlexBox alignItems='center' gap={2}>
              <ThresholdIcon />
              <Typography size='xl' weight='medium'>
                Passing Threshold
              </Typography>
            </FlexBox>
            <FlexBox>
              <Typography size='md'>
                A majority passing threshold is recommended. Without a majority threshold, the quorum is set by those
                who voted. A proposal could therefore pass with only a minority of the group voting ‘yes.’ With a
                majority threshold, as least 50% of the whole group must vote ‘yes’.
              </Typography>
            </FlexBox>
            <FlexBox justifyContent='flex-end'>
              <FlexBox gap={4}>
                {data.thresholdType === '%' && (
                  <NumberCounter
                    direction='row-reverse'
                    width='200px'
                    height={inputHeight + 'px'}
                    value={data.thresholdPercentage! * 100}
                    onChange={(value) => setData((pre) => ({ ...pre, thresholdPercentage: value / 100 }))}
                  />
                )}
                <Typography weight='medium' size='xl'>
                  <SimpleSelect
                    value={data.thresholdType}
                    options={['%', 'majority']}
                    onChange={(value) =>
                      setData((pre) => ({ ...pre, thresholdType: value as '%' | 'majority', thresholdPercentage: 0.2 }))
                    }
                  />
                </Typography>
              </FlexBox>
            </FlexBox>
          </CardWrapper>
        )}

        {/* Quorum */}
        <CardWrapper direction='column' gap={5}>
          <FlexBox alignItems='center' gap={2}>
            <SandClockIcon />
            <Typography size='xl' weight='medium'>
              Quorum
            </Typography>
          </FlexBox>
          <FlexBox>
            <Typography size='md'>
              The minimum percentage of voting power that must vote on a proposal for it to be considered a valid vote.
              If the group has many inactive members, setting this value too high may make it difficult to pass
              proposals.
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' justifyContent='flex-end' gap={4}>
            <FlexBox gap={4}>
              {data.quorumType === '%' && (
                <NumberCounter
                  direction='row-reverse'
                  width='200px'
                  height={inputHeight + 'px'}
                  value={data.quorumPercentage! * 100}
                  onChange={(value) => setData((pre) => ({ ...pre, quorumPercentage: value / 100 }))}
                />
              )}
              <Typography weight='medium' size='xl'>
                <SimpleSelect
                  value={data.quorumType}
                  options={['%', 'majority']}
                  onChange={(value) =>
                    setData((pre) => ({ ...pre, quorumType: value as '%' | 'majority', quorumPercentage: 0.2 }))
                  }
                />
              </Typography>
            </FlexBox>
          </FlexBox>
        </CardWrapper>

        {/* Proposal Submission Policy */}
        <CardWrapper direction='column' gap={5}>
          <FlexBox alignItems='center' gap={2}>
            <VoteSwitchingIcon />
            <Typography size='xl' weight='medium'>
              Proposal Submission Policy
            </Typography>
          </FlexBox>
          <FlexBox>
            <Typography size='md'>Who is allowed to submit proposals to the DAO?</Typography>
          </FlexBox>
          <FlexBox justifyContent='flex-end'>
            <Dropdown2
              value={String(data.anyoneCanPropose)}
              options={[
                ['false', 'Only members'],
                ['true', 'Anyone'],
              ].map(([value, text]) => ({ value, text }))}
              onChange={(e) => setData((pre) => ({ ...pre, anyoneCanPropose: e.target.value === 'true' }))}
              wrapperStyle={{ width: '320px' }}
              style={{ height: '48px', textAlign: 'center' }}
            />
          </FlexBox>
        </CardWrapper>
      </FlexBox>
    )
  }
  const renderActions = (): JSX.Element => {
    // TODO: add more validation
    const canContinue = data.name && data.description
    return (
      <FlexBox alignItems='center' width='100%' gap={7} marginTop={7}>
        <Button variant='grey700' style={{ width: '100%' }} onClick={onBack}>
          Back
        </Button>
        <Button disabled={!canContinue} style={{ width: '100%' }} loading={submitting} onClick={handleSubmit}>
          Create Group
        </Button>
      </FlexBox>
    )
  }
  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' width={deviceWidth.tablet + 'px'}>
        {renderGroupIdentity()}
        {data.type === 'membership' && renderGroupMemberships()}
        {data.type === 'staking' && renderStaking()}
        {data.type === 'multisig' && renderMultisigGroupMembership()}
        {renderVotingDuration()}
        {renderAdvancedSwitch()}
        {showAdvanced && renderAdvancedSettings()}
        {renderActions()}
      </FlexBox>
    </FlexBox>
  )
}

export default SetupGroupSettings
