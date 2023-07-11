import { FlexBox, SvgBox } from 'components/App/App.styles'
import React, { useEffect, useMemo, useState } from 'react'
import { TDAOGroupModel } from 'types/protocol'
import { CardWrapper, PlusIcon } from './SetupGroupSettings.styles'
import { Typography } from 'components/Typography'
import {
  AccountValidStatus,
  Button,
  Dropdown2,
  IconUpload,
  InputWithLabel,
  NumberCounter,
  SimpleSelect,
  Switch,
  TextArea,
} from 'pages/CreateEntity/Components'
import { useCreateEntity } from 'hooks/createEntity'
import { ReactComponent as InfoIcon } from 'assets/images/icon-info.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/icon-profile.svg'
import { ReactComponent as BinIcon } from 'assets/images/icon-bin-lg.svg'
import { ReactComponent as FileUploadIcon } from 'assets/images/icon-file-upload-solid.svg'
import { ReactComponent as SandClockIcon } from 'assets/images/icon-sandclock.svg'
import { ReactComponent as VoteSwitchingIcon } from 'assets/images/icon-vote-switching.svg'
import { ReactComponent as CoinsSolidIcon } from 'assets/images/icon-coins-solid.svg'
import { ReactComponent as ThresholdIcon } from 'assets/images/icon-threshold.svg'
import { ReactComponent as TokenContractIcon } from 'assets/images/icon-token-contract.svg'
import { ReactComponent as CalendarIcon } from 'assets/images/icon-calendar.svg'
import { deviceWidth } from 'constants/device'
import { DurationUnits, Member } from 'types/dao'
import * as Toast from 'utils/toast'
import * as _ from 'lodash'
import Tooltip from 'components/Tooltip/Tooltip'
import { isAccountAddress, validateTokenSymbol } from 'utils/validation'
import {
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  convertMicroDenomToDenomWithDecimals,
  durationWithUnitsToSeconds,
} from 'utils/conversions'
import { NATIVE_DECIMAL, NATIVE_MICRODENOM } from 'constants/chains'
import { useTheme } from 'styled-components'
import BigNumber from 'bignumber.js'
import type {
  CheckedDepositInfo,
  DepositRefundPolicy,
} from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import {} from '@ixo/impactxclient-sdk/types/codegen/DaoMigrator.types'
import { PercentageThreshold } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalCondorcet.types'
import { initialMembers } from './SetupDAOGroups'
import { LogoInfo } from '@ixo/impactxclient-sdk/types/codegen/Cw20Base.types'

const inputHeight = 48

interface Props {
  daoGroup: TDAOGroupModel
  onBack?: () => void
  onSubmit: (data: TDAOGroupModel) => void
}

const SetupGroupSettings: React.FC<Props> = ({ daoGroup, onBack, onSubmit }): JSX.Element => {
  const theme: any = useTheme()
  const { CreateDAOCoreByGroupId } = useCreateEntity()
  const [data, setData] = useState<TDAOGroupModel>(daoGroup)
  const [useExistingToken, setUseExistingToken] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [memberships, setMemberships] = useState<
    {
      category?: string
      weight: number
      members: string[]
    }[]
  >([])

  useEffect(() => {
    setData(daoGroup)
  }, [daoGroup])

  // useEffect(() => {
  //   const members: Member[] = []
  //   memberships.forEach((membership) => {
  //     membership.members.forEach((member) => {
  //       members.push({ addr: member, weight: membership.weight })
  //     })
  //   })
  //   setData((v) => ({
  //     ...v,
  //     votingModule: { ...v.votingModule, members: members.length === 0 ? initialMembers : members },
  //   }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(memberships)])

  // useEffect(() => {
  //   const _memberships: {
  //     [weight: number]: {
  //       category?: string
  //       weight: number
  //       members: string[]
  //     }
  //   } = {}
  //   data.votingModule.members.forEach((member) => {
  //     if (_memberships[member.weight]) {
  //       _memberships[member.weight].members = [..._memberships[member.weight].members, member.addr]
  //     } else {
  //       _memberships[member.weight] = {
  //         category: Object.values(memberships).find(({ weight }) => weight === member.weight)?.category || '',
  //         weight: member.weight,
  //         members: [member.addr],
  //       }
  //     }
  //   })
  //   setMemberships(Object.values(_memberships))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(data.votingModule.members)])

  const valid: boolean = useMemo(() => {
    switch (data.type) {
      case 'membership':
      case 'multisig': {
        if (!data.config.name || !data.config.description) {
          setErrMsg('Group Name & Description Required')
          return false
        }
        // check invalid account address
        if (data.votingModule.members.some(({ addr }) => !isAccountAddress(addr))) {
          setErrMsg('Invalid Address Detected')
          return false
        }
        // check duplication
        if (data.votingModule.members.map(({ addr }) => addr).some((dist) => new Set(dist).size !== dist.length)) {
          setErrMsg('Duplicate Address Detected')
          return false
        }
        setErrMsg('')
        return true
      }
      case 'staking': {
        // if (useExistingToken && !data.token.tokenContractAddress) {
        //   setErrMsg('Token Contract Address Required')
        //   return false
        // }
        if (!data.config.name || !data.config.description) {
          setErrMsg('Group Name & Description Required')
          return false
        }
        if (!data.token?.tokenInfo.symbol || !data.token?.tokenInfo.name) {
          setErrMsg('Token Symbol & Name Required')
          return false
        }
        // check distribution percentage 100%
        const totalTokenDistributionPercentage = data.votingModule.members.reduce(
          (acc, cur) => new BigNumber(acc).plus(new BigNumber(cur.weight)),
          new BigNumber(0),
        )
        if (
          new BigNumber(totalTokenDistributionPercentage).plus(
            new BigNumber(data.token?.tokenInfo.initial_supply || 0),
          ) !== new BigNumber(data.token?.tokenInfo.total_supply)
        ) {
          const currentSumPercent = new BigNumber(totalTokenDistributionPercentage)
            .plus(new BigNumber(data.token?.tokenInfo.initial_supply || 0))
            .dividedBy(new BigNumber(data.token?.tokenInfo.total_supply))
            .multipliedBy(new BigNumber(100))
          setErrMsg(
            `Total token distribution percentage must equal 100%, but it currently sums to ${currentSumPercent}%.`,
          )
          return false
        }
        // check invalid account address
        if (data.votingModule.members.some(({ addr }) => !isAccountAddress(addr))) {
          setErrMsg('Invalid Address Detected')
          return false
        }
        // check duplication
        if (data.votingModule.members.map(({ addr }) => addr).some((dist) => new Set(dist).size !== dist.length)) {
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
  }, [data])

  const handlePreCheck = () => {
    // precheck memberships
  }

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true)

    const daoCoreAddresss = await CreateDAOCoreByGroupId(data)
    if (!daoCoreAddresss) {
      Toast.errorToast(null, `Create Group Failed`)
      setSubmitting(false)
      return
    } else {
      Toast.successToast(null, `Create Group Succeed`)
      setSubmitting(false)
      console.log({ daoCoreAddresss })
    }
    onSubmit({ ...data, coreAddress: daoCoreAddresss })
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
            inputValue={data.config.name || ''}
            handleChange={(value): void => setData((pre) => ({ ...pre, config: { ...pre.config, name: value } }))}
          />
        </FlexBox>
        <FlexBox>
          <TextArea
            height='100px'
            label='Short Description'
            inputValue={data.config.description || ''}
            handleChange={(value): void =>
              setData((pre) => ({ ...pre, config: { ...pre.config, description: value } }))
            }
          />
        </FlexBox>
      </CardWrapper>
    )
  }
  // /**
  //  * @type membership
  //  * @returns
  //  */
  const GroupMemberships = (): JSX.Element => {
    const handleAddMembership = (): void => {
      const maxWeight = _.max(data.votingModule.members.map(({ weight }) => weight))
      setMemberships((v) => [...v, { category: '', weight: Number(maxWeight) + 1, members: [] }])
    }
    const handleUpdateMembership = (membershipIdx: number, key: string, value: any): void => {
      if (key === 'weight') {
        if (data.votingModule.members.map(({ weight }) => weight).includes(value)) {
          return
        }
      }
      setMemberships((v) =>
        v.map((membership, i) => {
          if (membershipIdx === i) {
            return { ...membership, [key]: value }
          }
          return membership
        }),
      )
    }
    const handleRemoveMembership = (membershipIdx: number): void => {
      if (memberships.length !== 1) {
        setMemberships((v) => v.filter((item, i) => membershipIdx !== i))
      } else {
        setMemberships([{ category: '', weight: 1, members: [] }])
      }
    }
    const handleAddMember = (membershipIdx: number): void => {
      const members = memberships[membershipIdx]?.members ?? ['']
      handleUpdateMembership(membershipIdx, 'members', [...members, ''])
    }
    const attachMembers = (membershipIdx: number, addresses: string[]): void => {
      const members = memberships[membershipIdx]?.members ?? ['']
      handleUpdateMembership(membershipIdx, 'members', _.union(members.concat(addresses)))
    }
    const handleUpdateMember = (membershipIdx: number, memberIdx: number, value: string): void => {
      const members = memberships[membershipIdx]?.members ?? ['']
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
      const members = memberships[membershipIdx]?.members ?? ['']
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
    const handleImportCsv = (membershipIdx: number) => () => {
      const fileUploadEl = document.getElementById(`csv-file-input-${membershipIdx}`)
      if (fileUploadEl) {
        fileUploadEl.click()
      }
    }
    const handleFileChange = (membershipIdx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files![0]
        const fileReader = new FileReader()
        fileReader.onload = function (event: any) {
          const csvOutput = event.target.result
          const addresses = csvOutput.split('\n').filter(Boolean)
          attachMembers(membershipIdx, addresses)
        }
        fileReader.readAsText(file)
      } catch (e) {
        //
        console.error('handleFileChange', e)
      }
    }
    return (
      <FlexBox direction='column' width='100%' gap={7} marginBottom={7}>
        {memberships.map((membership, membershipIdx) => (
          <CardWrapper direction='column' gap={5} key={membershipIdx}>
            <FlexBox justifyContent='space-between' alignItems='center'>
              <FlexBox gap={2} alignItems='center'>
                <ProfileIcon />
                <Typography size='xl' weight='medium'>
                  Group Membership
                </Typography>
              </FlexBox>
              <FlexBox gap={4}>
                <input
                  style={{ display: 'none' }}
                  type={'file'}
                  id={`csv-file-input-${membershipIdx}`}
                  accept={'.csv'}
                  onChange={handleFileChange(membershipIdx)}
                />
                <Button variant='primary' size='custom' width={52} height={48} onClick={handleImportCsv(membershipIdx)}>
                  <SvgBox color='white'>
                    <FileUploadIcon />
                  </SvgBox>
                </Button>
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
            </FlexBox>
            <FlexBox direction='column' gap={5}>
              <FlexBox gap={2} alignItems='center'>
                <Typography size='xl' weight='medium'>
                  Categories
                </Typography>
                <Tooltip
                  text={`The "class" of member. For example: "Core developers" or "friends and family." These names are only for your reference.`}
                  width='20rem'
                >
                  <SvgBox color='black' svgWidth={5} svgHeight={5} cursor='pointer'>
                    <InfoIcon />
                  </SvgBox>
                </Tooltip>
              </FlexBox>
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
                <Button
                  size='flex'
                  textTransform='none'
                  height={48}
                  onClick={(): void => handleAddMember(membershipIdx)}
                >
                  <FlexBox alignItems='center' gap={2}>
                    <PlusIcon color={theme.ixoWhite} />
                    Add a Member
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
  // /**
  //  * @type staking
  //  * @returns
  //  */
  const Staking = (): JSX.Element => {
    // const handleUpdateStaking = (key: string, value: any): void => {
    //   setData((pre) => ({ ...pre, staking: { ...(pre.staking ?? initialStaking), [key]: value } }))
    // }
    // const handleAddMembership = (): void => {
    //   setData((pre) => ({ ...pre, memberships: [...(pre.memberships ?? []), initialMembership] }))
    // }
    // const handleUpdateMembership = (membershipIdx: number, key: string, value: any): void => {
    //   setData((pre) => ({
    //     ...pre,
    //     memberships: pre.memberships?.map((membership, i) => {
    //       if (membershipIdx === i) {
    //         return { ...membership, [key]: value }
    //       }
    //       return membership
    //     }),
    //   }))
    // }
    // const handleRemoveMembership = (distributionIdx: number): void => {
    //   if (data.memberships.length !== 1) {
    //     setData((pre) => ({ ...pre, memberships: pre.memberships?.filter((item, i) => distributionIdx !== i) }))
    //   } else {
    //     setData((pre) => ({ ...pre, memberships: [initialMembership] }))
    //   }
    // }
    // const handleAddMember = (membershipIdx: number): void => {
    //   const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
    //   handleUpdateMembership(membershipIdx, 'members', [...members, ''])
    // }
    // // const attachMembers = (membershipIdx: number, addresses: string[]): void => {
    // //   const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
    // //   handleUpdateMembership(membershipIdx, 'members', _.union(members.concat(addresses)))
    // // }
    // const handleUpdateMember = (membershipIdx: number, memberIdx: number, value: string): void => {
    //   const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
    //   handleUpdateMembership(
    //     membershipIdx,
    //     'members',
    //     members.map((item, index) => {
    //       if (index === memberIdx) {
    //         return value
    //       }
    //       return item
    //     }),
    //   )
    // }
    // const handleRemoveMember = (membershipIdx: number, memberIdx: number): void => {
    //   const members = data.memberships[membershipIdx]?.members ?? ['']
    //   if (members.length === 1) {
    //     handleUpdateMembership(membershipIdx, 'members', [''])
    //   } else {
    //     handleUpdateMembership(
    //       membershipIdx,
    //       'members',
    //       members.filter((item, index) => memberIdx !== index),
    //     )
    //   }
    // }
    const handleAddMembership = (): void => {
      const newWeight = (Number(data.token?.tokenInfo.total_supply ?? 0) / 100) * 10
      setMemberships((v) => [...v, { category: '', weight: newWeight, members: [] }])
    }
    const handleUpdateMembership = (membershipIdx: number, key: string, value: any): void => {
      if (key === 'weight') {
        if (data.votingModule.members.map(({ weight }) => weight).includes(value)) {
          return
        }
      }
      setMemberships((v) =>
        v.map((membership, i) => {
          if (membershipIdx === i) {
            return { ...membership, [key]: value }
          }
          return membership
        }),
      )
    }
    const handleRemoveMembership = (membershipIdx: number): void => {
      if (memberships.length !== 1) {
        setMemberships((v) => v.filter((item, i) => membershipIdx !== i))
      } else {
        const newWeight = (Number(data.token?.tokenInfo.total_supply ?? 0) / 100) * 10
        setMemberships([{ category: '', weight: newWeight, members: [] }])
      }
    }
    const handleAddMember = (membershipIdx: number): void => {
      const members = memberships[membershipIdx]?.members ?? ['']
      handleUpdateMembership(membershipIdx, 'members', [...members, ''])
    }
    const attachMembers = (membershipIdx: number, addresses: string[]): void => {
      const members = memberships[membershipIdx]?.members ?? ['']
      handleUpdateMembership(membershipIdx, 'members', _.union(members.concat(addresses)))
    }
    const handleUpdateMember = (membershipIdx: number, memberIdx: number, value: string): void => {
      const members = memberships[membershipIdx]?.members ?? ['']
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
      const members = memberships[membershipIdx]?.members ?? ['']
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
    const makeValidationMessage = (): { status: boolean; message: string } => {
      /**
       * If typed token symbol is not valid type
       */
      if (typeof validateTokenSymbol(data.token?.tokenInfo.symbol || '') === 'string') {
        return {
          status: false,
          message: validateTokenSymbol(data.token?.tokenInfo.symbol || '') as string,
        }
      }

      const treasuryPercent = data.staking?.treasuryPercent ?? 0
      const totalTokenDistributionPercentage = data.memberships.reduce((acc, cur) => acc + cur.weight, 0)

      if (treasuryPercent + totalTokenDistributionPercentage !== 100) {
        return {
          status: false,
          message: `Total token distribution percentage must equal 100%, but it currently sums to ${
            treasuryPercent + totalTokenDistributionPercentage
          }%.`,
        }
      }
      return {
        status: true,
        message: `${Number(data.staking?.tokenSupply).toLocaleString()} tokens will be minted. ${
          100 - (data.staking?.treasuryPercent ?? 0)
        }% will be sent to members according to the distribution below. The remaining ${
          data.staking?.treasuryPercent
        }% will go to the Group's treasury, where they can be distributed later via governance proposals.`,
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
                setData((v) =>
                  v.token?.config
                    ? { ...v, token: { ...v.token, config: { ...v.token?.config, token_address: '' } } }
                    : v,
                )
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
              <FlexBox width='100%' gap={5} alignItems='center'>
                <IconUpload
                  icon={(data.token?.marketingInfo.logo as { url: string })?.url}
                  sizeInPX={120}
                  placeholder='Token Icon'
                  handleChange={(value): void =>
                    setData((v) =>
                      v.token
                        ? {
                            ...v,
                            token: {
                              ...v.token,
                              marketingInfo: {
                                ...v.token.marketingInfo,
                                logo: { url: value },
                              },
                            },
                          }
                        : v,
                    )
                  }
                />
              </FlexBox>
              <FlexBox gap={5}>
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Token Symbol'
                  inputValue={data.token?.tokenInfo.symbol}
                  handleChange={(value): void =>
                    setData((v) =>
                      v.token
                        ? {
                            ...v,
                            token: {
                              ...v.token,
                              tokenInfo: {
                                ...v.token.tokenInfo,
                                symbol: value,
                              },
                            },
                          }
                        : v,
                    )
                  }
                />
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Token Name'
                  inputValue={data.token?.tokenInfo.name}
                  handleChange={(value): void =>
                    setData((v) =>
                      v.token
                        ? {
                            ...v,
                            token: {
                              ...v.token,
                              tokenInfo: {
                                ...v.token.tokenInfo,
                                name: value,
                              },
                            },
                          }
                        : v,
                    )
                  }
                />
              </FlexBox>
              <FlexBox gap={5}>
                <InputWithLabel
                  height={inputHeight + 'px'}
                  label='Token Supply'
                  inputValue={data.token?.tokenInfo.total_supply}
                  handleChange={(value): void =>
                    setData((v) =>
                      v.token
                        ? {
                            ...v,
                            token: {
                              ...v.token,
                              tokenInfo: {
                                ...v.token.tokenInfo,
                                total_supply: convertDenomToMicroDenomWithDecimals(
                                  value,
                                  v.token.tokenInfo.decimals,
                                ).toString(),
                              },
                            },
                          }
                        : v,
                    )
                  }
                />
                <FlexBox alignItems='center' gap={4} width='100%'>
                  <NumberCounter
                    height={inputHeight + 'px'}
                    label='Treasury Percent'
                    value={treasuryPercent * 100}
                    onChange={(value): void => setTreasuryPercent(Number(value) / 100)}
                  />
                  <Typography size='xl' weight='medium'>
                    %
                  </Typography>
                </FlexBox>
              </FlexBox>
              <FlexBox>
                <Typography size='md' color={makeValidationMessage().status ? 'black' : 'red'}>
                  {makeValidationMessage().message}
                </Typography>
              </FlexBox>
            </CardWrapper>

            {/* Distribution Category */}
            {data.memberships.map((distribution, distributionIdx) => (
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
                    onClick={(): void => handleRemoveMembership(distributionIdx)}
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
                      handleChange={(value): void => handleUpdateMembership(distributionIdx, 'category', value)}
                    />
                    <FlexBox alignItems='center' gap={4} width='100%'>
                      <NumberCounter
                        height={inputHeight + 'px'}
                        label='Percent of total supply'
                        value={distribution.weight}
                        onChange={(value): void => handleUpdateMembership(distributionIdx, 'weight', value)}
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
                      size='flex'
                      textTransform='none'
                      height={48}
                      onClick={(): void => handleAddMember(distributionIdx)}
                    >
                      <FlexBox alignItems='center' gap={2}>
                        <PlusIcon color={theme.ixoWhite} />
                        Add a Member
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
              onClick={handleAddMembership}
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
                inputValue={data.token?.config.token_address}
                handleChange={(value): void =>
                  setData((v) =>
                    v.token?.config
                      ? {
                          ...v,
                          token: { ...v.token, config: { ...v.token.config, token_address: value } },
                        }
                      : v,
                  )
                }
              />
              <AccountValidStatus address={data.token?.config.token_address ?? ''} style={{ flex: '0 0 52px' }} />
            </FlexBox>
          </CardWrapper>
        )}
      </FlexBox>
    )
  }
  // /**
  //  * @type multisig
  //  * @returns
  //  */
  // const renderMultisigGroupMembership = (): JSX.Element => {
  //   const handleUpdateMembership = (membershipIdx: number, key: string, value: any): void => {
  //     setData((pre) => ({
  //       ...pre,
  //       memberships: pre.memberships?.map((membership, i) => {
  //         if (membershipIdx === i) {
  //           return { ...membership, [key]: value }
  //         }
  //         return membership
  //       }),
  //     }))
  //   }
  //   const handleAddMember = (membershipIdx: number): void => {
  //     const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
  //     handleUpdateMembership(membershipIdx, 'members', [...members, ''])
  //   }
  //   const handleUpdateMember = (membershipIdx: number, memberIdx: number, value: string): void => {
  //     const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
  //     handleUpdateMembership(
  //       membershipIdx,
  //       'members',
  //       members.map((item, index) => {
  //         if (index === memberIdx) {
  //           return value
  //         }
  //         return item
  //       }),
  //     )
  //   }
  //   const handleRemoveMember = (membershipIdx: number, memberIdx: number): void => {
  //     const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
  //     if (members.length === 1) {
  //       handleUpdateMembership(membershipIdx, 'members', [''])
  //     } else {
  //       handleUpdateMembership(
  //         membershipIdx,
  //         'members',
  //         members.filter((item, index) => memberIdx !== index),
  //       )
  //     }
  //   }
  //   const handleUpdateAbsoluteThresholdCount = (value: string): void => {
  //     setData((pre) => ({ ...pre, absoluteThresholdCount: value }))
  //   }
  //   return (
  //     <FlexBox direction='column' gap={7} marginBottom={7} width={'100%'}>
  //       {/* Multisig Group Membership */}
  //       <CardWrapper direction='column' gap={5}>
  //         <FlexBox gap={2} alignItems='center'>
  //           <ProfileIcon />
  //           <Typography size='xl' weight='medium'>
  //             Multisig Group Membership
  //           </Typography>
  //         </FlexBox>
  //         <FlexBox direction='column' gap={5}>
  //           <Typography size='xl' weight='medium'>
  //             Members
  //           </Typography>
  //           <FlexBox direction='column' gap={4} width='100%'>
  //             {data.memberships[0].members.map((member, memberIdx) => (
  //               <FlexBox key={memberIdx} alignItems='center' gap={4} width='100%'>
  //                 <InputWithLabel
  //                   height={inputHeight + 'px'}
  //                   label='Member Account Address or Name'
  //                   inputValue={member}
  //                   handleChange={(value): void => handleUpdateMember(0, memberIdx, value)}
  //                 />
  //                 <AccountValidStatus address={member} style={{ flex: '0 0 52px' }} />
  //                 <Button
  //                   variant='grey900'
  //                   size='custom'
  //                   width={52}
  //                   height={48}
  //                   style={{ flex: '0 0 52px' }}
  //                   onClick={(): void => handleRemoveMember(0, memberIdx)}
  //                 >
  //                   <BinIcon />
  //                 </Button>
  //               </FlexBox>
  //             ))}
  //             <Button size='flex' textTransform='none' height={48} onClick={(): void => handleAddMember(0)}>
  //               <FlexBox alignItems='center' gap={2}>
  //                 <PlusIcon color={theme.ixoWhite} />
  //                 Add a Member
  //               </FlexBox>
  //             </Button>
  //           </FlexBox>
  //         </FlexBox>
  //       </CardWrapper>
  //       {/* Passing Threshold */}
  //       <CardWrapper direction='column' gap={5} marginBottom={7}>
  //         <FlexBox alignItems='center' gap={2}>
  //           <ThresholdIcon />
  //           <Typography size='xl' weight='medium'>
  //             Passing Threshold
  //           </Typography>
  //         </FlexBox>
  //         <FlexBox alignItems='center' gap={4}>
  //           <InputWithLabel
  //             label='Minimum Number of Signatories'
  //             height={inputHeight + 'px'}
  //             inputValue={data.absoluteThresholdCount ?? 0}
  //             handleChange={(value) =>
  //               value <= (data.memberships[0].members.filter(Boolean).length ?? 0) &&
  //               handleUpdateAbsoluteThresholdCount(value)
  //             }
  //             width='50%'
  //           />
  //           <Typography size='xl'>of {data.memberships[0].members.filter(Boolean).length ?? 0} accounts</Typography>
  //         </FlexBox>
  //       </CardWrapper>
  //     </FlexBox>
  //   )
  // }
  // const renderUnstakingPeriod = (): JSX.Element => {
  //   return (
  //     <CardWrapper direction='column' gap={5} marginBottom={7}>
  //       <FlexBox alignItems='center' gap={2}>
  //         <CalendarIcon />
  //         <Typography size='xl' weight='medium'>
  //           Unstaking Period
  //         </Typography>
  //       </FlexBox>
  //       <FlexBox>
  //         <Typography size='md'>
  //           In order to vote, members must stake their tokens with the Group. Members who would like to leave the Group
  //           or trade their governance tokens must first unstake them. This setting configures how long members have to
  //           wait after unstaking their tokens for those tokens to become available. The longer you set this duration,
  //           the more sure you can be sure that people who register their tokens are keen to participate in your
  //           Group&apos;s governance.
  //         </Typography>
  //       </FlexBox>
  //       <FlexBox alignItems='center' justifyContent='flex-end' gap={4}>
  //         <NumberCounter
  //           direction='row-reverse'
  //           width='200px'
  //           height={inputHeight + 'px'}
  //           value={data.staking?.unstakingDuration?.value ?? 0}
  //           onChange={(value: number): void =>
  //             setData((pre) => ({
  //               ...pre,
  //               staking: {
  //                 ...(pre.staking ?? initialStaking),
  //                 unstakingDuration: { ...(pre.staking ?? initialStaking).unstakingDuration, value },
  //               },
  //             }))
  //           }
  //         />
  //         <Typography weight='medium' size='xl'>
  //           <SimpleSelect
  //             value={data.staking?.unstakingDuration?.units ?? 'weeks'}
  //             options={['seconds', 'minutes', 'hours', 'days', 'weeks']}
  //             onChange={(value) =>
  //               setData((pre) => ({
  //                 ...pre,
  //                 staking: {
  //                   ...(pre.staking ?? initialStaking),
  //                   unstakingDuration: {
  //                     ...(pre.staking ?? initialStaking).unstakingDuration,
  //                     units: value as DurationUnits,
  //                   },
  //                 },
  //               }))
  //             }
  //           />
  //         </Typography>
  //       </FlexBox>
  //     </CardWrapper>
  //   )
  // }
  const VotingDuration = (): JSX.Element => {
    const [proposalDurationAmount, setProposalDurationAmount] = useState(1)
    const [proposalDurationUnits, setProposalDurationUnits] = useState<DurationUnits>(DurationUnits.Weeks)

    useEffect(() => {
      const duration = convertDurationWithUnitsToDuration({
        value: proposalDurationAmount,
        units: proposalDurationUnits,
      })
      setData((pre) => ({
        ...pre,
        proposalModule: {
          ...pre.proposalModule,
          proposalConfig: {
            ...pre.proposalModule.proposalConfig,
            max_voting_period: duration,
          },
        },
      }))
    }, [proposalDurationAmount, proposalDurationUnits])

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
            which your Group can pass proposals. Setting the duration too low may make it difficult for proposals to
            pass as voters will have limited time to vote. After this time elapses, the proposal will either pass or
            fail.
          </Typography>
        </FlexBox>
        <FlexBox alignItems='center' justifyContent='flex-end' gap={4}>
          <NumberCounter
            direction='row-reverse'
            width='200px'
            height={inputHeight + 'px'}
            value={proposalDurationAmount}
            onChange={(value: number) => setProposalDurationAmount(value)}
          />
          <Typography weight='medium' size='xl'>
            <SimpleSelect
              value={proposalDurationUnits}
              options={Object.values(DurationUnits)}
              onChange={(value) => setProposalDurationUnits(value as DurationUnits)}
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
              value={data.proposalModule.proposalConfig.allow_revoting}
              onChange={(value) => {
                setData((v) => ({
                  ...v,
                  proposalModule: {
                    ...v.proposalModule,
                    proposalConfig: { ...v.proposalModule.proposalConfig, allow_revoting: value },
                  },
                }))
              }}
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
              value={!!data.proposalModule.preProposeConfig.deposit_info}
              onChange={(value) =>
                setData((v) => ({
                  ...v,
                  proposalModule: {
                    ...v.proposalModule,
                    preProposeConfig: {
                      ...v.proposalModule.preProposeConfig,
                      deposit_info: value
                        ? {
                            amount: new BigNumber('1').pow(10, NATIVE_DECIMAL).toString(),
                            denom: { native: NATIVE_MICRODENOM },
                            refund_policy: 'only_passed' as DepositRefundPolicy,
                          }
                        : null,
                    },
                  },
                }))
              }
            />
          </FlexBox>
          {!!data.proposalModule.preProposeConfig.deposit_info && (
            <>
              <FlexBox width='100%' justifyContent='flex-end' gap={2}>
                <NumberCounter
                  direction='row-reverse'
                  width='200px'
                  height={inputHeight + 'px'}
                  value={convertMicroDenomToDenomWithDecimals(
                    data.proposalModule.preProposeConfig.deposit_info.amount,
                    NATIVE_DECIMAL,
                  )}
                  onChange={(value) =>
                    setData({
                      ...data,
                      proposalModule: {
                        ...data.proposalModule,
                        preProposeConfig: {
                          ...data.proposalModule.preProposeConfig,
                          deposit_info: {
                            ...data.proposalModule.preProposeConfig.deposit_info,
                            amount: convertDenomToMicroDenomWithDecimals(value, NATIVE_DECIMAL).toString(),
                          } as CheckedDepositInfo,
                        },
                      },
                    })
                  }
                />
                <Typography weight='medium' size='xl'>
                  <SimpleSelect
                    value={
                      (
                        data.proposalModule.preProposeConfig.deposit_info.denom as {
                          native: string
                        }
                      ).native
                    }
                    options={['$IXO']}
                  />
                </Typography>
              </FlexBox>
              <FlexBox width='100%' justifyContent='space-between' alignItems='center'>
                <Typography size='md'>Once a proposal completes, when should deposits be refunded?</Typography>
                <Dropdown2
                  value={data.proposalModule.preProposeConfig.deposit_info.refund_policy}
                  options={[
                    { value: 'always', text: 'Always' },
                    { value: 'only_passed', text: 'Only passed proposals' },
                    { value: 'never', text: 'Never' },
                  ]}
                  onChange={(e) =>
                    setData((v) => ({
                      ...v,
                      proposalModule: {
                        ...v.proposalModule,
                        preProposeConfig: {
                          ...v.proposalModule.preProposeConfig,
                          deposit_info: {
                            ...v.proposalModule.preProposeConfig.deposit_info,
                            refund_policy: e.target.value as DepositRefundPolicy,
                          } as CheckedDepositInfo,
                        },
                      },
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
                {'threshold_quorum' in data.proposalModule.proposalConfig.threshold &&
                  'percent' in data.proposalModule.proposalConfig.threshold.threshold_quorum.threshold && (
                    <NumberCounter
                      direction='row-reverse'
                      width='200px'
                      height={inputHeight + 'px'}
                      value={
                        Number(data.proposalModule.proposalConfig.threshold.threshold_quorum.threshold.percent) * 100
                      }
                      onChange={(value) =>
                        setData((v) => ({
                          ...v,
                          proposalModule: {
                            ...v.proposalModule,
                            proposalConfig: {
                              ...v.proposalModule.proposalConfig,
                              threshold: {
                                ...v.proposalModule.proposalConfig.threshold,
                                threshold_quorum: {
                                  ...(
                                    v.proposalModule.proposalConfig.threshold as {
                                      threshold_quorum: {
                                        quorum: PercentageThreshold
                                        threshold: PercentageThreshold
                                      }
                                    }
                                  ).threshold_quorum,
                                  threshold: {
                                    percent: (value / 100).toString(),
                                  },
                                },
                              },
                            },
                          },
                        }))
                      }
                    />
                  )}
                <Typography weight='medium' size='xl'>
                  <Dropdown2
                    value={
                      Object.keys(
                        (
                          data.proposalModule.proposalConfig.threshold as {
                            threshold_quorum: {
                              quorum: PercentageThreshold
                              threshold: PercentageThreshold
                            }
                          }
                        ).threshold_quorum.threshold,
                      )[0]
                    }
                    options={[
                      { value: 'percent', text: '%' },
                      { value: 'majority', text: 'Majority' },
                    ]}
                    onChange={(e) =>
                      setData((v) => ({
                        ...v,
                        proposalModule: {
                          ...v.proposalModule,
                          proposalConfig: {
                            ...v.proposalModule.proposalConfig,
                            threshold: {
                              ...v.proposalModule.proposalConfig.threshold,
                              threshold_quorum: {
                                ...(
                                  v.proposalModule.proposalConfig.threshold as {
                                    threshold_quorum: {
                                      quorum: PercentageThreshold
                                      threshold: PercentageThreshold
                                    }
                                  }
                                ).threshold_quorum,
                                threshold: e.target.value === 'majority' ? { majority: {} } : { percent: '0.2' },
                              },
                            },
                          },
                        },
                      }))
                    }
                    style={{ height: inputHeight + 'px' }}
                  />
                </Typography>
              </FlexBox>
            </FlexBox>
          </CardWrapper>
        )}

        {/* Quorum */}
        {data.type !== 'multisig' && (
          <CardWrapper direction='column' gap={5}>
            <FlexBox alignItems='center' gap={2}>
              <SandClockIcon />
              <Typography size='xl' weight='medium'>
                Quorum
              </Typography>
            </FlexBox>
            <FlexBox>
              <Typography size='md'>
                The minimum percentage of voting power that must vote on a proposal for it to be considered a valid
                vote. If the group has many inactive members, setting this value too high may make it difficult to pass
                proposals.
              </Typography>
            </FlexBox>
            <FlexBox alignItems='center' justifyContent='flex-end' gap={4}>
              <FlexBox gap={4}>
                {'threshold_quorum' in data.proposalModule.proposalConfig.threshold &&
                  'percent' in data.proposalModule.proposalConfig.threshold.threshold_quorum.quorum && (
                    <NumberCounter
                      direction='row-reverse'
                      width='200px'
                      height={inputHeight + 'px'}
                      value={Number(data.proposalModule.proposalConfig.threshold.threshold_quorum.quorum.percent) * 100}
                      onChange={(value) =>
                        setData((v) => ({
                          ...v,
                          proposalModule: {
                            ...v.proposalModule,
                            proposalConfig: {
                              ...v.proposalModule.proposalConfig,
                              threshold: {
                                ...v.proposalModule.proposalConfig.threshold,
                                threshold_quorum: {
                                  ...(
                                    v.proposalModule.proposalConfig.threshold as {
                                      threshold_quorum: {
                                        quorum: PercentageThreshold
                                        threshold: PercentageThreshold
                                      }
                                    }
                                  ).threshold_quorum,
                                  quorum: {
                                    percent: (value / 100).toString(),
                                  },
                                },
                              },
                            },
                          },
                        }))
                      }
                    />
                  )}
                <Typography weight='medium' size='xl'>
                  <Dropdown2
                    value={
                      Object.keys(
                        (
                          data.proposalModule.proposalConfig.threshold as {
                            threshold_quorum: {
                              quorum: PercentageThreshold
                              threshold: PercentageThreshold
                            }
                          }
                        ).threshold_quorum.quorum,
                      )[0]
                    }
                    options={[
                      { value: 'percent', text: '%' },
                      { value: 'majority', text: 'Majority' },
                    ]}
                    onChange={(e) =>
                      setData((v) => ({
                        ...v,
                        proposalModule: {
                          ...v.proposalModule,
                          proposalConfig: {
                            ...v.proposalModule.proposalConfig,
                            threshold: {
                              ...v.proposalModule.proposalConfig.threshold,
                              threshold_quorum: {
                                ...(
                                  v.proposalModule.proposalConfig.threshold as {
                                    threshold_quorum: {
                                      quorum: PercentageThreshold
                                      threshold: PercentageThreshold
                                    }
                                  }
                                ).threshold_quorum,
                                quorum: e.target.value === 'majority' ? { majority: {} } : { percent: '0.2' },
                              },
                            },
                          },
                        },
                      }))
                    }
                    style={{ height: inputHeight + 'px' }}
                  />
                </Typography>
              </FlexBox>
            </FlexBox>
          </CardWrapper>
        )}

        {/* Proposal Submission Policy */}
        <CardWrapper direction='column' gap={5}>
          <FlexBox alignItems='center' gap={2}>
            <VoteSwitchingIcon />
            <Typography size='xl' weight='medium'>
              Proposal Submission Policy
            </Typography>
          </FlexBox>
          <FlexBox>
            <Typography size='md'>Who is allowed to submit proposals to the Group?</Typography>
          </FlexBox>
          <FlexBox justifyContent='flex-end'>
            <Dropdown2
              value={String(data.proposalModule.proposalConfig.only_members_execute)}
              options={[
                { value: 'false', text: 'Only members' },
                { value: 'true', text: 'Anyone' },
              ]}
              onChange={(e) =>
                setData((v) => ({
                  ...v,
                  proposalModule: {
                    ...v.proposalModule,
                    proposalConfig: {
                      ...v.proposalModule.proposalConfig,
                      only_members_execute: e.target.value === 'true',
                    },
                  },
                }))
              }
              wrapperStyle={{ width: '320px' }}
              style={{ height: '48px', textAlign: 'center' }}
            />
          </FlexBox>
        </CardWrapper>
      </FlexBox>
    )
  }
  const renderActions = (): JSX.Element => {
    return (
      <FlexBox direction='column' width='100%' marginTop={7} gap={2}>
        {errMsg && <Typography color='red'>{errMsg}</Typography>}
        <FlexBox alignItems='center' width='100%' gap={7}>
          {onBack && (
            <Button variant='secondary' size='full' height={48} onClick={onBack}>
              Back
            </Button>
          )}
          <Button disabled={!valid} size='full' height={48} loading={submitting} onClick={handleSubmit}>
            Create Group
          </Button>
        </FlexBox>
      </FlexBox>
    )
  }
  return (
    <FlexBox width={'100%'} justifyContent='center'>
      <FlexBox direction='column' width={deviceWidth.tablet + 'px'}>
        {renderGroupIdentity()}
        {data.type === 'membership' && GroupMemberships()}
        {data.type === 'staking' && Staking()}
        {/* {data.type === 'staking' && renderUnstakingPeriod()}
        {data.type === 'multisig' && renderMultisigGroupMembership()} */}
        {VotingDuration()}
        {renderAdvancedSwitch()}
        {showAdvanced && renderAdvancedSettings()}
        {renderActions()}
      </FlexBox>
    </FlexBox>
  )
}

export default SetupGroupSettings
