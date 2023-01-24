import { FlexBox, theme } from 'components/App/App.styles'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { TDAOGroupModel } from 'types/protocol'
import { CardWrapper, PlusIcon } from './SetupGroupSettings.styles'
import { Typography } from 'components/Typography'
import { Button, InputWithLabel, NumberCounter, Switch, TextArea } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as BinIcon } from 'assets/images/icon-bin-lg.svg'
import { ReactComponent as CopyIcon } from 'assets/images/icon-copy.svg'
import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock.svg'
import { ReactComponent as VoteSwitchingIcon } from 'assets/images/icon-vote-switching.svg'
import { ReactComponent as TresholdIcon } from 'assets/images/icon-treshold.svg'
import { ReactComponent as TokenContractIcon } from 'assets/images/icon-token-contract.svg'

const initialMembership = { category: '', weightPerMember: 0, members: [''] }
const initialStakingDistribution = { category: '', totalSupplyPercent: 0, members: [''] }
const defaultVotingDuration = { amount: 1, unit: 'day' }
const defaultVoteSwitching = false
const defaultPassingTreshold = 'Majority'
const defaultQuorum = 20
const inputHeight = 48

interface Props {
  id: string
  onBack: () => void
  onContinue: (data: TDAOGroupModel) => void
}

const SetupGroupSettings: React.FC<Props> = ({ id, onBack, onContinue }): JSX.Element => {
  const { daoGroups } = useCreateEntityState()
  const [data, setData] = useState<TDAOGroupModel>({ id, type: daoGroups[id].type })
  const [useExistingToken, setUseExistingToken] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }

    const type = daoGroups[id].type
    const data = {
      name: daoGroups[id].name ?? '',
      description: daoGroups[id].description ?? '',
      votingDuration: daoGroups[id].votingDuration ?? defaultVotingDuration,
      voteSwitching: daoGroups[id].voteSwitching ?? defaultVoteSwitching,
      passingTreshold: daoGroups[id].passingTreshold ?? defaultPassingTreshold,
      quorum: daoGroups[id].quorum ?? defaultQuorum,
    }
    switch (type) {
      case 'membership':
        setData((pre) => ({ ...pre, ...data, memberships: daoGroups[id].memberships ?? [initialMembership] }))
        break
      case 'staking': {
        const staking = daoGroups[id].staking
        if (!staking?.tokenContractAddress) {
          setData((pre) => ({
            ...pre,
            ...data,
            staking: {
              tokenSymbol: staking?.tokenSymbol,
              tokenName: staking?.tokenName,
              tokenSupply: staking?.tokenSupply,
              treasuryPercent: staking?.treasuryPercent,
              distributions: staking?.distributions ?? [initialStakingDistribution],
            },
          }))
          setUseExistingToken(false)
        } else {
          setData((pre) => ({ ...pre, ...data, staking: { tokenContractAddress: staking?.tokenContractAddress } }))
          setUseExistingToken(true)
        }
        break
      }
      case 'multisig':
        setData((pre) => ({ ...pre, ...data, multisigMembers: daoGroups[id].multisigMembers ?? [''] }))
        break
      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
            placeholder='Short Description'
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
        {(data.memberships ?? []).map((membership, membershipIdx) => (
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
                  value={membership.weightPerMember ?? 0}
                  onChange={(value): void => handleUpdateMembership(membershipIdx, 'weightPerMember', value)}
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
                      // style={{ flexGrow: 1 }}
                    />
                    <CopyToClipboard text={member}>
                      <Button
                        variant='primary'
                        size='custom'
                        width={52}
                        height={48}
                        style={{ flex: '0 0 52px' }}
                        onClick={(): void => {
                          //
                        }}
                      >
                        <CopyIcon />
                      </Button>
                    </CopyToClipboard>
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
                    Add Member
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
                <NumberCounter
                  height={inputHeight + 'px'}
                  label='Treasury Percent'
                  value={data.staking?.treasuryPercent ?? 0}
                  onChange={(value): void => handleUpdateStaking('treasuryPercent', value)}
                />
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
                        <CopyToClipboard text={member}>
                          <Button
                            variant='primary'
                            size='custom'
                            width={52}
                            height={48}
                            style={{ flex: '0 0 52px' }}
                            onClick={(): void => {
                              //
                            }}
                          >
                            <CopyIcon />
                          </Button>
                        </CopyToClipboard>
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
                        Add Member
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
            <FlexBox>
              <InputWithLabel
                height={inputHeight + 'px'}
                label='Enter ixo Address'
                inputValue={data.staking?.tokenContractAddress}
                handleChange={(value): void => handleUpdateStaking('tokenContractAddress', value)}
              />
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
    const handleAddMultisigMember = (): void => {
      setData((pre) => ({ ...pre, multisigMembers: [...(pre.multisigMembers ?? []), ''] }))
    }
    const handleUpdateMultisigMember = (memberIdx: number, value: string): void => {
      setData((pre) => ({
        ...pre,
        multisigMembers: (pre.multisigMembers ?? ['']).map((member, i) => {
          if (memberIdx === i) {
            return value
          }
          return member
        }),
      }))
    }
    const handleRemoveMultisigMember = (memberIdx: number): void => {
      if (data.multisigMembers?.length !== 1) {
        setData((pre) => ({ ...pre, multisigMembers: pre.multisigMembers?.filter((member, i) => i !== memberIdx) }))
      } else {
        setData((pre) => ({ ...pre, multisigMembers: [''] }))
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
              {(data.multisigMembers ?? ['']).map((member, memberIdx) => (
                <FlexBox key={memberIdx} alignItems='center' gap={4} width='100%'>
                  <InputWithLabel
                    height={inputHeight + 'px'}
                    label='Member Account Address or Name'
                    inputValue={member}
                    handleChange={(value): void => handleUpdateMultisigMember(memberIdx, value)}
                    // style={{ flexGrow: 1 }}
                  />
                  <CopyToClipboard text={member}>
                    <Button
                      variant='primary'
                      size='custom'
                      width={52}
                      height={48}
                      style={{ flex: '0 0 52px' }}
                      onClick={(): void => {
                        //
                      }}
                    >
                      <CopyIcon />
                    </Button>
                  </CopyToClipboard>
                  <Button
                    variant='grey900'
                    size='custom'
                    width={52}
                    height={48}
                    style={{ flex: '0 0 52px' }}
                    onClick={(): void => handleRemoveMultisigMember(memberIdx)}
                  >
                    <BinIcon />
                  </Button>
                </FlexBox>
              ))}
              <Button size='custom' width={230} height={48} onClick={handleAddMultisigMember}>
                <FlexBox alignItems='center' gap={2}>
                  <PlusIcon color={theme.ixoWhite} />
                  Add a Member
                </FlexBox>
              </Button>
            </FlexBox>
          </FlexBox>
        </CardWrapper>
        {/* Passing Treshold */}
        <CardWrapper direction='column' gap={5} marginBottom={7}>
          <FlexBox alignItems='center' gap={2}>
            <TresholdIcon />
            <Typography size='xl' weight='medium'>
              Passing Threshold
            </Typography>
          </FlexBox>
          <FlexBox alignItems='center' gap={4}>
            <InputWithLabel
              label='Minimum Number of Signatories'
              height={inputHeight + 'px'}
              inputValue={data.passingTreshold}
              handleChange={(value): void => setData((pre) => ({ ...pre, passingTreshold: value }))}
              width='50%'
            />
            <Typography size='xl'>out of total {data.multisigMembers?.length ?? 0} members</Typography>
          </FlexBox>
        </CardWrapper>
      </FlexBox>
    )
  }
  const renderVotingDuration = (): JSX.Element => {
    const handleUpdateVoting = (key: string, value: number): void => {
      setData((pre) => ({ ...pre, votingDuration: { ...pre?.votingDuration, [key]: value } }))
    }
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
            value={data.votingDuration?.amount ?? 0}
            onChange={(value: number): void => handleUpdateVoting('amount', value)}
          />
          <FlexBox
            alignItems='center'
            justifyContent='center'
            width={200 + 'px'}
            height={inputHeight + 'px'}
            style={{ borderRadius: '0.5rem', border: `1px solid ${theme.ixoNewBlue}` }}
          >
            <Typography weight='medium' size='xl'>
              {data.votingDuration?.unit}
            </Typography>
          </FlexBox>
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
    const handleUpdateVoteSwitching = (value: boolean): void => {
      setData((pre) => ({ ...pre, voteSwitching: value }))
    }
    const handleUpdateQuorum = (value: number): void => {
      setData((pre) => ({ ...pre, quorum: value }))
    }
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
              value={data.voteSwitching ?? false}
              onChange={handleUpdateVoteSwitching}
            />
          </FlexBox>
        </CardWrapper>

        {/* Passing Threshold */}
        {data.type !== 'multisig' && (
          <CardWrapper direction='column' gap={5}>
            <FlexBox alignItems='center' gap={2}>
              <TresholdIcon />
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
              <FlexBox
                alignItems='center'
                justifyContent='center'
                width={200 + 'px'}
                height={inputHeight + 'px'}
                style={{ borderRadius: '0.5rem', border: `1px solid ${theme.ixoNewBlue}` }}
              >
                <Typography weight='medium' size='xl'>
                  {data.passingTreshold}
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
            <NumberCounter
              direction='row-reverse'
              width='200px'
              height={inputHeight + 'px'}
              value={data.quorum ?? 0}
              onChange={handleUpdateQuorum}
            />
            <FlexBox
              alignItems='center'
              justifyContent='center'
              width={200 + 'px'}
              height={inputHeight + 'px'}
              style={{ borderRadius: '0.5rem', border: `1px solid ${theme.ixoNewBlue}` }}
            >
              <Typography weight='medium' size='xl'>
                %
              </Typography>
            </FlexBox>
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
        <Button disabled={!canContinue} style={{ width: '100%' }} onClick={(): void => onContinue(data)}>
          Continue
        </Button>
      </FlexBox>
    )
  }
  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' width={theme.breakpoints.md + 'px'}>
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
