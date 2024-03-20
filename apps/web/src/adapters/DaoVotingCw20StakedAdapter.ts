import { DaoVotingCw20StakedReadOnlyInterface } from "interfaces/DaoVotingCw20StakedInterface";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { ActiveThresholdResponse, Addr, InfoResponse, TotalPowerAtHeightResponse, VotingPowerAtHeightResponse } from "interfaces/types/DaoVotingCw20StakedTypes";
import { QueryRequest } from "utils/multiContractCall";

export class DaoVotingCw20StakedQueryClient implements DaoVotingCw20StakedReadOnlyInterface {
  client: CosmWasmClient;

  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.stakingContract = this.stakingContract.bind(this);
    this.activeThreshold = this.activeThreshold.bind(this);
    this.votingPowerAtHeight = this.votingPowerAtHeight.bind(this);
    this.totalPowerAtHeight = this.totalPowerAtHeight.bind(this);
    this.dao = this.dao.bind(this);
    this.info = this.info.bind(this);
    this.tokenContract = this.tokenContract.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  stakingContract = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      staking_contract: {}
    });
  };

  stakingContractRequest = (): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        staking_contract: {}
      }
    }
  }

  activeThreshold = async (): Promise<ActiveThresholdResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      active_threshold: {}
    });
  };

  activeThresholdRequest = (): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        active_threshold: {}
      }
    }
  }

  votingPowerAtHeight = async ({
    address,
    height
  }: {
    address: string;
    height?: number;
  }): Promise<VotingPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      voting_power_at_height: {
        address,
        height
      }
    });
  };

  votingPowerAtHeightRequest = ({
    address,
    height
  }: {
    address: string;
    height?: number;
  }): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        voting_power_at_height: {
          address,
          height
        }
      }
    }
  }

  totalPowerAtHeight = async ({
    height
  }: {
    height?: number;
  }): Promise<TotalPowerAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_power_at_height: {
        height
      }
    });
  };

  totalPowerAtHeightRequest = ({
    height
  }: {
    height?: number;
  }): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        total_power_at_height: {
          height
        }
      }
    }
  }

  dao = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      dao: {}
    });
  };


  daoRequest = (): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        dao: {}
      }
    }
  }

  info = async (): Promise<InfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      info: {}
    });
  };

  infoRequest = (): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        info: {}
      }
    }
  }

  tokenContract = async (): Promise<Addr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_contract: {}
    });
  };

  tokenContractRequest = (): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        token_contract: {}
      }
    }
  }

  isActive = async (): Promise<boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_active: {}
    });
  };

  isActiveRequest = (): QueryRequest => {
    return {
      address: this.contractAddress,
      data: {
        is_active: {}
      }
    }
  }
}
