---
id: br5pgucp
title: utils-entities
file_version: 1.1.3
app_version: 1.14.0
---

This function appears to handle converting API responses related to an entity into a more suitable internal representation. (redux state)
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/utils/entities.ts
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
267          if (item.proof && url) {
268            fetch(url)
269              .then((response) => response.json())
270              .then((response) => {
271                return response.entityClaims[0]
272              })
273              .then((claim) => {
274                updateCallback('claim', { [claim.id]: claim }, true)
275              })
276              .catch(() => undefined)
277          }
278        })
279    
280        updateCallback('linkedResource', linkedResource)
281        updateCallback(
282          'service',
283          service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
284        )
285    
286        /**
287         * @description entityType === dao
288         */
289        if (type === 'dao' && cwClient) {
290          linkedEntity
291            .filter((item: LinkedEntity) => item.type === 'Group')
292            .forEach((item: LinkedEntity) => {
293              const { id } = item
294              const [, coreAddress] = id.split('#')
295              getDaoContractInfo({ coreAddress, cwClient })
296                .then((response) => {
297                  updateCallback('daoGroups', { [response.coreAddress]: response }, true)
298                })
299                .catch((e) => {
300                  console.error('getDaoContractInfo', coreAddress, e)
301                })
302            })
303        }
304      } catch (error) {
305        console.log('apiEntityToEntity error, ', error)
306      }
307    }
```

<br/>

<br/>

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/br5pgucp).
