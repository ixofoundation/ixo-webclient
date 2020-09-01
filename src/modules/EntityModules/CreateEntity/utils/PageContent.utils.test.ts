import * as SUT from './PageContent.utils'
import { CreateEntityPageContentState } from 'modules/EntityModules/CreateEntityPageContent/types'
import { RootState } from 'common/redux/types'

const state = {
  createEntityPageContent: {
    header: {
      title: 'someHeaderTitle',
      shortDescription: 'someHeaderShortDescription',
      fileSrc: 'someHeaderfileSrc',
      imageDescription: 'someHeaderImageDescription',
      sdgs: ['sdg1', 'sdg2', 'sdg3'],
      organisation: 'someHeaderCompany',
      location: 'ZA',
      uploading: false,
    },
    body: {
      '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        title: 'someBody1Title',
        content: 'someBody1Content',
        fileSrc: 'someBody1fileSrc',
        uploading: false,
      },
      '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        title: 'someBody2Title',
        content: 'someBody2Content',
        fileSrc: 'someBody2fileSrc',
        uploading: false,
      },
    },
    images: {
      'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
        id: 'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        title: 'someImage1Title',
        content: 'someImage1Content',
        fileSrc: 'someImage1fileSrc',
        imageDescription: 'someImage1ImageDescription',
        uploading: false,
      },
      'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
        id: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        title: 'someImage2Title',
        content: 'someImage2Content',
        fileSrc: 'someImage2fileSrc',
        imageDescription: 'someImage2ImageDescription',
        uploading: false,
      },
    },
    profiles: {
      'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
        id: 'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        name: 'someProfileName1',
        position: 'someProfilePosition1',
        linkedInUrl: 'someProfileLinkedInUrl1',
        twitterUrl: 'someProfileTwitterUrl1',
        fileSrc: 'someProfilefileSrc1',
        uploading: false,
      },
      'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
        id: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: 'someProfileName2',
        position: 'someProfilePosition2',
        linkedInUrl: 'someProfileLinkedInUrl2',
        twitterUrl: 'someProfileTwitterUrl2',
        fileSrc: 'someProfilefileSrc2',
        uploading: false,
      },
    },
    social: {
      linkedInUrl: 'someSocialLinkedInUrl',
      facebookUrl: 'someSocialFacebookUrl',
      twitterUrl: 'someSocialTwitterUrl',
      discourseUrl: 'someSocialDiscourseUrl',
      instagramUrl: 'someSocialInstagramUrl',
      telegramUrl: 'someSocialTelegramUrl',
      githubUrl: 'someSocialGithubUrl',
      otherUrl: 'someSocialOtherUrl',
    },
    embedded: {
      'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
        id: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        title: 'someEmbeddedTitle1',
        urls: ['url1', 'url2'],
      },
      'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
        id: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        title: 'someEmbeddedTitle2',
        urls: ['url3', 'url4'],
      },
    },
    validation: {},
  } as CreateEntityPageContentState,
} as RootState

describe('PageContent utils', () => {
  describe('generateHeader', () => {
    it('should generate the header for the page content payload', () => {
      // when we call generateHeader it should return the correct payload
      const header = SUT.generateHeader(state)

      expect(header).toEqual({
        title: 'someHeaderTitle',
        shortDescription: 'someHeaderShortDescription',
        image: 'someHeaderfileSrc',
        imageDescription: 'someHeaderImageDescription',
        sdgs: ['sdg1', 'sdg2', 'sdg3'],
        organisation: 'someHeaderCompany',
        location: 'ZA',
      })
    })
  })

  describe('generateBody', () => {
    it('should generate the body sections for the page content payload', () => {
      // when we call generateBody it should return the correct payload
      const body = SUT.generateBody(state)

      expect(body).toEqual([
        {
          title: 'someBody1Title',
          content: 'someBody1Content',
          image: 'someBody1fileSrc',
        },
        {
          title: 'someBody2Title',
          content: 'someBody2Content',
          image: 'someBody2fileSrc',
        },
      ])
    })
  })

  describe('generateImages', () => {
    it('should generate the images sections for the page content payload', () => {
      // when we call generateImages it should return the correct payload
      const images = SUT.generateImages(state)

      expect(images).toEqual([
        {
          title: 'someImage1Title',
          content: 'someImage1Content',
          image: 'someImage1fileSrc',
          imageDescription: 'someImage1ImageDescription',
        },
        {
          title: 'someImage2Title',
          content: 'someImage2Content',
          image: 'someImage2fileSrc',
          imageDescription: 'someImage2ImageDescription',
        },
      ])
    })
  })

  describe('generateProfiles', () => {
    it('should generate the profiles sections for the page content payload', () => {
      // when we call generateProfiles it should return the correct payload
      const profiles = SUT.generateProfiles(state)

      expect(profiles).toEqual([
        {
          name: 'someProfileName1',
          position: 'someProfilePosition1',
          linkedInUrl: 'someProfileLinkedInUrl1',
          twitterUrl: 'someProfileTwitterUrl1',
          image: 'someProfilefileSrc1',
        },
        {
          name: 'someProfileName2',
          position: 'someProfilePosition2',
          linkedInUrl: 'someProfileLinkedInUrl2',
          twitterUrl: 'someProfileTwitterUrl2',
          image: 'someProfilefileSrc2',
        },
      ])
    })
  })

  describe('generateSocial', () => {
    it('should generate the social section for the page content payload', () => {
      // when we call generateSocial it should return the correct payload
      const social = SUT.generateSocial(state)

      expect(social).toEqual({
        linkedInUrl: 'someSocialLinkedInUrl',
        facebookUrl: 'someSocialFacebookUrl',
        twitterUrl: 'someSocialTwitterUrl',
        discourseUrl: 'someSocialDiscourseUrl',
        instagramUrl: 'someSocialInstagramUrl',
        telegramUrl: 'someSocialTelegramUrl',
        githubUrl: 'someSocialGithubUrl',
        otherUrl: 'someSocialOtherUrl',
      })
    })
  })

  describe('generateEmbedded', () => {
    it('should generate the embedded sections for the page content payload', () => {
      // when we call generateEmbedded it should return the correct payload
      const embedded = SUT.generateEmbedded(state)

      expect(embedded).toEqual([
        {
          title: 'someEmbeddedTitle1',
          urls: ['url1', 'url2'],
        },
        {
          title: 'someEmbeddedTitle2',
          urls: ['url3', 'url4'],
        },
      ])
    })
  })

  describe('generatePageContentPayload', () => {
    it('should generate the page content payload', () => {
      // when we call generatePageContentPayload it should return the correct payload
      const pageContent = SUT.generatePageContentPayload(state)

      expect(pageContent).toEqual({
        header: {
          title: 'someHeaderTitle',
          shortDescription: 'someHeaderShortDescription',
          image: 'someHeaderfileSrc',
          imageDescription: 'someHeaderImageDescription',
          sdgs: ['sdg1', 'sdg2', 'sdg3'],
          organisation: 'someHeaderCompany',
          location: 'ZA',
        },
        body: [
          {
            title: 'someBody1Title',
            content: 'someBody1Content',
            image: 'someBody1fileSrc',
          },
          {
            title: 'someBody2Title',
            content: 'someBody2Content',
            image: 'someBody2fileSrc',
          },
        ],
        images: [
          {
            title: 'someImage1Title',
            content: 'someImage1Content',
            image: 'someImage1fileSrc',
            imageDescription: 'someImage1ImageDescription',
          },
          {
            title: 'someImage2Title',
            content: 'someImage2Content',
            image: 'someImage2fileSrc',
            imageDescription: 'someImage2ImageDescription',
          },
        ],
        profiles: [
          {
            name: 'someProfileName1',
            position: 'someProfilePosition1',
            linkedInUrl: 'someProfileLinkedInUrl1',
            twitterUrl: 'someProfileTwitterUrl1',
            image: 'someProfilefileSrc1',
          },
          {
            name: 'someProfileName2',
            position: 'someProfilePosition2',
            linkedInUrl: 'someProfileLinkedInUrl2',
            twitterUrl: 'someProfileTwitterUrl2',
            image: 'someProfilefileSrc2',
          },
        ],
        social: {
          linkedInUrl: 'someSocialLinkedInUrl',
          facebookUrl: 'someSocialFacebookUrl',
          twitterUrl: 'someSocialTwitterUrl',
          discourseUrl: 'someSocialDiscourseUrl',
          instagramUrl: 'someSocialInstagramUrl',
          telegramUrl: 'someSocialTelegramUrl',
          githubUrl: 'someSocialGithubUrl',
          otherUrl: 'someSocialOtherUrl',
        },
        embedded: [
          {
            title: 'someEmbeddedTitle1',
            urls: ['url1', 'url2'],
          },
          {
            title: 'someEmbeddedTitle2',
            urls: ['url3', 'url4'],
          },
        ],
      })
    })
  })
})
