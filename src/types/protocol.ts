import { ReactComponent as CreatorIcon } from 'assets/images/icon-creator.svg'
import { ReactComponent as ControllerIcon } from 'assets/images/icon-controller.svg'
import { ReactComponent as TagsIcon } from 'common/components/Filters/IconListFilter/assets/icons/tag.svg'
import { ReactComponent as PageIcon } from 'assets/images/icon-laptop.svg'
import { ReactComponent as ServicesIcon } from 'common/components/Filters/IconListFilter/assets/icons/global.svg'
import { ReactComponent as PaymentIcon } from 'assets/images/icon-payment.svg'
import { ReactComponent as LiquidityIcon } from 'assets/images/icon-investment.svg'

export const EntitySettingsConfig = {
  creator: {
    text: 'Creator',
    icon: CreatorIcon,
    required: true,
  },
  controller: {
    text: 'Controller',
    icon: ControllerIcon,
    required: true,
  },
  tags: {
    text: 'Tags',
    icon: TagsIcon,
    required: true,
  },
  page: {
    text: 'Page',
    icon: PageIcon,
    required: true,
  },
  services: {
    text: 'Services',
    icon: ServicesIcon,
    required: true,
  },
  payments: {
    text: 'Payments',
    icon: PaymentIcon,
  },
  liquidity: {
    text: 'Liquidiy',
    icon: LiquidityIcon,
  },
}

export interface TEntityCreatorModel {
  image: string
  displayName: string
  email: string
  country: string
  identifier: string
  credential: string
  mission: string
  encrypted?: boolean
  mutable?: boolean
}

export interface TEntityServiceModel {
  id: string //  did:ixo:entity:abc123#cellnode-pandora
  type: 'cellnode' | 'chainService' | 'linkedDomains'
  serviceEndpoint: string
}

// TODO:
export interface TEntityLiquidityModel {
  source: string
  liquidityId: string
}

export enum EAssetType {
  ImpactToken = 'Impact Token',
  Commodity = 'Commodity',
  Inventory = 'Inventory',
  Data = 'Data',
  Equipment = 'Equipment',
  Digital = 'Digital',
  Carbon = 'Carbon',
  RealEstate = 'Real Estate',
  Bond = 'Bond',
  Outcome = 'Outcome',
  IP = 'IP',
  Brand = 'Brand',
  Equity = 'Equity',
  Income = 'Income',
  Other = 'Other',
  Wallet = 'Wallet',
  Rights = 'Rights',
}
