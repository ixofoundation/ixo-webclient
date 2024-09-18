import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { saveCreator } from './saveCreator'
import { saveAdministrator } from './saveAdministrator'
import { savePage } from './savePage'
import { saveTags } from './saveTags'
import { saveQuestionJSON } from './saveQuestionJSON'
import { NodeType, PDS_URL } from 'types/entities'
import { LinkedResourceProofGenerator, LinkedResourceServiceEndpointGenerator } from 'utils/entities'
import { saveProfile } from './saveProfile'

export type transformEntityStateToLinkedResourcesProps = {
  profile: any
  creator: any
  administrator: any
  page: any
  ddoTags: any
  questionJSON: any
  signerDid: string
}

export const transformEntityStateToLinkedResources = async ({
  profile,
  creator,
  administrator,
  page,
  ddoTags,
  questionJSON,
  signerDid,
}: transformEntityStateToLinkedResourcesProps): Promise<LinkedResource[]> => {
  const linkedResource: LinkedResource[] = []

  const cellnodeService = {
    id: '{id}#cellnode',
    type: NodeType.CellNode,
    serviceEndpoint: PDS_URL!,
  }

  const [saveProfileRes, saveCreatorRes, saveAdministratorRes, savePageRes, saveTagsRes, saveQuestionJSONRes] =
    await Promise.allSettled([
      await saveProfile(profile, cellnodeService),
      await saveCreator(signerDid, creator, cellnodeService),
      await saveAdministrator(signerDid, administrator, cellnodeService),
      await savePage(page, cellnodeService),
      await saveTags(ddoTags, cellnodeService),
      await saveQuestionJSON(questionJSON, cellnodeService),
    ])

  if (saveProfileRes.status === 'fulfilled' && saveProfileRes.value) {
    linkedResource.push({
      id: '{id}#profile',
      type: 'Settings',
      description: 'Profile',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveProfileRes.value, cellnodeService),
      proof: LinkedResourceProofGenerator(saveProfileRes.value, cellnodeService),
      encrypted: 'false',
      right: '',
    })
  }
  if (saveCreatorRes.status === 'fulfilled' && saveCreatorRes.value) {
    linkedResource.push({
      id: '{id}#creator',
      type: 'VerifiableCredential',
      description: 'Creator',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveCreatorRes.value, cellnodeService),
      proof: LinkedResourceProofGenerator(saveCreatorRes.value, cellnodeService),
      encrypted: 'false',
      right: '',
    })
  }
  if (saveAdministratorRes.status === 'fulfilled' && saveAdministratorRes.value) {
    linkedResource.push({
      id: '{id}#administrator',
      type: 'VerifiableCredential',
      description: 'Administrator',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveAdministratorRes.value, cellnodeService),
      proof: LinkedResourceProofGenerator(saveAdministratorRes.value, cellnodeService),
      encrypted: 'false',
      right: '',
    })
  }
  if (savePageRes.status === 'fulfilled' && savePageRes.value) {
    linkedResource.push({
      id: '{id}#page',
      type: 'Settings',
      description: 'Page',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(savePageRes.value, cellnodeService),
      proof: LinkedResourceProofGenerator(savePageRes.value, cellnodeService),
      encrypted: 'false',
      right: '',
    })
  }
  if (saveTagsRes.status === 'fulfilled' && saveTagsRes.value) {
    linkedResource.push({
      id: '{id}#tags',
      type: 'Settings',
      description: 'Tags',
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveTagsRes.value, cellnodeService),
      proof: LinkedResourceProofGenerator(saveTagsRes.value, cellnodeService),
      encrypted: 'false',
      right: '',
    })
  }
  if (saveQuestionJSONRes.status === 'fulfilled' && saveQuestionJSONRes.value) {
    linkedResource.push({
      id: '{id}#surveyTemplate',
      type: 'surveyTemplate',
      description: questionJSON.description,
      mediaType: 'application/ld+json',
      serviceEndpoint: LinkedResourceServiceEndpointGenerator(saveQuestionJSONRes.value, cellnodeService),
      proof: LinkedResourceProofGenerator(saveQuestionJSONRes.value, cellnodeService),
      encrypted: 'false',
      right: '',
    })
  }

  return linkedResource
}
