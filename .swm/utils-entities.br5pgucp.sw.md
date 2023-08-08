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
133    export function apiEntityToEntity(
134      { entity, cwClient }: { entity: any; cwClient: CosmWasmClient },
135      updateCallback: (key: string, value: any, merge?: boolean) => void,
136    ): void {
137      const { type, settings, linkedResource, service, linkedEntity, linkedClaim } = entity
138      linkedResource.concat(Object.values(settings)).forEach((item: LinkedResource) => {
139        const url = serviceEndpointToUrl(item.serviceEndpoint, service)
140    
141        if (item.proof && url) {
142          if (item.type === 'Settings' || item.type === 'VerifiableCredential') {
143            switch (item.id) {
144              case '{id}#profile': {
145                fetch(url)
146                  .then((response) => response.json())
147                  .then((response) => {
148                    const context = response['@context']
149                    let image: string = response.image
150                    let logo: string = response.logo
151    
152                    if (image && !image.startsWith('http')) {
153                      const [identifier] = image.split(':')
154                      let endpoint = ''
155                      context.forEach((item: any) => {
156                        if (typeof item === 'object' && identifier in item) {
157                          endpoint = item[identifier]
158                        }
159                      })
160                      image = image.replace(identifier + ':', endpoint)
161                    }
162                    if (logo && !logo.startsWith('http')) {
163                      const [identifier] = logo.split(':')
164                      let endpoint = ''
165                      context.forEach((item: any) => {
166                        if (typeof item === 'object' && identifier in item) {
167                          endpoint = item[identifier]
168                        }
169                      })
170                      logo = logo.replace(identifier + ':', endpoint)
171                    }
172                    return { ...response, image, logo }
173                  })
174                  .then((profile) => {
175                    updateCallback('profile', profile)
176                  })
177                  .catch((e) => {
178                    console.error(`Error Fetching Profile ${entity.id}`, e)
179                    return undefined
180                  })
181                break
182              }
183              case '{id}#creator': {
184                fetch(url)
185                  .then((response) => response.json())
186                  .then((response) => response.credentialSubject)
187                  .then((creator) => {
188                    updateCallback('creator', creator)
189                  })
190                  .catch(() => undefined)
191                break
192              }
193              case '{id}#administrator': {
194                fetch(url)
195                  .then((response) => response.json())
196                  .then((response) => response.credentialSubject)
197                  .then((administrator) => {
198                    updateCallback('administrator', administrator)
199                  })
200                  .catch(() => undefined)
201                break
202              }
203              case '{id}#page': {
204                fetch(url)
205                  .then((response) => response.json())
206                  .then((response) => response.page)
207                  .then((page) => {
208                    updateCallback('page', page)
209                  })
210                  .catch(() => undefined)
211                break
212              }
213              case '{id}#tags': {
214                fetch(url)
215                  .then((response) => response.json())
216                  .then((response) => response.entityTags ?? response.ddoTags)
217                  .then((tags) => {
218                    updateCallback('tags', tags)
219                  })
220                  .catch(() => undefined)
221                break
222              }
223              case '{id}#token': {
224                fetch(url)
225                  .then((response) => response.json())
226                  .then((token) => {
227                    updateCallback('token', token)
228                  })
229                  .catch(() => undefined)
230                break
231              }
232              default:
233                break
234            }
235          } else if (item.type === 'ClaimSchema') {
236            //
237            fetch(url)
238              .then((response) => response.json())
239              .then((response) => response.question)
240              .then((question) => {
241                updateCallback('claimQuestion', question)
242              })
243              .catch(() => undefined)
244          }
245        }
246      })
247    
248      linkedClaim.forEach((item: LinkedClaim) => {
249        const url = serviceEndpointToUrl(item.serviceEndpoint, service)
250    
251        if (item.proof && url) {
252          fetch(url)
253            .then((response) => response.json())
254            .then((response) => response.entityClaims[0])
255            .then((claim) => {
256              updateCallback('claim', { [claim.id]: claim }, true)
257            })
258            .catch(() => undefined)
259        }
260      })
261    
262      updateCallback(
263        'linkedResource',
264        linkedResource.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type)),
265      )
266      updateCallback(
267        'service',
268        service.map((item: TEntityServiceModel) => ({ ...item, id: item.id.split('#').pop() })),
269      )
270    
271      /**
272       * @description entityType === dao
273       */
274      if (type === 'dao') {
275        linkedEntity
276          .filter((item: LinkedEntity) => item.type === 'Group')
277          .forEach((item: LinkedEntity) => {
278            const { id } = item
279            const [, coreAddress] = id.split('#')
280            getDaoContractInfo({ coreAddress, cwClient })
281              .then((response) => {
282                updateCallback('daoGroups', { [response.coreAddress]: response }, true)
283              })
284              .catch(console.error)
285          })
286      }
287    }
```

<br/>

<br/>

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/br5pgucp).
