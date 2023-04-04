import {
  PaymentTypeStrategyMap,
  PaymentType,
  PaymentDenominationStrategyMap,
  PaymentDenomination,
  EntityViewStrategyMap,
  EntityView,
  PageViewStrategyMap,
  PageView,
  SlashingConditionStrategyMap,
  StakeTypeStrategyMap,
  StakeType,
  SlashingCondition,
  NodeTypeStrategyMap,
  NodeType,
  LiquiditySourceStrategyMap,
  LiquiditySource,
  KeyTypeStrategyMap,
  KeyPurpose,
  KeyType,
  KeyPurposeStrategyMap,
  ServiceTypeStrategyMap,
  ServiceType,
  DataResourceTypeStrategyMap,
  DataResourceType,
  TermsOfUseTypeStrategyMap,
  TermsOfUseType,
} from './entities'
import PayPerUse from 'assets/icons/PayPerUse'
import Proprietary from 'assets/icons/Proprietary'
import OnceOffFee from 'assets/icons/OnceOffFee'
import FreeOpenSource from 'assets/icons/FreeOpenSource'

export const entityViewMap: EntityViewStrategyMap = {
  [EntityView.Visible]: { title: 'Visible' },
  [EntityView.Encrypted]: { title: 'Encrypted' },
}

export const pageViewMap: PageViewStrategyMap = {
  [PageView.Public]: { title: 'Public' },
  [PageView.Private]: { title: 'Private' },
  [PageView.Secret]: { title: 'Secret' },
}

export const paymentTypeMap: PaymentTypeStrategyMap = {
  [PaymentType.FeeForService]: { title: 'Fee for Service' },
  [PaymentType.OracleFee]: { title: 'Oracle Fee' },
  [PaymentType.Subscription]: { title: 'Subscription' },
  [PaymentType.RentalFee]: { title: 'Rental Fee' },
  [PaymentType.OutcomePayment]: { title: 'Outcome Payment' },
  [PaymentType.InterestRepayment]: { title: 'Interest Repayment' },
  [PaymentType.LoanRepayment]: { title: 'Loan Repayment' },
  [PaymentType.IncomeDistribution]: { title: 'Income Distribution' },
  [PaymentType.DisputeSettlement]: { title: 'Dispute Settlement' },
}

export const paymentDenominationMap: PaymentDenominationStrategyMap = {
  [PaymentDenomination.IXO]: { title: 'IXO' },
  [PaymentDenomination.eEUR]: { title: 'eEUR' },
  [PaymentDenomination.eCHF]: { title: 'eCHF' },
  [PaymentDenomination.eUSD]: { title: 'eUSD' },
}

export const stakeTypeMap: StakeTypeStrategyMap = {
  [StakeType.SecurityGuarantee]: { title: 'Security Guarantee' },
  [StakeType.PerformanceGuarantee]: { title: 'Performance Guarantee' },
  [StakeType.LoanGuarantee]: { title: 'Loan Guarantee' },
  [StakeType.ClaimGuarantee]: { title: 'Claim Guarantee' },
  [StakeType.DisputeGuarantee]: { title: 'Dispute Guarantee' },
  [StakeType.VotingProposalDeposit]: { title: 'Voting Proposal Deposit' },
  [StakeType.MembershipDeposit]: { title: 'Membership Deposit' },
  [StakeType.ServicesDeposit]: { title: 'Services Deposit' },
  [StakeType.InsuranceGuarantee]: { title: 'Insurance Guarantee' },
}

export const slashingConditionMap: SlashingConditionStrategyMap = {
  [SlashingCondition.FailedService]: { title: 'Failed Service' },
  [SlashingCondition.FailedSecurity]: { title: 'Failed Security' },
  [SlashingCondition.LoanDefault]: { title: 'Loan Default' },
  [SlashingCondition.FailedProposal]: { title: 'Failed Proposal' },
  [SlashingCondition.FailedDispute]: { title: 'Failed Dispute' },
  [SlashingCondition.InsuredEvent]: { title: 'Insured Event' },
  [SlashingCondition.FailedMembership]: { title: 'Failed Membership' },
}

export const nodeTypeMap: NodeTypeStrategyMap = {
  [NodeType.CellNode]: { title: 'CellNode' },
  [NodeType.CellNodeEncrypted]: { title: 'CellNode Encrypted' },
  [NodeType.BlockchainRPC]: { title: 'Blockchain RPC' },
  [NodeType.WebService]: { title: 'Web Service' },
  [NodeType.BotService]: { title: 'Bot Service' },
  [NodeType.AuthenticationService]: { title: 'Authentication Sevice' },
  [NodeType.CloudWorker]: { title: 'Cloud Worker' },
  [NodeType.Ipfs]: { title: 'Web3 Storage' },
  [NodeType.CredentialRegistry]: { title: 'Credential Registry' },
}

export const liquiditySourceMap: LiquiditySourceStrategyMap = {
  [LiquiditySource.Alphabond]: { title: 'Alphabond' },
  [LiquiditySource.WalletAddress]: { title: 'Wallet Address' },
  [LiquiditySource.BankAccount]: { title: 'Bank Account' },
  [LiquiditySource.PaymentContract]: { title: 'Payment Contract' },
  [LiquiditySource.NFTAsset]: { title: 'NFT Asset' },
  [LiquiditySource.LiquidityPool]: { title: 'Liquidity Pool' },
}

export const keyTypeMap: KeyTypeStrategyMap = {
  [KeyType.Ed25519VerificationKey2018]: { title: 'Ed25519VerificationKey2018' },
  [KeyType.JwsVerificationKey2020]: { title: 'JwsVerificationKey2020' },
  [KeyType.Secp256k1VerificationKey2018]: {
    title: 'Secp256k1VerificationKey2018',
  },
}

export const keyPurposeMap: KeyPurposeStrategyMap = {
  [KeyPurpose.Authentication]: { title: 'Authentication' },
  [KeyPurpose.Encryption]: { title: 'Encryption' },
  [KeyPurpose.Verification]: { title: 'Verification' },
  [KeyPurpose.Identification]: { title: 'Identification' },
}

export const serviceTypeMap: ServiceTypeStrategyMap = {
  [ServiceType.DIDAgent]: { title: 'DID Agent' },
  [ServiceType.CosmosWeb3]: { title: 'Cosmos Web3' },
  [ServiceType.EthereumWeb3]: { title: 'Ethereum Web3' },
  [ServiceType.Web2]: { title: 'Web2' },
}

export const dataResourceTypeMap: DataResourceTypeStrategyMap = {
  [DataResourceType.SchemaOverlay]: { title: 'Schema Overlay' },
  [DataResourceType.MobileIdentityWallet]: { title: 'Mobile Identity Wallet' },
  [DataResourceType.PersonalDataPod]: { title: 'Personal DataPod' },
  [DataResourceType.CellNodeDB]: { title: 'Cell NodeDB' },
  [DataResourceType.EnterpriseDB]: { title: 'Enterprise DB' },
  [DataResourceType.InterplanetaryFileStore]: {
    title: 'Interplanetary File Store',
  },
}

export const termsOfUseTypeStrategyMap: TermsOfUseTypeStrategyMap = {
  [TermsOfUseType.PayPerUse]: { title: 'Pay Per Use', icon: PayPerUse },
  [TermsOfUseType.OnceOffFee]: { title: 'Once-off Fee', icon: OnceOffFee },
  [TermsOfUseType.FreeOpenSource]: {
    title: 'Free Open-source',
    icon: FreeOpenSource,
  },
  [TermsOfUseType.Proprietary]: { title: 'Proprietary', icon: Proprietary },
}
