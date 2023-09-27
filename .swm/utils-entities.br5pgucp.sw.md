---
id: br5pgucp
title: utils-entities
file_version: 1.1.3
app_version: 1.14.0
---

This function appears to handle converting API responses related to an entity into a more suitable internal representation. (redux state)
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/utils/entities.ts
<!-- collapsed -->

```typescript
143    export function apiEntityToEntity(
144      { entity, cwClient }: { entity: any; cwClient?: CosmWasmClient },
145      updateCallback: (key: string, value: any, merge?: boolean) => void,
146    ): void {
147      try {
148        const { type, settings, linkedResource, service, linkedEntity, linkedClaim } = entity
149        linkedResource?.concat(Object.values(settings || {}))?.forEach((item: LinkedResource) => {
150          const url = serviceEndpointToUrl(item.serviceEndpoint, service)
151    
152          if (item.proof && url) {
153            if (item.type === 'Settings' || item.type === 'VerifiableCredential') {
154              switch (item.id) {
155                case '{id}#profile': {
156                  fetch(url)
157                    .then((response) => response.json())
158                    .then((response) => {
159                      const context = response['@context']
160                      let image: string = response.image
161                      let logo: string = response.logo
162    
163                      if (image && !image.startsWith('http')) {
164                        const [identifier] = image.split(':')
165                        let endpoint = ''
166                        context.forEach((item: any) => {
167                          if (typeof item === 'object' && identifier in item) {
168                            endpoint = item[identifier]
169                          }
170                        })
171                        image = image.replace(identifier + ':', endpoint)
172                      }
173                      if (logo && !logo.startsWith('http')) {
174                        const [identifier] = logo.split(':')
175                        let endpoint = ''
176                        context.forEach((item: any) => {
177                          if (typeof item === 'object' && identifier in item) {
178                            endpoint = item[identifier]
179                          }
180                        })
181                        logo = logo.replace(identifier + ':', endpoint)
182                      }
183                      return { ...response, image, logo }
184                    })
185                    .then((profile) => {
186                      updateCallback('profile', profile)
187                    })
188                    .catch((e) => {
189                      console.error(`Error Fetching Profile ${entity.id}`, e)
190                      return undefined
191                    })
192                  break
193                }
194                case '{id}#creator': {
195                  fetch(url)
196                    .then((response) => response.json())
197                    .then((response) => response.credentialSubject)
198                    .then((creator) => {
199                      updateCallback('creator', creator)
200                    })
201                    .catch(() => undefined)
202                  break
203                }
204                case '{id}#administrator': {
205                  fetch(url)
206                    .then((response) => response.json())
207                    .then((response) => response.credentialSubject)
208                    .then((administrator) => {
209                      updateCallback('administrator', administrator)
210                    })
211                    .catch(() => undefined)
212                  break
213                }
214                case '{id}#page': {
215                  fetch(url)
216                    .then((response) => response.json())
217                    .then((response) => response.page)
218                    .then((page) => {
219                      updateCallback('page', page)
220                    })
221                    .catch(() => undefined)
222                  break
223                }
224                case '{id}#tags': {
225                  fetch(url)
226                    .then((response) => response.json())
227                    .then((response) => response.entityTags ?? response.ddoTags)
228                    .then((tags) => {
229                      updateCallback('tags', tags)
230                    })
231                    .catch(() => undefined)
232                  break
233                }
234                default:
235                  break
236              }
237            } else if (item.type === 'Lottie') {
238              fetch(url)
239                .then((response) => response.json())
240                .then((token) => {
241                  updateCallback('zlottie', token)
242                })
243                .catch(() => undefined)
244            } else if (item.type === 'TokenMetadata') {
245              fetch(url)
246                .then((response) => response.json())
247                .then((token) => {
248                  updateCallback('token', token)
249                })
250                .catch(() => undefined)
251            } else if (item.type === 'ClaimSchema') {
252              //
253              fetch(url)
254                .then((response) => response.json())
255                .then((response) => response.question)
256                .then((question) => {
257                  updateCallback('claimQuestion', question)
258                })
259                .catch(() => undefined)
260            }
261          }
262        })
263    
264        linkedClaim.forEach((item: LinkedClaim) => {
265          const url = serviceEndpointToUrl(item.serviceEndpoint, service)
266    
267          console.log({ url })
268    
269          if (item.proof && url) {
270            fetch(url)
271              .then((response) => response.json())
272              .then((response) => {
273                console.log({ response })
274                return response.entityClaims[0]
275              })
276              .then((claim) => {
277                updateCallback('claim', { [claim.id]: claim }, true)
278              })
279              .catch(() => undefined)
280          }
281        })
282    
283        updateCallback('linkedResource', linkedResource)
284        updateCallback(
285          'service',
286          service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
287        )
288    
289        /**
290         * @description entityType === dao
291         */
292        if (type === 'dao' && cwClient) {
293          linkedEntity
294            .filter((item: LinkedEntity) => item.type === 'Group')
295            .forEach((item: LinkedEntity) => {
296              const { id } = item
297              const [, coreAddress] = id.split('#')
298              getDaoContractInfo({ coreAddress, cwClient })
299                .then((response) => {
300                  updateCallback('daoGroups', { [response.coreAddress]: response }, true)
301                })
302                .catch(console.error)
303            })
304        }
305      } catch (error) {
306        console.log('apiEntityToEntity error, ', error)
307      }
308    }
309    
310    export const LinkedResourceServiceEndpointGenerator = (
311      uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
312      cellnodeService?: Service,
313    ): string => {
314      if (cellnodeService) {
315        const serviceId = cellnodeService.id.replace('{id}#', '')
316        const serviceType = cellnodeService.type
317        if (serviceType === NodeType.Ipfs) {
318          return `${serviceId}:${(uploadResult as CellnodeWeb3Resource).cid}`
319        } else if (serviceType === NodeType.CellNode) {
320          return `${serviceId}:/public/${(uploadResult as CellnodePublicResource).key}`
321        }
322      }
323      return `ipfs:${(uploadResult as CellnodeWeb3Resource).cid}`
324    }
325    
326    export const LinkedResourceProofGenerator = (
327      uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
328      cellnodeService?: Service,
329    ): string => {
330      if (cellnodeService) {
331        const serviceType = cellnodeService.type
332        if (serviceType === NodeType.Ipfs) {
333          return (uploadResult as CellnodeWeb3Resource).cid
334        } else if (serviceType === NodeType.CellNode) {
335          return (uploadResult as CellnodePublicResource).key
336        }
337      }
338      return (uploadResult as CellnodeWeb3Resource).cid
339    }
340    
341    export function findDAObyDelegateAccount(daos: TEntityModel[], addr: string): TEntityModel[] {
342      return daos.filter((dao) => {
343        const { linkedEntity } = dao
344        return linkedEntity.some(
345          (item) => item.id.includes(addr) && item.type === 'IndividualAccount' && item.relationship === 'delegate',
346        )
347      })
348    }
```

<br/>

<br/>

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/br5pgucp).
