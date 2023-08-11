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
132    export function apiEntityToEntity(
133      { entity, cwClient }: { entity: any; cwClient: CosmWasmClient },
134      updateCallback: (key: string, value: any, merge?: boolean) => void,
135    ): void {
136      const { type, settings, linkedResource, service, linkedEntity, linkedClaim } = entity
137      linkedResource.concat(Object.values(settings)).forEach((item: LinkedResource) => {
138        const url = serviceEndpointToUrl(item.serviceEndpoint, service)
139    
140        if (item.proof && url) {
141          if (item.type === 'Settings' || item.type === 'VerifiableCredential') {
142            switch (item.id) {
143              case '{id}#profile': {
144                fetch(url)
145                  .then((response) => response.json())
146                  .then((response) => {
147                    const context = response['@context']
148                    let image: string = response.image
149                    let logo: string = response.logo
150    
151                    if (image && !image.startsWith('http')) {
152                      const [identifier] = image.split(':')
153                      let endpoint = ''
154                      context.forEach((item: any) => {
155                        if (typeof item === 'object' && identifier in item) {
156                          endpoint = item[identifier]
157                        }
158                      })
159                      image = image.replace(identifier + ':', endpoint)
160                    }
161                    if (logo && !logo.startsWith('http')) {
162                      const [identifier] = logo.split(':')
163                      let endpoint = ''
164                      context.forEach((item: any) => {
165                        if (typeof item === 'object' && identifier in item) {
166                          endpoint = item[identifier]
167                        }
168                      })
169                      logo = logo.replace(identifier + ':', endpoint)
170                    }
171                    return { ...response, image, logo }
172                  })
173                  .then((profile) => {
174                    updateCallback('profile', profile)
175                  })
176                  .catch((e) => {
177                    console.error(`Error Fetching Profile ${entity.id}`, e)
178                    return undefined
179                  })
180                break
181              }
182              case '{id}#creator': {
183                fetch(url)
184                  .then((response) => response.json())
185                  .then((response) => response.credentialSubject)
186                  .then((creator) => {
187                    updateCallback('creator', creator)
188                  })
189                  .catch(() => undefined)
190                break
191              }
192              case '{id}#administrator': {
193                fetch(url)
194                  .then((response) => response.json())
195                  .then((response) => response.credentialSubject)
196                  .then((administrator) => {
197                    updateCallback('administrator', administrator)
198                  })
199                  .catch(() => undefined)
200                break
201              }
202              case '{id}#page': {
203                fetch(url)
204                  .then((response) => response.json())
205                  .then((response) => response.page)
206                  .then((page) => {
207                    updateCallback('page', page)
208                  })
209                  .catch(() => undefined)
210                break
211              }
212              case '{id}#tags': {
213                fetch(url)
214                  .then((response) => response.json())
215                  .then((response) => response.entityTags ?? response.ddoTags)
216                  .then((tags) => {
217                    updateCallback('tags', tags)
218                  })
219                  .catch(() => undefined)
220                break
221              }
222              default:
223                break
224            }
225          } else if (item.type === 'Lottie') {
226            fetch(url)
227              .then((response) => response.json())
228              .then((token) => {
229                updateCallback('zlottie', token)
230              })
231              .catch(() => undefined)
232          } else if (item.type === 'TokenMetadata') {
233            fetch(url)
234              .then((response) => response.json())
235              .then((token) => {
236                updateCallback('token', token)
237              })
238              .catch(() => undefined)
239          } else if (item.type === 'ClaimSchema') {
240            //
241            fetch(url)
242              .then((response) => response.json())
243              .then((response) => response.question)
244              .then((question) => {
245                updateCallback('claimQuestion', question)
246              })
247              .catch(() => undefined)
248          }
249        }
250      })
251    
252      linkedClaim.forEach((item: LinkedClaim) => {
253        const url = serviceEndpointToUrl(item.serviceEndpoint, service)
254    
255        if (item.proof && url) {
256          fetch(url)
257            .then((response) => response.json())
258            .then((response) => response.entityClaims[0])
259            .then((claim) => {
260              updateCallback('claim', { [claim.id]: claim }, true)
261            })
262            .catch(() => undefined)
263        }
264      })
265    
266      updateCallback('linkedResource', linkedResource)
267      updateCallback(
268        'service',
269        service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
270      )
271    
272      /**
273       * @description entityType === dao
274       */
275      if (type === 'dao') {
276        linkedEntity
277          .filter((item: LinkedEntity) => item.type === 'Group')
278          .forEach((item: LinkedEntity) => {
279            const { id } = item
280            const [, coreAddress] = id.split('#')
281            getDaoContractInfo({ coreAddress, cwClient })
282              .then((response) => {
283                updateCallback('daoGroups', { [response.coreAddress]: response }, true)
284              })
285              .catch(console.error)
286          })
287      }
288    }
289    
290    export const LinkedResourceServiceEndpointGenerator = (
291      uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
292      cellnodeService?: Service,
293    ): string => {
294      if (cellnodeService) {
295        const serviceId = cellnodeService.id.replace('{id}#', '')
296        const serviceType = cellnodeService.type
297        if (serviceType === NodeType.Ipfs) {
298          return `${serviceId}:${(uploadResult as CellnodeWeb3Resource).cid}`
299        } else if (serviceType === NodeType.CellNode) {
300          return `${serviceId}:/public/${(uploadResult as CellnodePublicResource).key}`
301        }
302      }
303      return `ipfs:${(uploadResult as CellnodeWeb3Resource).cid}`
304    }
305    
306    export const LinkedResourceProofGenerator = (
307      uploadResult: CellnodePublicResource | CellnodeWeb3Resource,
308      cellnodeService?: Service,
309    ): string => {
310      if (cellnodeService) {
311        const serviceType = cellnodeService.type
312        if (serviceType === NodeType.Ipfs) {
313          return (uploadResult as CellnodeWeb3Resource).cid
314        } else if (serviceType === NodeType.CellNode) {
315          return (uploadResult as CellnodePublicResource).key
316        }
317      }
318      return (uploadResult as CellnodeWeb3Resource).cid
319    }
320    
321    export function findDAObyDelegateAccount(daos: TEntityModel[], addr: string): TEntityModel[] {
322      return daos.filter((dao) => {
323        const { linkedEntity } = dao
324        return linkedEntity.some(
325          (item) => item.id.includes(addr) && item.type === 'IndividualAccount' && item.relationship === 'delegate',
326        )
327      })
328    }
```

<br/>

<br/>

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/br5pgucp).
