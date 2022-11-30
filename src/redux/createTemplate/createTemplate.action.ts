import { Dispatch } from 'redux'
import { FormData } from 'common/components/JsonForm/types'
import { ApiListedEntity } from 'api/blocksync/types/entities'
import { ApiResource } from 'api/blocksync/types/resource'
import { fromBase64 } from 'js-base64'
import { v4 as uuidv4 } from 'uuid'
import {
  UpdateExistingEntityErrorAction,
  UpdateExistingEntityDidAction,
  CreateEntityTemplateActions,
  ValidatedAction,
  UpdateAssociatedTemplateAction,
  AssociatedTemplateType,
  AddAssociatedTemplateAction,
  ClearAssociatedTemplatesAction,
  RemoveAssociatedTemplateAction,
  ValidationErrorAction,
  UpdateAlphaBondInfoAction,
  AlphaBondInfo,
} from './createTemplate.types'
import { importEntityPageContent } from '../createEntityPageContent/createEntityPageContent.actions'
import { importEntityClaims } from '../createEntityClaims/createEntityClaims.actions'
import { importEntitySettings } from '../createEntitySettings/createEntitySettings.actions'
import { importEntityAdvanced } from '../createEntityAdvanced/createEntityAdvanced.actions'
import { Ixo } from '@ixo/ixo-apimodule'
import { RelayerInfo } from 'redux/configs/configs.types'
import { RootState } from 'redux/types'
import { EntityType } from 'modules/Entities/types'
import { importEntityAttestations } from '../createEntityAttestation/createEntityAttestation.actions'
import { replaceLegacyPDSInPageContent } from 'modules/Entities/Entities.utils'

export const updateExistingEntityError = (): UpdateExistingEntityErrorAction => ({
  type: CreateEntityTemplateActions.UpdateExistingEntityError,
})

export const updateExistingEntityDid = (formData: FormData): UpdateExistingEntityDidAction => {
  const { existingEntityDid, sourceNet } = formData

  return {
    type: CreateEntityTemplateActions.UpdateExistingEntityDid,
    payload: {
      existingEntityDid,
      sourceNet,
    },
  }
}

export const fetchExistingEntity =
  (did: string, relayerName: string) =>
  (dispatch: Dispatch, getState: () => RootState): any => {
    const { configs } = getState()
    const { relayersConfig } = configs

    if (!relayerName) {
      dispatch({
        type: CreateEntityTemplateActions.FetchExistingEntityFailure,
      })
      return
    }
    const sourceNet: RelayerInfo = relayersConfig.filter((relayer: any) => relayer.name === relayerName)[0]

    const blockSyncApi = new Ixo(sourceNet.blocksync)

    const fetchEntity: Promise<ApiListedEntity> = blockSyncApi.project.getProjectByProjectDid(did)

    const fetchContent = (key: string, cellNodeEndpoint: string): Promise<ApiResource> =>
      blockSyncApi.project.fetchPublic(key, cellNodeEndpoint) as Promise<ApiResource>

    fetchEntity
      .then((apiEntity: ApiListedEntity): any => {
        let cellNodeEndpoint =
          apiEntity.data.nodes.items.find((item) => item['@type'] === 'CellNode')?.serviceEndpoint ?? null

        if (!cellNodeEndpoint) {
          alert('CellNode does not exist!')
          return dispatch({
            type: CreateEntityTemplateActions.FetchExistingEntityFailure,
          })
        }

        cellNodeEndpoint = cellNodeEndpoint + (cellNodeEndpoint.slice(-1) === '/' ? '' : '/')

        cellNodeEndpoint = cellNodeEndpoint.replace('pds_pandora.ixo.world', 'cellnode-pandora.ixo.earth')
        return fetchContent(apiEntity.data.page.cid, cellNodeEndpoint).then((resourceData: ApiResource) => {
          const content: any = JSON.parse(fromBase64(resourceData.data))
          let identifiers: string[] = []
          if (apiEntity.data['@type'] === EntityType.Template) {
            const attestation = {
              claimInfo: content.claimInfo,
              questions: content.forms.reduce((obj: any, item: any) => {
                const uuid = Object.keys(item['uiSchema'])[0]
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    attributeType: item['@type'],
                    title: item['schema']['title'],
                    description: item['schema']['description'],
                    required: item['schema']['required'].length > 0,
                    id: uuid,
                    type: item['schema']['properties'][uuid]['type'],
                    label: item['schema']['properties'][uuid]['title'],
                    values: item['schema']['properties'][uuid]['enum'],
                    initialValue: item['schema']['properties'][uuid]['default'],
                    itemValues: item['schema']['properties'][uuid]['items']['enum'],
                    itemLabels: item['schema']['properties'][uuid]['items']['enumNames'],
                    minItems: item['schema']['properties'][uuid]['minItems'],
                    maxItems: item['schema']['properties'][uuid]['maxItems'],
                    control: item['uiSchema'][uuid]['ui:widget'],
                    placeholder: item['uiSchema'][uuid]['ui:placeholder'],
                    itemImages: item['uiSchema'][uuid]['ui:images'],
                    inline: item['uiSchema'][uuid]['ui:options']['inline'],
                  },
                }
              }, {}),
            }
            const validation = {
              claiminfo: {
                errors: [],
                identifier: 'claiminfo',
                validated: true,
              },
              ...identifiers.reduce((obj, identifier) => {
                return {
                  ...obj,
                  [identifier]: {
                    identifier,
                    validated: true,
                    errors: [],
                  },
                }
              }, {}),
            }

            dispatch(
              importEntityAttestations({
                validation,
                ...attestation,
              }),
            )
          } else {
            // Entity type: except Template
            const { header, body, images, profiles, social, embedded } = replaceLegacyPDSInPageContent(content)

            const pageContent = {
              header: {
                title: header.title,
                shortDescription: header.shortDescription,
                sdgs: header.sdgs,
                brand: header.brand,
                location: header.location,
                headerFileSrc: header.image,
                headerFileUploading: false,
                logoFileSrc: header.logo,
                logoFileUploading: false,
              },
              body: body.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    title: item.title,
                    content: item.content,
                    fileSrc: item.image,
                    uploading: false,
                  },
                }
              }, {}),
              images: images.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    title: item.title,
                    content: item.content,
                    fileSrc: item.image,
                    uploading: false,
                  },
                }
              }, {}),
              profiles: profiles.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    name: item.name,
                    position: item.position,
                    fileSrc: item.image,
                    uploading: false,
                    linkedInUrl: item.linkedInUrl,
                    twitterUrl: item.twitterUrl,
                  },
                }
              }, {}),
              social: {
                linkedInUrl: social.linkedInUrl,
                facebookUrl: social.facebookUrl,
                twitterUrl: social.twitterUrl,
                discourseUrl: social.discourseUrl,
                instagramUrl: social.instagramUrl,
                telegramUrl: social.telegramUrl,
                githubUrl: social.githubUrl,
                otherUrl: social.otherUrl,
              },
              embedded: embedded.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)
                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    title: item.title,
                    urls: item.urls,
                  },
                }
              }, {}),
            }

            const validation = {
              header: {
                identifier: 'header',
                validated: true,
                errors: [],
              },
              social: {
                identifier: 'social',
                validated: true,
                errors: [],
              },
              ...identifiers.reduce((obj, identifier) => {
                return {
                  ...obj,
                  [identifier]: {
                    identifier,
                    validated: true,
                    errors: [],
                  },
                }
              }, {}),
            }

            dispatch(
              importEntityPageContent({
                validation,
                ...pageContent,
              }),
            )

            const { entityClaims } = apiEntity.data
            identifiers = []

            dispatch(
              importEntityClaims({
                entityClaims: entityClaims.items.reduce((obj, entityClaim) => {
                  const uuid = uuidv4()
                  identifiers.push(uuid)

                  return {
                    ...obj,
                    [uuid]: {
                      id: uuid,
                      template: {
                        id: uuidv4(),
                        entityClaimId: uuid,
                        templateId: entityClaim['@id'],
                        title: entityClaim.title,
                        description: entityClaim.description,
                        isPrivate: entityClaim.visibility !== 'Public',
                        minTargetClaims: entityClaim.targetMin,
                        maxTargetClaims: entityClaim.targetMax,
                        goal: entityClaim.goal,
                        submissionStartDate: entityClaim.startDate,
                        submissionEndDate: entityClaim.endDate,
                      },
                      agentRoles: entityClaim.agents.reduce((obj, agent) => {
                        const uuid = uuidv4()
                        identifiers.push(uuid)

                        return {
                          ...obj,
                          [uuid]: {
                            id: uuid,
                            entityClaimId: entityClaim['@id'],
                            role: agent.role,
                            autoApprove: agent.autoApprove,
                            credential: agent.credential,
                          },
                        }
                      }, {}),
                      evaluations: entityClaim.claimEvaluation.reduce((obj, evaluation) => {
                        const uuid = uuidv4()
                        identifiers.push(uuid)

                        return {
                          ...obj,
                          [uuid]: {
                            id: uuid,
                            entityClaimId: entityClaim['@id'],
                            context: evaluation['@context'],
                            contextLink: evaluation['@context'],
                            evaluationAttributes: evaluation.attributes,
                            evaluationMethodology: evaluation.methodology,
                          },
                        }
                      }, {}),
                      approvalCriteria: entityClaim.claimApproval.reduce((obj, approval) => {
                        const uuid = uuidv4()
                        identifiers.push(uuid)

                        return {
                          ...obj,
                          [uuid]: {
                            id: uuid,
                            entityClaimId: entityClaim['@id'],
                            context: approval['@context'],
                            contextLink: approval['@context'],
                            approvalAttributes: approval.criteria,
                          },
                        }
                      }, {}),
                      enrichments: entityClaim.claimEnrichment.reduce((obj, enrichment) => {
                        const uuid = uuidv4()
                        identifiers.push(uuid)

                        return {
                          ...obj,
                          [uuid]: {
                            id: uuid,
                            entityClaimId: entityClaim['@id'],
                            context: enrichment['@context'],
                            contextLink: enrichment['@context'],
                            resources: enrichment.resources,
                          },
                        }
                      }, {}),
                    },
                  }
                }, {}),
                validation: {
                  ...identifiers.reduce((obj, identifier) => {
                    return {
                      ...obj,
                      [identifier]: {
                        identifier,
                        validated: true,
                        errors: [],
                      },
                    }
                  }, {}),
                  creator: {
                    identifier: 'creator',
                    validated: true,
                    errors: [],
                  },
                  owner: {
                    identifier: 'owner',
                    validated: true,
                    errors: [],
                  },
                  status: {
                    identifier: 'status',
                    validated: true,
                    errors: [],
                  },
                  headline: {
                    identifier: 'headline',
                    validated: true,
                    errors: [],
                  },
                  version: {
                    identifier: 'version',
                    validated: true,
                    errors: [],
                  },
                  termsofuse: {
                    identifier: 'termsofuse',
                    validated: true,
                    errors: [],
                  },
                  privacy: {
                    identifier: 'privacy',
                    validated: true,
                    errors: [],
                  },
                  filter: {
                    identifier: 'filter',
                    validated: true,
                    errors: [],
                  },
                },
              }),
            )
          }

          const {
            creator,
            owner,
            startDate,
            endDate,
            stage,
            version,
            // terms, //  TODO: future feature
            // privacy, //  TODO: future feature
            ddoTags,
            displayCredentials,
            headlineMetric,
            embeddedAnalytics,
            linkedEntities,
            liquidity,
            fees,
            // stake, //  TODO: future feature
            nodes,
            // keys,  //  TODO: future feature
            service,
            // data,  //  TODO: future feature
            linkedResources,
          } = apiEntity.data
          identifiers = []
          dispatch(
            importEntitySettings({
              creator: {
                displayName: creator.displayName,
                location: creator.location,
                email: creator.email,
                website: creator.website,
                mission: creator.mission,
                creatorId: creator.id,
                fileSrc: creator.logo,
                uploading: false,
              },
              owner: {
                displayName: owner.displayName,
                location: owner.location,
                email: owner.email,
                website: owner.website,
                mission: owner.mission,
                ownerId: owner.id,
                fileSrc: owner.logo,
                uploading: false,
              },
              status: {
                startDate: startDate,
                endDate: endDate,
                stage: stage,
              },
              version: {
                versionNumber: version.versionNumber,
                effectiveDate: version.effectiveDate,
              },
              termsOfUse: undefined,
              // termsOfUse: {  //  TODO: future feature
              //   type: terms['@type'],
              //   paymentTemplateId: terms.paymentTemplateId,
              // },
              // privacy: {  //  TODO: future feature
              //   pageView: privacy.pageView,
              //   entityView: privacy.entityView,
              // },
              privacy: undefined,
              requiredCredentials: {},
              filters: {
                'Project Type': ddoTags[0] ? ddoTags[0].tags : [],
                SDG: ddoTags[1] ? ddoTags[1].tags : [],
                Stage: ddoTags[2] ? ddoTags[2].tags : [],
                Sector: ddoTags[3] ? ddoTags[3].tags : [],
              },
              displayCredentials: displayCredentials.items.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    credential: item.credential,
                    badge: item.badge,
                  },
                }
              }, {}),
              validation: {
                ...identifiers.reduce((obj, identifier) => {
                  return {
                    ...obj,
                    [identifier]: {
                      identifier,
                      validated: true,
                      errors: [],
                    },
                  }
                }, {}),
                creator: {
                  identifier: 'creator',
                  validated: true,
                  errors: [],
                },
                owner: {
                  identifier: 'owner',
                  validated: true,
                  errors: [],
                },
                status: {
                  identifier: 'status',
                  validated: true,
                  errors: [],
                },
                headline: {
                  identifier: 'headline',
                  validated: true,
                  errors: [],
                },
                version: {
                  identifier: 'version',
                  validated: true,
                  errors: [],
                },
                termsofuse: {
                  identifier: 'termsofuse',
                  validated: true,
                  errors: [],
                },
                privacy: {
                  identifier: 'privacy',
                  validated: true,
                  errors: [],
                },
                filter: {
                  identifier: 'filter',
                  validated: true,
                  errors: [],
                },
              },
              headlineTemplateId: headlineMetric ? headlineMetric.claimTemplateId : undefined,
              embeddedAnalytics: embeddedAnalytics!.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    title: item.title,
                    urls: item.urls,
                  },
                }
              }, {}),
            }),
          )

          identifiers = []
          dispatch(
            importEntityAdvanced({
              linkedEntities: linkedEntities.reduce((obj, linkedEntity) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    type: linkedEntity['@type'],
                    entityId: linkedEntity.id,
                  },
                }
              }, {}),
              payments: fees.items.reduce((obj, fee) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  ...obj,
                  [uuid]: {
                    id: uuid,
                    type: fee['@type'],
                    paymentId: fee.id,
                  },
                }
              }, {}),
              // staking: stake.items.reduce((obj, item) => { //  TODO: future feature
              //   const uuid = uuidv4()
              //   identifiers.push(uuid)

              //   return {
              //     ...obj,
              //     [uuid]: {
              //       id: uuid,
              //       stakeId: item.id,
              //       type: item['@type'],
              //       denom: item.denom,
              //       stakeAddress: item.stakeAddress,
              //       minStake: item.minStake,
              //       slashCondition: item.slashCondition,
              //       slashFactor: item.slashFactor,
              //       slashAmount: item.slashAmount,
              //       unbondPeriod: item.unbondPeriod,
              //     },
              //   }
              // }, {}),
              staking: undefined,
              nodes: nodes.items.reduce((obj, node) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  [uuid]: {
                    id: uuid,
                    type: node['@type'],
                    nodeId: node.id,
                    serviceEndpoint: node.serviceEndpoint,
                  },
                }
              }, {}),
              liquidity: liquidity
                ? liquidity.items.reduce((obj, elem) => {
                    const uuid = uuidv4()
                    identifiers.push(uuid)

                    return {
                      [uuid]: {
                        id: uuid,
                        source: elem['@type'],
                        liquidityId: elem.id,
                      },
                    }
                  }, {})
                : undefined,
              // keys: keys.items.reduce((obj, key) => {
              //   const uuid = uuidv4()
              //   identifiers.push(uuid)

              //   return {
              //     [uuid]: {
              //       id: uuid,
              //       purpose: key.purpose,
              //       type: key['@type'],
              //       keyValue: key.keyValue,
              //       controller: key.controller,
              //       signature: key.signature,
              //       dateCreated: key.dateCreated,
              //       dateUpdated: key.dateUpdated,
              //     },
              //   }
              // }, {}),
              keys: undefined, //  TODO: future feature
              services: service.reduce((obj, item) => {
                const uuid = uuidv4()
                identifiers.push(uuid)

                return {
                  [uuid]: {
                    id: uuid,
                    type: item['@type'],
                    shortDescription: item.description,
                    serviceEndpoint: item.serviceEndpoint,
                    publicKey: item.publicKey,
                    properties: item.properties,
                    serviceId: item.id,
                  },
                }
              }, {}),
              // dataResources: data.reduce((obj, item) => {  // TODO: future feature
              //   const uuid = uuidv4()
              //   identifiers.push(uuid)

              //   return {
              //     [uuid]: {
              //       id: uuid,
              //       type: item['@type'],
              //       dataId: item.id,
              //       serviceEndpoint: item.serviceEndpoint,
              //       properties: item.properties,
              //     },
              //   }
              // }, {}),

              dataResources: undefined,
              linkedResources: linkedResources
                ? linkedResources.reduce((obj, item) => {
                    const uuid = uuidv4()
                    identifiers.push(uuid)

                    return {
                      [uuid]: {
                        id: uuid,
                        type: item['@type'],
                        name: item.name,
                        description: item.description,
                        path: item.path,
                      },
                    }
                  }, {})
                : undefined,
              validation: identifiers.reduce((obj, identifier) => {
                return {
                  ...obj,
                  [identifier]: {
                    identifier,
                    validated: true,
                    errors: [],
                  },
                }
              }, {}),
            }),
          )

          dispatch({
            type: CreateEntityTemplateActions.FetchExistingEntitySuccess,
          })
        })
      })
      .catch((e) => {
        console.log('import existing error', e)
        dispatch({
          type: CreateEntityTemplateActions.FetchExistingEntityFailure,
        })
      })
  }

export const validated = (identifier: string): ValidatedAction => ({
  type: CreateEntityTemplateActions.Validated,
  payload: {
    identifier,
  },
})

export const validationError = (identifier: string, errors: string[]): ValidationErrorAction => ({
  type: CreateEntityTemplateActions.ValidationError,
  payload: {
    identifier,
    errors,
  },
})

export const updateAssociatedTemplates = (payload: AssociatedTemplateType): UpdateAssociatedTemplateAction => ({
  type: CreateEntityTemplateActions.UpdateAssociatedTemplate,
  payload,
})

export const addAssociatedTemplate = (): AddAssociatedTemplateAction => ({
  type: CreateEntityTemplateActions.AddAssociatedTemplate,
  payload: {
    id: uuidv4(),
  },
})

export const clearAssociatedTemplates = (): ClearAssociatedTemplatesAction => ({
  type: CreateEntityTemplateActions.ClearAssociatedTemplates,
})

export const removeAssociatedTemplate = (id: string): RemoveAssociatedTemplateAction => ({
  type: CreateEntityTemplateActions.RemoveAssociatedTemplate,
  payload: { id },
})

export const updateAlphaBondInfo = (bondInfo: AlphaBondInfo): UpdateAlphaBondInfoAction => {
  return {
    type: CreateEntityTemplateActions.UpdateAlphaBondInfo,
    payload: bondInfo,
  }
}
