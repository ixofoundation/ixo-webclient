import { ActiveThresholdResponse, Addr, InfoResponse, TotalPowerAtHeightResponse, VotingPowerAtHeightResponse } from "./types/DaoVotingCw20StakedTypes";

export interface DaoVotingCw20StakedReadOnlyInterface {
    contractAddress: string;
    stakingContract: () => Promise<Addr>;
    activeThreshold: () => Promise<ActiveThresholdResponse>;
    votingPowerAtHeight: ({
      address,
      height
    }: {
      address: string;
      height?: number;
    }) => Promise<VotingPowerAtHeightResponse>;
    totalPowerAtHeight: ({
      height
    }: {
      height?: number;
    }) => Promise<TotalPowerAtHeightResponse>;
    dao: () => Promise<Addr>;
    info: () => Promise<InfoResponse>;
    tokenContract: () => Promise<Addr>;
    isActive: () => Promise<boolean>;
  }