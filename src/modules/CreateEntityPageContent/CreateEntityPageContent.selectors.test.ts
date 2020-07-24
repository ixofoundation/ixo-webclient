import * as SUT from './CreateEntityPageContent.selectors'
import { CreateEntityPageContentState, EmbeddedPageContentType } from './types'

let state: any

beforeEach(() => {
  state = {
    createEntityPageContent: {
      header: {
        title: 'someHeaderTitle',
        shortDescription: 'someHeaderShortDescription',
        imageDid: 'someHeaderImageDid',
        imageDescription: 'someHeaderImageDescription',
        sdgs: ['sdg1', 'sdg2', 'sdg3'],
        company: 'someHeaderCompany',
        country: 'ZA',
        uploadingImage: false,
      },
      body: {
        '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someBody1Title',
          content: 'someBody1Content',
          imageDid: 'someBody1ImageDid',
          uploadingImage: false,
        },
        '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someBody2Title',
          content: 'someBody2Content',
          imageDid: 'someBody2ImageDid',
          uploadingImage: false,
        },
      },
      images: {
        'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: 'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someImage1Title',
          content: 'someImage1Content',
          imageDid: 'someImage1ImageDid',
          imageDescription: 'someImage1ImageDescription',
          uploadingImage: false,
        },
        'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someImage2Title',
          content: 'someImage2Content',
          imageDid: 'someImage2ImageDid',
          imageDescription: 'someImage2ImageDescription',
          uploadingImage: false,
        },
      },
      videos: {
        'bb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: 'bb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someVideo1Title',
          content: 'someVideo1Content',
          videoDid: 'someVideo1VideoDid',
          uploadingVideo: false,
        },
        'bb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'bb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someVideo2Title',
          content: 'someVideo2Content',
          videoDid: 'someVideo2VideoDid',
          uploadingVideo: false,
        },
      },
      profiles: {
        'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          id: 'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          name: 'someProfileName1',
          position: 'someProfilePosition1',
          linkedInUrl: 'someProfileLinkedInUrl1',
          twitterUrl: 'someProfileTwitterUrl1',
          imageDid: 'someProfileImageDid1',
          uploadingImage: false,
        },
        'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          name: 'someProfileName2',
          position: 'someProfilePosition2',
          linkedInUrl: 'someProfileLinkedInUrl2',
          twitterUrl: 'someProfileTwitterUrl2',
          imageDid: 'someProfileImageDid2',
          uploadingImage: false,
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
          type: EmbeddedPageContentType.Blog,
          urls: ['url1', 'url2'],
        },
        'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          id: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someEmbeddedTitle2',
          type: EmbeddedPageContentType.Blog,
          urls: ['url3', 'url4'],
        },
      },
    } as CreateEntityPageContentState,
  }
})

describe('CreateEntityPageContent Selectors', () => {
  describe('selectPageContent', () => {
    it('should return the createEntityPageContent property of root state', () => {
      // when ... we call the selector
      const result = SUT.selectPageContent(state)

      // then ... should return result as expected
      expect(result).toEqual(state.createEntityPageContent)
    })
  })

  describe('selectHeaderContent', () => {
    it('should return the selectHeaderContent property', () => {
      // when ... we call the selector
      const result = SUT.selectHeaderContent(state)

      // then ... should return result as expected
      expect(result).toEqual({
        title: 'someHeaderTitle',
        shortDescription: 'someHeaderShortDescription',
        imageDid: 'someHeaderImageDid',
        imageDescription: 'someHeaderImageDescription',
        sdgs: ['sdg1', 'sdg2', 'sdg3'],
        company: 'someHeaderCompany',
        country: 'ZA',
        uploadingImage: false,
      })
    })
  })

  describe('selectBodyContentSections', () => {
    it('should return the body property as an array', () => {
      // when ... we call the selector
      const result = SUT.selectBodyContentSections(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someBody1Title',
          content: 'someBody1Content',
          imageDid: 'someBody1ImageDid',
          uploadingImage: false,
        },
        {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someBody2Title',
          content: 'someBody2Content',
          imageDid: 'someBody2ImageDid',
          uploadingImage: false,
        },
      ])
    })
  })

  describe('selectImageContentSections', () => {
    it('should return the images property as an array', () => {
      // when ... we call the selector
      const result = SUT.selectImageContentSections(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: 'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someImage1Title',
          content: 'someImage1Content',
          imageDid: 'someImage1ImageDid',
          imageDescription: 'someImage1ImageDescription',
          uploadingImage: false,
        },
        {
          id: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someImage2Title',
          content: 'someImage2Content',
          imageDid: 'someImage2ImageDid',
          imageDescription: 'someImage2ImageDescription',
          uploadingImage: false,
        },
      ])
    })
  })

  describe('selectProfileContentSections', () => {
    it('should return the profiles property as an array', () => {
      // when ... we call the selector
      const result = SUT.selectProfileContentSections(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: 'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          name: 'someProfileName1',
          position: 'someProfilePosition1',
          linkedInUrl: 'someProfileLinkedInUrl1',
          twitterUrl: 'someProfileTwitterUrl1',
          imageDid: 'someProfileImageDid1',
          uploadingImage: false,
        },
        {
          id: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          name: 'someProfileName2',
          position: 'someProfilePosition2',
          linkedInUrl: 'someProfileLinkedInUrl2',
          twitterUrl: 'someProfileTwitterUrl2',
          imageDid: 'someProfileImageDid2',
          uploadingImage: false,
        },
      ])
    })
  })

  describe('selectSocialContent', () => {
    it('should return the social property', () => {
      // when ... we call the selector
      const result = SUT.selectSocialContent(state)

      // then ... should return result as expected
      expect(result).toEqual({
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

  describe('selectEmbeddedContentSections', () => {
    it('should return the embedded property', () => {
      // when ... we call the selector
      const result = SUT.selectEmbeddedContentSections(state)

      // then ... should return result as expected
      expect(result).toEqual([
        {
          id: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          title: 'someEmbeddedTitle1',
          type: 'blog',
          urls: ['url1', 'url2'],
        },
        {
          id: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someEmbeddedTitle2',
          type: 'blog',
          urls: ['url3', 'url4'],
        },
      ])
    })
  })
})
