export interface PageContent {
  header: Header
  body: BodySection[]
  images: Image[]
  profiles: Profile[]
  social: Social
  embedded: Embedded[]
}

export interface Header {
  image: string
  title: string
  shortDescription: string
  organisation: string
  location: string
  sdgs: string[]
  imageDescription: string
}

export interface BodySection {
  title: string
  content: string
  image: string
}

export interface Image {
  title: string
  content: string
  image: string
  imageDescription: string
}

export interface Profile {
  name: string
  position: string
  linkedInUrl: string
  twitterUrl: string
}

export interface Social {
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
}

export interface Embedded {
  title: string
  urls: string[]
}
