import * as SUT from './CreateEntityPageContent.selectors'
import { CreateEntityPageContentState } from './types'

let state: any

beforeEach(() => {
  state = {
    createEntityPageContent: {
      header: {
        title: 'someHeaderTitle',
        shortDescription: 'someHeaderShortDescription',
        headerFileSrc: 'someHeaderfileSrc',
        logoFileSrc: 'someLogofileSrc',
        imageDescription: 'someHeaderImageDescription',
        sdgs: ['sdg1', 'sdg2', 'sdg3'],
        brand: 'someHeaderCompany',
        logo: 'someHeaderLogo',
        location: 'ZA',
        headerFileUploading: false,
        logoFileUploading: false,
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
      validation: {
        'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          identifier: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          validated: false,
          errors: ['error1', 'error2'],
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
        headerFileSrc: 'someHeaderfileSrc',
        logoFileSrc: 'someLogofileSrc',
        imageDescription: 'someHeaderImageDescription',
        sdgs: ['sdg1', 'sdg2', 'sdg3'],
        brand: 'someHeaderCompany',
        logo: 'someHeaderLogo',
        location: 'ZA',
        headerFileUploading: false,
        logoFileUploading: false,
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
          fileSrc: 'someBody1fileSrc',
          uploading: false,
        },
        {
          id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someBody2Title',
          content: 'someBody2Content',
          fileSrc: 'someBody2fileSrc',
          uploading: false,
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
          fileSrc: 'someImage1fileSrc',
          imageDescription: 'someImage1ImageDescription',
          uploading: false,
        },
        {
          id: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someImage2Title',
          content: 'someImage2Content',
          fileSrc: 'someImage2fileSrc',
          imageDescription: 'someImage2ImageDescription',
          uploading: false,
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
          fileSrc: 'someProfilefileSrc1',
          uploading: false,
        },
        {
          id: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          name: 'someProfileName2',
          position: 'someProfilePosition2',
          linkedInUrl: 'someProfileLinkedInUrl2',
          twitterUrl: 'someProfileTwitterUrl2',
          fileSrc: 'someProfilefileSrc2',
          uploading: false,
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
          urls: ['url1', 'url2'],
        },
        {
          id: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          title: 'someEmbeddedTitle2',
          urls: ['url3', 'url4'],
        },
      ])
    })
  })

  describe('selectValidation', () => {
    it('should return the validation property', () => {
      // when ... we call the selector
      const result = SUT.selectValidation(state)

      // then ... should return result as expected
      expect(result).toEqual({
        'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
          identifier: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          validated: true,
          errors: [],
        },
        'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
          identifier: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          validated: false,
          errors: ['error1', 'error2'],
        },
      })
    })
  })

  describe('selectValidationComplete', () => {
    it('should return false if not every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityPageContent: {
          ...state.createEntityPageContent,
          validation: {
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityPageContent: {
          ...state.createEntityPageContent,
          validation: {
            social: {},
            header: {},
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
          },
        },
      }

      const result = SUT.selectValidationComplete(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })

  describe('selectValidated', () => {
    it('should return false if any section has not completed validation', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityPageContent: {
          ...state.createEntityPageContent,
          validation: {
            social: {},
            header: {},
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
            'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {},
            'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {},
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })
    it('should return false if any section has not been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityPageContent: {
          ...state.createEntityPageContent,
          validation: {
            social: {
              identifier: 'social',
              validated: true,
              errors: [],
            },
            header: {
              identifier: 'header',
              validated: false,
              errors: ['error1', 'error2'],
            },
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: false,
              errors: ['error1', 'error2'],
            },
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: 'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: 'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(false)
    })

    it('should return true if every section has been validated successfully', () => {
      // when ... we call the selector
      state = {
        ...state,
        createEntityPageContent: {
          ...state.createEntityPageContent,
          validation: {
            social: {
              identifier: 'social',
              validated: true,
              errors: [],
            },
            header: {
              identifier: 'header',
              validated: true,
              errors: [],
            },
            '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: 'ab1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: 'ab9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: 'cb1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: 'cb9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
            'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d': {
              identifier: 'db1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              validated: true,
              errors: [],
            },
            'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed': {
              identifier: 'db9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
              validated: true,
              errors: [],
            },
          },
        },
      }

      const result = SUT.selectValidated(state)

      // then ... should return result as expected
      expect(result).toEqual(true)
    })
  })
})
