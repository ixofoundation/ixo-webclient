import { useCallback } from 'react'
import { selectStakingGroups } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { contracts } from '@ixo/impactxclient-sdk'
import { claimAvailable } from 'utils/tokenClaim';
import { plus } from 'utils/currency';
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions';
import { Cw20Token, TokenType } from 'types/tokens';
import { TDAOGroupModel } from 'types/entities';
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { useAccount } from './account';
import { DaoVotingCw20StakedQueryClient } from 'adapters/DaoVotingCw20StakedAdapter';
import { queryMultipleContracts } from 'utils/multiContractCall';

type ProcessStakingGroupProps = {
    stakingGroup: TDAOGroupModel,
    cwClient: CosmWasmClient,
    address: string,
    updateCw20Tokens: (balances: { [addr: string]: Cw20Token }) => void
}
async function processStakingGroup({ stakingGroup, cwClient, updateCw20Tokens, address }: ProcessStakingGroupProps) {
    const {
        token,
        coreAddress,
        votingModule: { votingModuleAddress },
    } = stakingGroup;

    if (!token) return;

    const daoVotingCw20StakedClient = new DaoVotingCw20StakedQueryClient(
        cwClient as any,
        votingModuleAddress
    );

    const [stakingContract, tokenContract] = await queryMultipleContracts([daoVotingCw20StakedClient.stakingContractRequest(), daoVotingCw20StakedClient.tokenContractRequest()])

    const cw20StakeClient = new contracts.Cw20Stake.Cw20StakeQueryClient(cwClient, stakingContract);
    const cw20BaseClient = new contracts.Cw20Base.Cw20BaseQueryClient(cwClient, tokenContract);

    const { value: microStakedValue } = await cw20StakeClient.stakedValue({ address });
    const { claims } = await cw20StakeClient.claims({ address });

    const microUnstakingValue = claims
        .filter((claim) => !claimAvailable(claim, 0)) //  TODO: TBD blockHeight
        .reduce((acc, cur) => plus(acc, cur.amount), '0');

    const microClaimableValue = claims
        .filter((claim) => claimAvailable(claim, 0)) //  TODO: TBD blockHeight
        .reduce((acc, cur) => plus(acc, cur.amount), '0');

    const { balance: microBalance } = await cw20BaseClient.balance({ address });

    const [balance, stakedValue, unstakingValue, claimableValue] = await Promise.all([
        convertMicroDenomToDenomWithDecimals(microBalance, token.tokenInfo.decimals),
        convertMicroDenomToDenomWithDecimals(microStakedValue, token.tokenInfo.decimals),
        convertMicroDenomToDenomWithDecimals(microUnstakingValue, token.tokenInfo.decimals),
        convertMicroDenomToDenomWithDecimals(microClaimableValue, token.tokenInfo.decimals),
    ]);

    const payload = {
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

    updateCw20Tokens({ [payload.denomOrAddress]: payload });
}


export function useUpdate20Balances() {
    const stakingGroups = useAppSelector(selectStakingGroups)
    const {
        address,
        cwClient,
        updateCw20Tokens,
    } = useAccount()

    const update = useCallback(async () => {
        await Promise.all(stakingGroups.map((stakingGroup) => processStakingGroup({ stakingGroup, cwClient, address, updateCw20Tokens })))
    }, [address, cwClient, stakingGroups, updateCw20Tokens])

    return { update }
}