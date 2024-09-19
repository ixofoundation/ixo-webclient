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
145    export function apiEntityToEntity(
146      { entity, cwClient }: { entity: any; cwClient?: CosmWasmClient },
147      updateCallback: (key: string, value: any, merge?: boolean) => void,
148    ): void {
149      try {
150        const { type, settings, linkedResource, service, linkedEntity, linkedClaim } = entity
151        linkedResource?.concat(Object.values(settings || {}))?.forEach((item: LinkedResource) => {
152          const url = serviceEndpointToUrl(item.serviceEndpoint, service)
153
154          if (item.proof && url) {
155            if (item.type === 'Settings' || item.type === 'VerifiableCredential') {
156              switch (item.id) {
157                case '{id}#profile': {
158                  fetch(url)
159                    .then((response) => response.json())
160                    .then((response) => {
161                      const context = response['@context']
162                      let image: string = response.image
163                      let logo: string = response.logo
164
165                      if (image && !image.startsWith('http')) {
166                        const [identifier] = image.split(':')
167                        let endpoint = ''
168                        context.forEach((item: any) => {
169                          if (typeof item === 'object' && identifier in item) {
170                            endpoint = item[identifier]
171                          }
172                        })
173                        image = image.replace(identifier + ':', endpoint)
174                      }
175                      if (logo && !logo.startsWith('http')) {
176                        const [identifier] = logo.split(':')
177                        let endpoint = ''
178                        context.forEach((item: any) => {
179                          if (typeof item === 'object' && identifier in item) {
180                            endpoint = item[identifier]
181                          }
182                        })
183                        logo = logo.replace(identifier + ':', endpoint)
184                      }
185                      return { ...response, image, logo }
186                    })
187                    .then((profile) => {
188                      updateCallback('profile', profile)
189                    })
190                    .catch((e) => {
191                      console.error(`Error Fetching Profile ${entity.id}`, e)
192                      return undefined
193                    })
194                  break
195                }
196                case '{id}#creator': {
197                  fetch(url)
198                    .then((response) => response.json())
199                    .then((response) => response.credentialSubject)
200                    .then((creator) => {
201                      updateCallback('creator', creator)
202                    })
203                    .catch(() => undefined)
204                  break
205                }
206                case '{id}#administrator': {
207                  fetch(url)
208                    .then((response) => response.json())
209                    .then((response) => response.credentialSubject)
210                    .then((administrator) => {
211                      updateCallback('administrator', administrator)
212                    })
213                    .catch(() => undefined)
214                  break
215                }
216                case '{id}#page': {
217                  fetch(url)
218                    .then((response) => response.json())
219                    .then((response) => response.page)
220                    .then((page) => {
221                      updateCallback('page', page)
222                    })
223                    .catch(() => undefined)
224                  break
225                }
226                case '{id}#tags': {
227                  fetch(url)
228                    .then((response) => response.json())
229                    .then((response) => response.entityTags ?? response.ddoTags)
230                    .then((tags) => {
231                      updateCallback('tags', tags)
232                    })
233                    .catch(() => undefined)
234                  break
235                }
236                default:
237                  break
238              }
239            } else if (item.type === 'Lottie') {
240              fetch(url)
241                .then((response) => response.json())
242                .then((token) => {
243                  updateCallback('zlottie', token)
244                })
245                .catch(() => undefined)
246            } else if (item.type === 'TokenMetadata') {
247              fetch(url)
248                .then((response) => response.json())
249                .then((token) => {
250                  updateCallback('token', token)
251                })
252                .catch(() => undefined)
253            } else if (item.type === 'ClaimSchema') {
254              fetch(url)
255                .then((response) => response.json())
256                .then((response) => response.question)
257                .then((question) => {
258                  updateCallback('claimQuestion', question)
259                })
260                .catch(() => undefined)
261            }
262          }
263        })
264
265        linkedClaim.forEach((item: LinkedClaim) => {
266          const url = serviceEndpointToUrl(item.serviceEndpoint, service)
267
268          if (item.proof && url) {
269            fetch(url)
270              .then((response) => response.json())
271              .then((response) => {
272                return response.entityClaims[0]
273              })
274              .then((claim) => {
275                updateCallback('claim', { [claim.id]: claim }, true)
276              })
277              .catch(() => undefined)
278          }
279        })
280
281        updateCallback('linkedResource', linkedResource)
282        updateCallback(
283          'service',
284          service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
285        )
286
287        /**
288         * @description entityType === dao
289         */
290        if (type === 'dao' && cwClient) {
291          linkedEntity
292            .filter((item: LinkedEntity) => item.type === 'Group')
293            .forEach((item: LinkedEntity) => {
294              const { id } = item
295              const [, coreAddress] = id.split('#')
296              getDaoContractInfo({ coreAddress, cwClient })
297                .then((response) => {
298                  updateCallback('daoGroups', { [response.coreAddress]: response }, true)
299                })
300                .catch((e) => {
301                  console.error('getDaoContractInfo', coreAddress, e)
302                })
303            })
304        }
305      } catch (error) {
306        console.log('apiEntityToEntity error, ', error)
307      }
308    }
```

<br/>

<br/>

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/br5pgucp).
