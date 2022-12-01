export enum SortOptions {
  Newest = 0,
  Name,
  Price,
}

export interface TAssetCollection {
  id: string
  title: string
  subTitle: string
  description: string
  sdgs: string[]
  totalSupply: number
  image: string
  logo: string

  creator: string
  minted: string
  maxSupply: number
  owned: number
  highestPrice: number
  lowestPrice: number
  carbonCredits: number
  location: string
  make: string
  model: string
  efficiency: number
  monthlyRevenue: number
}
