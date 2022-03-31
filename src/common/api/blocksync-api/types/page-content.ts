import { LinkedResourceType } from 'modules/Entities/types'

export interface PageContent {
  header: PageContentHeader
  body: PageContentBodySection[]
  images: PageContentImage[]
  profiles: PageContentProfile[]
  social: PageContentSocial
  embedded: PageContentEmbedded[]
  linkedResources: PageContentLinkedResources[]
}

export interface PageContentHeader {
  image: string
  title: string
  shortDescription: string
  brand: string
  location: string
  sdgs: string[]
  imageDescription: string
  logo: string
}

export interface PageContentBodySection {
  title: string
  content: string
  image: string
}

export interface PageContentImage {
  title: string
  content: string
  image: string
  imageDescription: string
}

export interface PageContentProfile {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  image: string
}

export interface PageContentSocial {
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

export interface PageContentEmbedded {
  title: string
  urls: string[]
}

export interface PageContentLinkedResources {
  type: LinkedResourceType //  "credential"
  name: string // "Meter Log"
  description: string //  "This is a log of all meter readings"
  path: string //  "https://nifty.download"
}
