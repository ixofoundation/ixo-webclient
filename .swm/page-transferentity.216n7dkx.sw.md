---
id: 216n7dkx
title: page-transferEntity
file_version: 1.1.3
app_version: 1.15.0
---

# Routes

`/transfer/entity/{entityId}`<br/>
if entity type is 'dao' then redirect to `/transfer/entity/{entityId}/group`, otherwise to `/transfer/entity/{entityId}/to`

`/transfer/entity/{entityId}/group`

router where choose dao group address or other cosmos account did

`/transfer/entity/{entityId}/to`

router where review Transferring to and re-enabling verification method keys with description, signing tranfer

`/transfer/entity/{entityId}/review`

router where review re-enabling keys<br/>

# TransferEntity

# TransferEntityTo

<br/>

Method for creating a document as a linked resource for existing verification methods
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/TransferEntity/TransferEntityTo/index.tsx
```tsx
86       const handleCreateDocument = async (): Promise<boolean> => {
87         try {
88           const payload = {
89             reEnableKeys,
90             keys,
91           }
92           const buff = Buffer.from(JSON.stringify(payload))
93           const res = await customQueries.cellnode.uploadWeb3Doc(
94             utils.common.generateId(12),
95             'application/ld+json',
96             buff.toString('base64'),
97             undefined,
98             chainNetwork,
99           )
100    
101          const linkedResource: LinkedResource = {
102            id: '{id}#verificationMethods',
103            type: 'VerificationMethods',
104            description: 'Verification Methods',
105            mediaType: 'application/ld+json',
106            serviceEndpoint: LinkedResourceServiceEndpointGenerator(res),
107            proof: LinkedResourceProofGenerator(res),
108            encrypted: 'false',
109            right: '',
110          }
111          console.log({ linkedResource })
112    
113          const addRes = await AddLinkedResource(signingClient, signer, { linkedResource, entityId })
114          console.log('AddLinkedResource', addRes)
115          if (addRes.code !== 0) {
116            throw addRes.rawLog
117          }
118          successToast('Success', 'Successfully created document!')
119          return true
120        } catch (e) {
121          console.error('handleCreateDocument', e)
122          errorToast('Error at Signing', typeof e === 'string' && e)
123          return false
124        }
125      }
```

<br/>

Method for updating entity status from created to transferred (0 -> 2)
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/TransferEntity/TransferEntityTo/index.tsx
```tsx
127      const handleUpdateStatusToTransferred = async (): Promise<boolean> => {
128        try {
129          if (!entityId) {
130            // eslint-disable-next-line no-throw-literal
131            throw 'EntityId or RecipientDid is invalid'
132          }
133    
134          const { code, rawLog } = await UpdateEntity(signingClient, signer, { id: entityId, entityStatus: 2 })
135          if (code !== 0) {
136            throw rawLog
137          }
138          successToast('Success', 'Successfully updated status to transferred!')
139          return true
140        } catch (e) {
141          console.error('handleUpdateStatusToTransferred', e)
142          errorToast('Error at Signing', typeof e === 'string' && e)
143          return false
144        }
145      }
```

<br/>

Method for signing MsgTransferEntity.<br/>
if recipient is dao address, then create iid document for group address
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/TransferEntity/TransferEntityTo/index.tsx
```tsx
147      const handleSigningTransfer = async (): Promise<boolean> => {
148        try {
149          if (!entityId || !recipientDid) {
150            // eslint-disable-next-line no-throw-literal
151            throw 'EntityId or RecipientDid is invalid'
152          }
153          if (!(await CheckIidDoc(recipientDid))) {
154            await CreateIidDocForGroup(signingClient, signer, recipientDid)
155          }
156          const { code, rawLog } = await TransferEntity(signingClient, signer, { id: entityId, recipientDid })
157          if (code !== 0) {
158            throw rawLog
159          }
160          successToast('Success', 'Successfully transferred!')
161          return true
162        } catch (e) {
163          console.error('handleSigningTransfer', e)
164          errorToast('Error at Signing', typeof e === 'string' && e)
165          return false
166        }
167      }
```

<br/>

# TransferEntity Review Keys

<br/>

Method for adding verification methods based on user re-enabling action
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/TransferEntity/TransferEntityReview/index.tsx
```tsx
93       const handleAddVerificationMethods = async (): Promise<boolean> => {
94         try {
95           const verifications = verificationMethods
96             .filter((v) => v.reEnable)
97             .map((v) => {
98               return ixo.iid.v1beta1.Verification.fromPartial({
99                 relationships: ['authentication'],
100                method: ixo.iid.v1beta1.VerificationMethod.fromPartial({
101                  id: v.id,
102                  type: v.type,
103                  controller: v.controller,
104                  blockchainAccountID: v.blockchainAccountID,
105                  publicKeyHex: v.publicKeyHex,
106                  publicKeyMultibase: v.publicKeyMultibase,
107                  publicKeyBase58: v.publicKeyBase58,
108                }),
109              })
110            })
111    
112          const response = await AddVerificationMethod(signingClient, signer, { did: entityId, verifications })
113          if (response.code !== 0) {
114            throw response.rawLog
115          }
116          console.info('handleAddVerificationMethods', { response })
117          successToast('Success', 'Successfully updated status to transferred!')
118          return true
119        } catch (e) {
120          console.error('handleAddVerificationMethods', e)
121          errorToast('Error at Signing', typeof e === 'string' && e)
122          return false
123        }
124      }
```

<br/>

Method for update entity status back to created from transferred (2 -> 0)
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/TransferEntity/TransferEntityReview/index.tsx
```tsx
126      const handleUpdateStatusToCreated = async (): Promise<boolean> => {
127        try {
128          if (!entityId) {
129            // eslint-disable-next-line no-throw-literal
130            throw 'EntityId is invalid'
131          }
132    
133          const response = await UpdateEntity(signingClient, signer, { id: entityId, entityStatus: 0 })
134          if (response.code !== 0) {
135            throw response.rawLog
136          }
137          console.info('handleUpdateStatusToCreated', { response })
138          successToast('Success', 'Successfully updated status to back to created!')
139          return true
140        } catch (e) {
141          console.error('handleUpdateStatusToTransferred', e)
142          errorToast('Error at Signing', typeof e === 'string' && e)
143          return false
144        }
145      }
```

<br/>

Method for remove linked resouce which is document for saving verification methods temporary
<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 src/pages/TransferEntity/TransferEntityReview/index.tsx
```tsx
147      const handleRemoveDocument = async (): Promise<boolean> => {
148        try {
149          if (!transferDocument?.id || !entityId) {
150            // eslint-disable-next-line no-throw-literal
151            throw 'EntityId or documentId is invalid'
152          }
153          const addRes = await DeleteLinkedResource(signingClient, signer, { entityId, resourceId: transferDocument?.id })
154          if (addRes.code !== 0) {
155            throw addRes.rawLog
156          }
157          successToast('Success', 'Successfully removed document!')
158          return true
159        } catch (e) {
160          console.error('handleRemoveDocument', e)
161          errorToast('Error at Signing', typeof e === 'string' && e)
162          return false
163        }
164      }
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/216n7dkx).
