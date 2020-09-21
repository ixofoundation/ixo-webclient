export interface ApiPageContent {
  header: ApiPageContentHeader
  body: ApiPageContentBodySection[]
  images: ApiPageContentImage[]
  profiles: ApiPageContentProfile[]
  social: ApiPageContentSocial
  embedded: ApiPageContentEmbedded[]
}

export interface ApiPageContentHeader {
  image: string
  title: string
  shortDescription: string
  brand: string
  location: string
  sdgs: string[]
  imageDescription: string
  logo: string
}

export interface ApiPageContentBodySection {
  title: string
  content: string
  image: string
}

export interface ApiPageContentImage {
  title: string
  content: string
  image: string
  imageDescription: string
}

export interface ApiPageContentProfile {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
  image: string
}

export interface ApiPageContentSocial {
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

export interface ApiPageContentEmbedded {
  title: string
  urls: string[]
}
