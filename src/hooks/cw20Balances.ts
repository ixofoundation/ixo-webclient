import { useCallback } from 'react'
import { selectStakingGroups } from 'redux/entities/entities.selectors'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { claimAvailable } from 'utils/tokenClaim';
import { plus } from 'utils/currency';
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions';
import { TokenType } from 'types/tokens';
import { TDAOGroupModel } from 'types/entities';
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { useAccount } from './account';
import { DaoVotingCw20StakedQueryClient } from 'adapters/DaoVotingCw20StakedAdapter';
import { queryMultipleContracts } from 'utils/multiContractCall';
import { getCosmwasmClient } from 'lib/cosmWasmClient/cosmWasmClient';
import { RPC_ENDPOINT } from 'lib/protocol';
import { updateCw20TokensAction } from 'redux/account/account.actions';

const getStakingAndTokenContracts = async (stakingGroups: TDAOGroupModel[], cwClient: CosmWasmClient, address: string) => {
    const response = stakingGroups.map(stakingGroup => {
        const {
            votingModule: { votingModuleAddress },
        } = stakingGroup;


        const daoVotingCw20StakedClient = new DaoVotingCw20StakedQueryClient(
            cwClient as any,
            votingModuleAddress
        );

        return [daoVotingCw20StakedClient.stakingContractRequest(), daoVotingCw20StakedClient.tokenContractRequest()]
    })

    const stakingAndTokenContractAddress = await queryMultipleContracts(response.flat())

    const groupedAddresses: string[][] = stakingAndTokenContractAddress.reduce((acc: string[][], curr: string, index: number, array: string[]) => {
        if (index % 2 === 0) acc.push(array.slice(index, index + 2));
        return acc;
    }, []);

    const balances = groupedAddresses.map((stakingGroupAddresses) => {
        const [stakingAddress, tokenAddress] = stakingGroupAddresses

        const stakedValue = {
            address: stakingAddress,
            data: {
                staked_value: {
                    address
                }
            }
        }

        const claims = {
            address: stakingAddress,
            data: {
                claims: {
                    address
                }
            }
        }

        const balance = {
            address: tokenAddress,
            data: {
                balance: {
                    address
                }
            }
        }

        return [stakedValue, claims, balance]
    })

    const balancesResponse = await queryMultipleContracts(balances.flat())

    const balancesResult = balancesResponse?.reduce((acc: string[][], curr: string, index: number, array: string[]) => {
        if (index % 3 === 0) acc.push(array.slice(index, index + 3));
        return acc;
    }, []) ?? [];

    if(balancesResult.length === 0) return {}

    const utimateResult = stakingGroups.map((stakingGroup, index: any) => {
        const {
            token,
            coreAddress,
        } = stakingGroup;

        if (!token) return undefined

        const [microStakedResponse, claimsResponse, microBalanceResponse] = balancesResult[index]

        const microUnstakingValue = claimsResponse.claims
            .filter((claim: any) => !claimAvailable(claim, 0)) //  TODO: TBD blockHeight
            .reduce((acc: any, cur: any) => plus(acc, cur.amount), '0');

        const microClaimableValue = claimsResponse.claims
            .filter((claim: any) => claimAvailable(claim, 0)) //  TODO: TBD blockHeight
            .reduce((acc: any, cur: any) => plus(acc, cur.amount), '0');

        const balance = convertMicroDenomToDenomWithDecimals(microBalanceResponse.balance, token.tokenInfo.decimals)
        const stakedValue = convertMicroDenomToDenomWithDecimals(microStakedResponse.balance, token.tokenInfo.decimals)
        const unstakingValue = convertMicroDenomToDenomWithDecimals(microUnstakingValue, token.tokenInfo.decimals)
        const claimableValue = convertMicroDenomToDenomWithDecimals(microClaimableValue, token.tokenInfo.decimals)

        return {
            groupContract: coreAddress,
            type: TokenType.Cw20,
            symbol: token.tokenInfo.symbol,
            denomOrAddress: token.config.token_address,
            imageUrl: (token.marketingInfo?.logo !== 'embedded' && token.marketingInfo.logo?.url) || '',
            decimals: token.tokenInfo.decimals,
            balance: balance.toString(),
            staked: stakedValue.toString(),
            unbonding: unstakingValue.toString(),
            claimable: claimableValue.toString(),
        };
    })

    return utimateResult.filter(element => element !== undefined).reduce((acc, cur) => {
       acc[cur?.denomOrAddress as any] = cur
       return acc
    }, {})
}


export function useUpdate20Balances() {
    const stakingGroups = useAppSelector(selectStakingGroups)
    const dispatch = useAppDispatch()
    const {
        address,
    } = useAccount()

    const update = useCallback(async () => {
        const cwClient = await getCosmwasmClient(RPC_ENDPOINT ?? "")
        const response = await getStakingAndTokenContracts(stakingGroups, cwClient, address)
        dispatch(updateCw20TokensAction(response))

    }, [address, dispatch, stakingGroups])

    return { update }
}