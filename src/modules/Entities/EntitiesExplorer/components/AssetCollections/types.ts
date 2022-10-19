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
}
