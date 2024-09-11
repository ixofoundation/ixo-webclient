import { FlexBox, SvgBox } from 'components/App/App.styles'
import React, { useEffect, useState } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { CardWrapper, PlusIcon } from './SetupGroupSettings.styles'
import { Typography } from 'components/Typography'
import {
  AccountValidStatus,
  Button,
  Dropdown,
  IconUpload,
  InputWithLabel,
  NumberCounter,
  Switch,
  TextArea,
} from 'screens/CreateEntity/Components'
import { union } from 'lodash'




















import { DurationUnits } from 'types/dao'
import Tooltip from 'components/Tooltip/Tooltip'
import { validateTokenSymbol } from 'utils/validation'
import {
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  convertMicroDenomToDenomWithDecimals,
  convertSecondsToDurationWithUnits,
} from 'utils/conversions'
import { NATIVE_DECIMAL, NATIVE_DENOM, NATIVE_MICRODENOM } from 'constants/chains'
import { useTheme } from 'styled-components'
import BigNumber from 'bignumber.js'
import type {
  CheckedDepositInfo,
  DepositRefundPolicy,
} from '@ixo/impactxclient-sdk/types/codegen/DaoPreProposeSingle.types'
import { PercentageThreshold } from '@ixo/impactxclient-sdk/types/codegen/DaoProposalCondorcet.types'

const inputHeight = 48

type RenderActionsProps = {
  errMsg: string
  onBack?: () => void
  submitting: boolean
  handleSubmit: () => void
  valid: boolean
}

export const RenderActions = ({ errMsg, onBack, submitting, handleSubmit, valid }: RenderActionsProps): JSX.Element => {
  return (
    <FlexBox $direction='column' width='100%' $marginTop={7} $gap={2}>
      {errMsg && <Typography color='red'>{errMsg}</Typography>}
      <FlexBox $alignItems='center' width='100%' $gap={7}>
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

type RenderGroupIdentityProps = DataStateProps & {
  isLedgeredGroup?: boolean
}

export const RenderGroupIdentity = ({ data, setData, isLedgeredGroup }: RenderGroupIdentityProps): JSX.Element => {
  return (
    <CardWrapper $direction='column' $gap={5} $marginBottom={7}>
      <FlexBox $gap={2} $alignItems='center'>
        <img src="/assets/images/icon-info.svg"  />
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
          disabled={isLedgeredGroup}
        />
      </FlexBox>
      <FlexBox>
        <TextArea
          height='100px'
          label='Short Description'
          inputValue={data.config.description || ''}
          handleChange={(value): void => setData((pre) => ({ ...pre, config: { ...pre.config, description: value } }))}
          disabled={isLedgeredGroup}
        />
      </FlexBox>
    </CardWrapper>
  )
}
// /**
//  * @type membership
//  * @returns
//  */

type DataStateProps = {
  setData: React.Dispatch<React.SetStateAction<TDAOGroupModel>>
  data: TDAOGroupModel
  isLedgeredGroup?: boolean
}

export const GroupMemberships = ({ setData, data, isLedgeredGroup }: RenderGroupIdentityProps): JSX.Element => {
  const initialMembership = { category: '', weight: 1, members: [] }
  // TODO: properly type theme
  const theme: any = useTheme()
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
  const attachMembers = (membershipIdx: number, addresses: string[]): void => {
    const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
    handleUpdateMembership(membershipIdx, 'members', union(members.concat(addresses)))
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
    <FlexBox $direction='column' width='100%' $gap={7} $marginBottom={7}>
      {data.memberships?.map((membership, membershipIdx) => (
        <CardWrapper $direction='column' $gap={5} key={membershipIdx}>
          <FlexBox $justifyContent='space-between' $alignItems='center'>
            <FlexBox $gap={2} $alignItems='center'>
              <img src="/assets/images/icon-profile.svg"  />
              <Typography size='xl' weight='medium'>
                Group Membership
              </Typography>
            </FlexBox>
            <FlexBox $gap={4}>
              <input
                style={{ display: 'none' }}
                type={'file'}
                id={`csv-file-input-${membershipIdx}`}
                accept={'.csv'}
                onChange={handleFileChange(membershipIdx)}
              />
              <Button variant='primary' size='custom' width={52} height={48} onClick={handleImportCsv(membershipIdx)}>
                <SvgBox color='white'>
                  <img src="/assets/images/icon-file-upload-solid.svg"  />
                </SvgBox>
              </Button>
              <Button
                variant='grey900'
                size='custom'
                width={52}
                height={48}
                onClick={(): void => handleRemoveMembership(membershipIdx)}
              >
                <img src="/assets/images/icon-trash.svg"  />
              </Button>
            </FlexBox>
          </FlexBox>
          <FlexBox $direction='column' $gap={5}>
            <FlexBox $gap={2} $alignItems='center'>
              <Typography size='xl' weight='medium'>
                Categories
              </Typography>
              <Tooltip
                text={`The "class" of member. For example: "Core developers" or "friends and family." These names are only for your reference.`}
                width='20rem'
              >
                <SvgBox color='black' $svgWidth={5} $svgHeight={5} cursor='pointer'>
                  <img src="/assets/images/icon-info.svg"  />
                </SvgBox>
              </Tooltip>
            </FlexBox>
            <FlexBox width='100%' $alignItems='center' $gap={4}>
              <InputWithLabel
                height={inputHeight + 'px'}
                label='Membership Category'
                inputValue={membership.category}
                handleChange={(value): void => handleUpdateMembership(membershipIdx, 'category', value)}
                disabled={isLedgeredGroup}
              />
              <NumberCounter
                label='Voting Weight per Member'
                height={inputHeight + 'px'}
                value={membership.weight ?? 0}
                onChange={(value): void => handleUpdateMembership(membershipIdx, 'weight', value)}
                disabled={isLedgeredGroup}
              />
            </FlexBox>
          </FlexBox>
          <FlexBox $direction='column' $gap={5}>
            <Typography size='xl' weight='medium'>
              Members
            </Typography>
            <FlexBox $direction='column' $gap={4} width='100%'>
              {membership.members.map((member, memberIdx) => (
                <FlexBox key={memberIdx} $alignItems='center' $gap={4} width='100%'>
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
                    <img src="/assets/images/icon-trash.svg"  />
                  </Button>
                </FlexBox>
              ))}
              <Button
                size='flex'
                textTransform='none'
                height={48}
                onClick={(): void => handleAddMember(membershipIdx)}
                disabled={isLedgeredGroup}
              >
                <FlexBox $alignItems='center' $gap={2}>
                  <PlusIcon color={theme.ixoWhite} />
                  Add a Member
                </FlexBox>
              </Button>
            </FlexBox>
          </FlexBox>
        </CardWrapper>
      ))}
      <CardWrapper className='cursor-pointer' width='100%' $alignItems='center' $gap={2} onClick={handleAddMembership}>
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

type UseExistingTokenProps = {
  setUseExistingToken: React.Dispatch<React.SetStateAction<boolean>>
  useExistingToken: boolean
}
export const Staking = ({
  data,
  setData,
  useExistingToken,
  setUseExistingToken,
}: DataStateProps & UseExistingTokenProps): JSX.Element => {
  const theme: any = useTheme()

  if (!data.token) {
    return <></>
  }

  const initialMembership = { category: '', weight: 10, members: [] }

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
  const handleRemoveMembership = (distributionIdx: number): void => {
    if (data.memberships?.length !== 1) {
      setData((pre) => ({ ...pre, memberships: pre.memberships?.filter((item, i) => distributionIdx !== i) }))
    } else {
      setData((pre) => ({ ...pre, memberships: [initialMembership] }))
    }
  }
  const handleAddMember = (membershipIdx: number): void => {
    const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
    handleUpdateMembership(membershipIdx, 'members', [...members, ''])
  }
  // const attachMembers = (membershipIdx: number, addresses: string[]): void => {
  //   const members = (data.memberships ?? [])[membershipIdx]?.members ?? ['']
  //   handleUpdateMembership(membershipIdx, 'members', _.union(members.concat(addresses)))
  // }
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

    const treasuryPercent = data.token?.treasuryPercent ?? 0
    const totalTokenDistributionPercentage = (data.memberships ?? [])?.reduce((acc, cur) => acc + cur.weight, 0)

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
      message: `${convertMicroDenomToDenomWithDecimals(
        data.token?.tokenInfo.total_supply || '0',
        data.token?.tokenInfo.decimals,
      ).toLocaleString()} tokens will be minted. ${
        100 - (data.token?.treasuryPercent ?? 0)
      }% will be sent to members according to the distribution below. The remaining ${
        data.token?.treasuryPercent
      }% will go to the Group's treasury, where they can be distributed later via governance proposals.`,
    }
  }
  return (
    <FlexBox $direction='column' width='100%' $gap={7} $marginBottom={7}>
      {/* render buttons `Create a Token` & `Use an existing Token` */}
      <FlexBox width='100%' $gap={7}>
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
          <CardWrapper $direction='column' $gap={5}>
            <FlexBox $gap={2} $alignItems='center'>
              <img src="/assets/images/icon-token-contract.svg"  />
              <Typography size='xl' weight='medium'>
                Token Creation
              </Typography>
            </FlexBox>
            <FlexBox width='100%' $gap={5} $alignItems='center'>
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
            <FlexBox $gap={5}>
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
            <FlexBox $gap={5}>
              <InputWithLabel
                height={inputHeight + 'px'}
                label='Token Supply'
                inputValue={convertMicroDenomToDenomWithDecimals(
                  data.token?.tokenInfo.total_supply,
                  data.token?.tokenInfo.decimals,
                ).toLocaleString()}
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
                                value.replace(/,(?=\d{3})/g, ''),
                                v.token.tokenInfo.decimals,
                              ).toString(),
                            },
                          },
                        }
                      : v,
                  )
                }
              />
              <FlexBox $alignItems='center' $gap={4} width='100%'>
                <NumberCounter
                  height={inputHeight + 'px'}
                  label='Treasury Percent'
                  value={data.token?.treasuryPercent ?? 0}
                  onChange={(value): void =>
                    setData((v) => (v.token ? { ...v, token: { ...v.token, treasuryPercent: value } } : v))
                  }
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
          {(data.memberships ?? []).map((distribution, distributionIdx) => (
            <CardWrapper $direction='column' $gap={5} key={distributionIdx}>
              <FlexBox $justifyContent='space-between' $alignItems='center'>
                <FlexBox $gap={2} $alignItems='center'>
                  <img src="/assets/images/icon-profile.svg"  />
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
                  <img src="/assets/images/icon-trash.svg"  />
                </Button>
              </FlexBox>
              <FlexBox $direction='column' $gap={5}>
                <FlexBox width='100%' $alignItems='center' $gap={5}>
                  <InputWithLabel
                    height={inputHeight + 'px'}
                    label='Category Name'
                    inputValue={distribution.category}
                    handleChange={(value): void => handleUpdateMembership(distributionIdx, 'category', value)}
                  />
                  <FlexBox $alignItems='center' $gap={4} width='100%'>
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
              <FlexBox $direction='column' $gap={5}>
                <Typography size='xl' weight='medium'>
                  Members
                </Typography>
                <FlexBox $direction='column' $gap={4} width='100%'>
                  {distribution.members.map((member, memberIdx) => (
                    <FlexBox key={memberIdx} $alignItems='center' $gap={4} width='100%'>
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
                        <img src="/assets/images/icon-trash.svg"  />
                      </Button>
                    </FlexBox>
                  ))}
                  <Button
                    size='flex'
                    textTransform='none'
                    height={48}
                    onClick={(): void => handleAddMember(distributionIdx)}
                  >
                    <FlexBox $alignItems='center' $gap={2}>
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
            $alignItems='center'
            $gap={2}
            $marginBottom={7}
            onClick={handleAddMembership}
          >
            <PlusIcon />
            <Typography color='blue' size='xl' weight='medium'>
              Add a Distribution Category
            </Typography>
          </CardWrapper>
        </>
      ) : (
        <CardWrapper $direction='column' $gap={5} $marginBottom={7}>
          <FlexBox $gap={2} $alignItems='center'>
            <img src="/assets/images/icon-token-contract.svg"  />
            <Typography size='xl' weight='medium'>
              Validate the Token Contract Address
            </Typography>
          </FlexBox>
          <FlexBox $gap={4}>
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
export const RenderMultisigGroupMembership = ({ setData, data }: DataStateProps): JSX.Element => {
  const theme: any = useTheme()
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
    <FlexBox $direction='column' $gap={7} $marginBottom={7} width={'100%'}>
      {/* Multisig Group Membership */}
      <CardWrapper $direction='column' $gap={5}>
        <FlexBox $gap={2} $alignItems='center'>
          <img src="/assets/images/icon-profile.svg"  />
          <Typography size='xl' weight='medium'>
            Multisig Group Membership
          </Typography>
        </FlexBox>
        <FlexBox $direction='column' $gap={5}>
          <Typography size='xl' weight='medium'>
            Members
          </Typography>
          <FlexBox $direction='column' $gap={4} width='100%'>
            {(data.memberships ?? [])[0]?.members.map((member, memberIdx) => (
              <FlexBox key={memberIdx} $alignItems='center' $gap={4} width='100%'>
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
                  <img src="/assets/images/icon-trash.svg"  />
                </Button>
              </FlexBox>
            ))}
            <Button size='flex' textTransform='none' height={48} onClick={(): void => handleAddMember(0)}>
              <FlexBox $alignItems='center' $gap={2}>
                <PlusIcon color={theme.ixoWhite} />
                Add a Member
              </FlexBox>
            </Button>
          </FlexBox>
        </FlexBox>
      </CardWrapper>
      {/* Passing Threshold */}
      <CardWrapper $direction='column' $gap={5} $marginBottom={7}>
        <FlexBox $alignItems='center' $gap={2}>
          <img src="/assets/images/icon-threshold.svg"  />
          <Typography size='xl' weight='medium'>
            Passing Threshold
          </Typography>
        </FlexBox>
        <FlexBox $alignItems='center' $gap={4}>
          <InputWithLabel
            label='Minimum Number of Signatories'
            height={inputHeight + 'px'}
            inputValue={
              (data.proposalModule.proposalConfig.threshold as { absolute_count: { threshold: string } }).absolute_count
                .threshold
            }
            handleChange={(value) =>
              value <= ((data.memberships ?? [])[0].members.filter(Boolean).length ?? 0) &&
              setData((v) => ({
                ...v,
                proposalModule: {
                  ...v.proposalModule,
                  proposalConfig: {
                    ...v.proposalModule.proposalConfig,
                    threshold: {
                      ...v.proposalModule.proposalConfig.threshold,
                      absolute_count: { threshold: value.toString() },
                    },
                  },
                },
              }))
            }
            width='50%'
          />
          <Typography size='xl'>
            of {(data.memberships ?? [])[0]?.members.filter(Boolean).length ?? 0} accounts
          </Typography>
        </FlexBox>
      </CardWrapper>
    </FlexBox>
  )
}
export const UnstakingPeriod = ({ data, setData }: DataStateProps): JSX.Element => {
  const [unstakingDurationAmount, setUnstakingDurationAmount] = useState(2)
  const [unstakingDurationUnits, setUnstakingDurationUnits] = useState<DurationUnits>(DurationUnits.Weeks)

  useEffect(() => {
    if (data.token?.config.unstaking_duration && 'time' in data.token.config.unstaking_duration) {
      const { value, units } = convertSecondsToDurationWithUnits(data.token.config.unstaking_duration.time)
      setUnstakingDurationAmount(value)
      setUnstakingDurationUnits(units)
    }
  }, [data, setUnstakingDurationAmount, setUnstakingDurationUnits])

  useEffect(() => {
    const duration = convertDurationWithUnitsToDuration({
      value: unstakingDurationAmount,
      units: unstakingDurationUnits,
    })
    setData((v) =>
      v.token
        ? {
            ...v,
            token: {
              ...v.token,
              config: {
                ...v.token.config,
                unstaking_duration: duration,
              },
            },
          }
        : v,
    )
  }, [unstakingDurationAmount, unstakingDurationUnits, setData])

  return (
    <CardWrapper $direction='column' $gap={5} $marginBottom={7}>
      <FlexBox $alignItems='center' $gap={2}>
        <img src="/assets/images/icon-calendar.svg"  />
        <Typography size='xl' weight='medium'>
          Unstaking Period
        </Typography>
      </FlexBox>
      <FlexBox>
        <Typography size='md'>
          In order to vote, members must stake their tokens with the Group. Members who would like to leave the Group or
          trade their governance tokens must first unstake them. This setting configures how long members have to wait
          after unstaking their tokens for those tokens to become available. The longer you set this duration, the more
          you can be sure that people who register their tokens are keen to participate in your Group&apos;s governance.
        </Typography>
      </FlexBox>
      <FlexBox $alignItems='center' $justifyContent='flex-end' $gap={4}>
        <NumberCounter
          direction='row-reverse'
          width='200px'
          height={inputHeight + 'px'}
          value={unstakingDurationAmount}
          onChange={(value: number) => setUnstakingDurationAmount(value)}
        />
        <Typography weight='medium' size='xl'>
          <Dropdown
            value={unstakingDurationUnits}
            options={Object.entries(DurationUnits).map(([key, value]) => ({ text: key, value: value }))}
            onChange={(e) => setUnstakingDurationUnits(e.target.value as DurationUnits)}
            style={{ width: 200, textAlign: 'center' }}
          />
        </Typography>
      </FlexBox>
    </CardWrapper>
  )
}
export const VotingDuration = ({ data, setData }: DataStateProps): JSX.Element => {
  const [proposalDurationAmount, setProposalDurationAmount] = useState(1)
  const [proposalDurationUnits, setProposalDurationUnits] = useState<DurationUnits>(DurationUnits.Weeks)

  useEffect(() => {
    if ('time' in data.proposalModule.proposalConfig.max_voting_period) {
      const { value, units } = convertSecondsToDurationWithUnits(
        data.proposalModule.proposalConfig.max_voting_period.time,
      )
      setProposalDurationAmount(value)
      setProposalDurationUnits(units)
    }
  }, [data.proposalModule.proposalConfig.max_voting_period, setProposalDurationAmount, setProposalDurationUnits])

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
  }, [proposalDurationAmount, proposalDurationUnits, setData])

  return (
    <CardWrapper $direction='column' $gap={5}>
      <FlexBox $alignItems='center' $gap={2}>
        <img src="/assets/images/icon-sandclock.svg"  />
        <Typography size='xl' weight='medium'>
          Voting Duration
        </Typography>
      </FlexBox>
      <FlexBox>
        <Typography size='md'>
          The duration for which proposals are open for voting. A low proposal duration may increase the speed at which
          your Group can pass proposals. Setting the duration too low may make it difficult for proposals to pass as
          voters will have limited time to vote. After this time elapses, the proposal will either pass or fail.
        </Typography>
      </FlexBox>
      <FlexBox $alignItems='center' $justifyContent='flex-end' $gap={4}>
        <NumberCounter
          direction='row-reverse'
          width='200px'
          height={inputHeight + 'px'}
          value={proposalDurationAmount}
          onChange={(value: number) => setProposalDurationAmount(value)}
        />
        <Typography weight='medium' size='xl'>
          <Dropdown
            value={proposalDurationUnits}
            options={Object.entries(DurationUnits).map(([key, value]) => ({ text: key, value: value }))}
            onChange={(e) => setProposalDurationUnits(e.target.value as DurationUnits)}
            style={{ width: 200, textAlign: 'center' }}
          />
        </Typography>
      </FlexBox>
    </CardWrapper>
  )
}

type RenderAdvancedSwitchProps = {
  showAdvanced: boolean
  setShowAdvanced: (value: boolean) => void
}
export const RenderAdvancedSwitch = ({ showAdvanced, setShowAdvanced }: RenderAdvancedSwitchProps): JSX.Element => {
  return (
    <FlexBox $marginTop={15} $marginBottom={15}>
      <Switch onLabel='Show Advanced Settings' value={showAdvanced} onChange={setShowAdvanced} />
    </FlexBox>
  )
}
export const RenderAdvancedSettings = ({ setData, data }: RenderGroupIdentityProps): JSX.Element => {
  return (
    <FlexBox $direction='column' $gap={7}>
      {/* Allow Vote Switching */}
      <CardWrapper $direction='column' $gap={5}>
        <FlexBox $alignItems='center' $gap={2}>
          <img src="/assets/images/icon-vote-switching.svg"  />
          <Typography size='xl' weight='medium'>
            Allow Vote Switching
          </Typography>
        </FlexBox>
        <FlexBox>
          <Typography size='md'>
            Members will be allowed to change their vote before the voting deadline has expired. This will result in all
            proposals having to complete the full voting duration, even if consensus is reached early.
          </Typography>
        </FlexBox>
        <FlexBox $justifyContent='flex-end'>
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
      <CardWrapper $direction='column' $gap={5}>
        <FlexBox $alignItems='center' $gap={2}>
          <SvgBox $svgWidth={8} $svgHeight={8} color='black'>
            <img src="/assets/images/icon-coins-solid.svg"  />
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
        <FlexBox $justifyContent='flex-end'>
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
                          amount: new BigNumber('1').times(new BigNumber(10).pow(6)).toString(),
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
            <FlexBox width='100%' $justifyContent='flex-end' $gap={2}>
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
                <Dropdown
                  value={
                    (
                      data.proposalModule.preProposeConfig.deposit_info.denom as {
                        native: string
                      }
                    ).native
                  }
                  onChange={() => {
                    //
                  }}
                  options={[{ value: NATIVE_MICRODENOM, text: `$${NATIVE_DENOM.toUpperCase()}` }]}
                  style={{ width: 200, textAlign: 'center' }}
                />
              </Typography>
            </FlexBox>
            <FlexBox width='100%' $justifyContent='space-between' $alignItems='center'>
              <Typography size='md'>Once a proposal completes, when should deposits be refunded?</Typography>
              <Dropdown
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
        <CardWrapper $direction='column' $gap={5}>
          <FlexBox $alignItems='center' $gap={2}>
            <img src="/assets/images/icon-threshold.svg"  />
            <Typography size='xl' weight='medium'>
              Passing Threshold
            </Typography>
          </FlexBox>
          <FlexBox>
            <Typography size='md'>
              A majority passing threshold is recommended. Without a majority threshold, the quorum is set by those who
              voted. A proposal could therefore pass with only a minority of the group voting ‘yes.’ With a majority
              threshold, as least 50% of the whole group must vote ‘yes’.
            </Typography>
          </FlexBox>
          <FlexBox $justifyContent='flex-end'>
            <FlexBox $gap={4}>
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
                                  percent: ((value || 0) / 100).toString(),
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
                <Dropdown
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
                  style={{ width: 200, height: inputHeight, textAlign: 'center' }}
                />
              </Typography>
            </FlexBox>
          </FlexBox>
        </CardWrapper>
      )}

      {/* Quorum */}
      {data.type !== 'multisig' && (
        <CardWrapper $direction='column' $gap={5}>
          <FlexBox $alignItems='center' $gap={2}>
            <img src="/assets/images/icon-sandclock.svg"  />
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
          <FlexBox $alignItems='center' $justifyContent='flex-end' $gap={4}>
            <FlexBox $gap={4}>
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
                <Dropdown
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
                  style={{ width: 200, height: inputHeight, textAlign: 'center' }}
                />
              </Typography>
            </FlexBox>
          </FlexBox>
        </CardWrapper>
      )}

      {/* Proposal Submission Policy */}
      <CardWrapper $direction='column' $gap={5}>
        <FlexBox $alignItems='center' $gap={2}>
          <img src="/assets/images/icon-vote-switching.svg"  />
          <Typography size='xl' weight='medium'>
            Proposal Submission Policy
          </Typography>
        </FlexBox>
        <FlexBox>
          <Typography size='md'>Who is allowed to submit proposals to the Group?</Typography>
        </FlexBox>
        <FlexBox $justifyContent='flex-end'>
          <FlexBox>
            <Dropdown
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
              style={{ width: 320, height: '48px', textAlign: 'center' }}
            />
          </FlexBox>
        </FlexBox>
      </CardWrapper>
    </FlexBox>
  )
}
