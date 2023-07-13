import Axios from 'axios'
import { get } from 'lodash'
import countryData from 'data/maps/countryLatLng.json'
import { Agent, FundSource, LiquiditySource, NodeType } from 'types/entities'
import { AgentRole } from 'redux/account/account.types'
import { PageContent } from 'redux/selectedEntity/selectedEntity.types'
import { ApiListedEntityData } from 'api/blocksync/types/entities'
import { EntityLinkedResourceConfig, TEntityDDOTagModel, TEntityServiceModel } from 'types/protocol'
import { LinkedEntity, LinkedResource, Service } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { getDaoContractInfo } from './dao'
import { CellnodePublicResource, CellnodeWeb3Resource } from '@ixo/impactxclient-sdk/types/custom_queries/cellnode'

export const getCountryCoordinates = (countryCodes: string[]): any[] => {
  const coordinates: any[] = []

  countryCodes.forEach((code) => {
    const country = countryData.find((data) => data.alpha2 === code)
    if (country) {
      coordinates.push([country.longitude, country.latitude])
    }
  })

  return coordinates
}

export const getDefaultSelectedViewCategory = (entityConfig: any): any => {
  try {
    const defaultViewCategory = entityConfig.filterSchema.view?.selectedTags[0]
    let filterView
    switch (defaultViewCategory) {
      case 'Global':
        filterView = {
          userEntities: false,
          featuredEntities: false,
          popularEntities: false,
        }
        break
      case 'My Portfolio':
        filterView = {
          userEntities: true,
          featuredEntities: false,
          popularEntities: false,
        }
        break
      case 'Featured':
        filterView = {
          userEntities: false,
          featuredEntities: true,
          popularEntities: false,
        }
        break
      case 'Popular':
        filterView = {
          userEntities: false,
          featuredEntities: false,
          popularEntities: true,
        }
        break
      default:
        filterView = {}
        break
    }
    return filterView
  } catch (e) {
    return {}
  }
}

export const getInitialSelectedCategories = (entityConfig: any): TEntityDDOTagModel[] => {
  return entityConfig?.filterSchema.ddoTags.map((ddoCategory: any) => ({
    category: ddoCategory.name,
    tags: ddoCategory.selectedTags && ddoCategory.selectedTags.length ? [...ddoCategory.selectedTags] : [],
  }))
}

export const getInitialSelectedSectors = (entityConfig: any): string => {
  try {
    return entityConfig.filterSchema.sector.selectedTag
  } catch (e) {
    return ''
  }
}

export const isUserInRolesOfEntity = (
  userDid: string,
  creatorDid: string,
  agents: Agent[],
  roles: string[],
): boolean => {
  let found = false
  if (userDid) {
    if (creatorDid === userDid) {
      if (roles.some((role) => role === AgentRole.Owner)) {
        return true
      }
    }
    agents.forEach((agent) => {
      if (agent.did === userDid) {
        if (roles.some((role) => role === agent.role)) {
          found = true
        }
      }
    })
  }

  return found
}

export const getTags = (entityConfig: any, ddoTagName: string): any[] => {
  return entityConfig.filterSchema.ddoTags.find((ddoTag: any) => ddoTag.name === ddoTagName)?.tags ?? []
}

export const replaceLegacyPDSInEntity = (data: ApiListedEntityData): ApiListedEntityData => ({
  ...data,
  image: data.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  logo: data.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  creator: {
    ...data.creator,
    logo: data.creator.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  },
  owner: {
    ...data.owner,
    logo: data.owner.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  },
})

export const replaceLegacyPDSInPageContent = (content: PageContent): PageContent => {
  const { header, body, images, profiles, social, embedded } = content

  const newHeader = {
    ...header,
    image: header.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
    logo: header.logo?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }

  const newBody = body.map((item) => ({
    ...item,
    image: item.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }))

  const newImages = images.map((item) => ({
    ...item,
    image: item.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }))

  const newProfiles = profiles.map((item) => ({
    ...item,
    image: item.image?.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth'),
  }))

  return {
    header: newHeader,
    body: newBody,
    images: newImages,
    profiles: newProfiles,
    social,
    embedded,
  }
}

export const checkIsLaunchpadFromApiListedEntityData = (ddoTags: any[]): boolean => {
  return (
    (ddoTags
      .find((ddoTag) => ddoTag.category === 'Project Type' || ddoTag.name === 'Project Type')
      ?.tags.some((tag: any) => tag === 'Candidate') ||
      ddoTags
        .find((ddoTag) => ddoTag.category === 'Oracle Type' || ddoTag.name === 'Oracle Type')
        ?.tags.some((tag: any) => tag === 'Candidate')) &&
    ddoTags
      .find((ddoTag) => ddoTag.category === 'Stage' || ddoTag.name === 'Stage')
      ?.tags.some((tag: any) => tag === 'Selection')
  )
}

export const getBondDidFromApiListedEntityData = async (data: ApiListedEntityData): Promise<string> => {
  let alphaBonds: any[] = []

  if (data.funding) {
    // TODO: should be removed
    alphaBonds = data.funding.items.filter((elem) => elem['@type'] === FundSource.Alphabond)
  } else if (data.liquidity) {
    alphaBonds = data.liquidity.items.filter((elem) => elem['@type'] === LiquiditySource.Alphabond)
  }

  return Promise.all(
    alphaBonds.map((alphaBond) => {
      return Axios.get(`${process.env.REACT_APP_GAIA_URL}/bonds/${alphaBond.id}`, {
        transformResponse: [
          (response: string): any => {
            const parsedResponse = JSON.parse(response)

            return get(parsedResponse, 'result.value', parsedResponse)
          },
        ],
      })
    }),
  ).then((bondDetails) => {
    const bondToShow = bondDetails
      .map((bondDetail) => bondDetail.data)
      .find((bond) => bond.function_type !== 'swapper_function')

    return bondToShow?.bond_did ?? undefined
  })
}

export function apiEntityToEntity(
  { entity, cwClient }: { entity: any; cwClient: CosmWasmClient },
  updateCallback: (key: string, value: any, merge?: boolean) => void,
): void {
  const { type, settings, linkedResource, service, linkedEntity } = entity
  linkedResource.concat(Object.values(settings)).forEach((item: LinkedResource) => {
    let url = ''
    const [identifier, key] = item.serviceEndpoint.split(':')
    const usedService: Service | undefined = service.find((item: any) => item.id === `{id}#${identifier}`)

    if (usedService && usedService.type.toLowerCase() === NodeType.Ipfs.toLowerCase()) {
      url = `https://${key}.ipfs.w3s.link`
    } else if (usedService && usedService.type.toLowerCase() === NodeType.CellNode.toLowerCase()) {
      url = `${usedService.serviceEndpoint}${key}`
    }

    if (item.proof && url) {
      switch (item.id) {
        case '{id}#profile': {
          fetch(url)
            .then((response) => response.json())
            .then((response) => {
              const context = response['@context']
              let image: string = response.image
              let logo: string = response.logo

              if (!image.startsWith('http')) {
                const [identifier] = image.split(':')
                let endpoint = ''
                context.forEach((item: any) => {
                  if (typeof item === 'object' && identifier in item) {
                    endpoint = item[identifier]
                  }
                })
                image = image.replace(identifier + ':', endpoint)
              }
              if (!logo.startsWith('http')) {
                const [identifier] = logo.split(':')
                let endpoint = ''
                context.forEach((item: any) => {
                  if (typeof item === 'object' && identifier in item) {
                    endpoint = item[identifier]
                  }
                })
                logo = logo.replace(identifier + ':', endpoint)
              }
              return { ...response, image, logo }
            })
            .then((profile) => {
              updateCallback('profile', profile)
            })
            .catch(() => undefined)
          break
        }
        case '{id}#creator': {
          fetch(url)
            .then((response) => response.json())
            .then((response) => response.credentialSubject)
            .then((creator) => {
              updateCallback('creator', creator)
            })
            .catch(() => undefined)
          break
        }
        case '{id}#administrator': {
          fetch(url)
            .then((response) => response.json())
            .then((response) => response.credentialSubject)
            .then((administrator) => {
              updateCallback('administrator', administrator)
            })
            .catch(() => undefined)
          break
        }
        case '{id}#page': {
          fetch(url)
            .then((response) => response.json())
            .then((response) => response.page)
            .then((page) => {
              updateCallback('page', page)
            })
            .catch(() => undefined)
          break
        }
        case '{id}#tags': {
          fetch(url)
            .then((response) => response.json())
            .then((response) => response.entityTags ?? response.ddoTags)
            .then((tags) => {
              updateCallback('tags', tags)
            })
            .catch(() => undefined)
          break
        }
        case '{id}#token': {
          fetch(url)
            .then((response) => response.json())
            .then((token) => {
              updateCallback('token', token)
            })
            .catch(() => undefined)
          break
        }
        default:
          break
      }
    }
  })

  updateCallback(
    'linkedResource',
    linkedResource.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type)),
  )
  updateCallback(
    'service',
    service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
  )

  /**
   * @description entityType === dao
   */
  if (type === 'dao') {
    linkedEntity
      .filter((item: LinkedEntity) => item.type === 'Group')
      .forEach((item: LinkedEntity) => {
        const { id } = item
        const [, coreAddress] = id.split('#')
        getDaoContractInfo({ coreAddress, cwClient })
          .then((response) => {
            updateCallback('daoGroups', { [response.coreAddress]: response }, true)
          })
          .catch(console.error)
      })
  }
}

export const LinkedResourceServiceEndpointGenerator = (
  uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
  cellnodeService?: Service,
): string => {
  if (cellnodeService?.type === NodeType.Ipfs) {
    return `${cellnodeService.id}:${(uploadResult as CellnodeWeb3Resource).cid}`
  } else if (cellnodeService?.type === NodeType.CellNode) {
    return `${cellnodeService.id}:/public/${(uploadResult as CellnodePublicResource).key}`
  }
  return `cellnode:/public/${(uploadResult as CellnodePublicResource).key}`
}

export const LinkedResourceProofGenerator = (
  uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
  cellnodeService?: Service,
): string => {
  if (cellnodeService?.type === NodeType.Ipfs) {
    return (uploadResult as CellnodeWeb3Resource).cid
  } else if (cellnodeService?.type === NodeType.CellNode) {
    return (uploadResult as CellnodePublicResource).key
  }
  return (uploadResult as CellnodePublicResource).key
}
