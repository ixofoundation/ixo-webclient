---
id: 952u74w9
title: component-modal
file_version: 1.1.3
app_version: 1.14.0
---

A modal used when publishing a proposal for accepting to marketplace<br/>
(MsgUpdateEntityVerified to update entityVerified: true)

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->

### 📄 src/components/Modals/AddActionModal/SetupAcceptToMarketplaceModal.tsx

<!-- collapsed -->

```tsx
29     const SetupAcceptToMarketplaceModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
30       const unverifiedEntities = useAppSelector(selectUnverifiedEntities)
31       const { owner, controller } = useCurrentEntity()
32
33       const [formData, setFormData] = useState<AcceptToMarketplaceData>(initialState)
34       const validate = useMemo(() => validateEntityDid(formData.did), [formData.did])
35       const dropdownOptions = useMemo(
36         () => unverifiedEntities.map((entity) => ({ text: entity.profile?.name || '', value: entity.id || '' })),
37         [unverifiedEntities],
38       )
39       const selectedEntity = useMemo(
40         () => unverifiedEntities.find((entity) => entity.id === formData.did),
41         [unverifiedEntities, formData.did],
42       )
43
44       useEffect(() => {
45         setFormData(action?.data ?? initialState)
46       }, [action])
47
48       useEffect(() => {
49         if (selectedEntity) {
50           const { relayerNode } = selectedEntity
51
52           const isOwner = controller.find((v) => v.startsWith('did:x:'))
53           const isGroup = controller.find((v) => v.startsWith('did:ixo:wasm:'))
54           if (isOwner) {
55             setFormData((v) => ({ ...v, relayerNodeAddress: owner, relayerNodeDid: relayerNode }))
56           } else if (isGroup) {
57             setFormData((v) => ({
58               ...v,
59               relayerNodeAddress: isGroup.replace('did:ixo:wasm:', ''),
60               relayerNodeDid: relayerNode,
61             }))
62           }
63         }
64         // eslint-disable-next-line react-hooks/exhaustive-deps
65       }, [JSON.stringify(selectedEntity)])
66
67       const handleConfirm = () => {
68         onSubmit && onSubmit({ ...action, data: formData })
69         onClose()
70       }
71
72       return (
73         <SetupActionModalTemplate
74           open={open}
75           action={action}
76           onClose={onClose}
77           onSubmit={onSubmit && handleConfirm}
78           validate={validate}
79         >
80           <FlexBox $direction='column' width='100%' $gap={2}>
81             <Dropdown
82               name={'unverified_entities'}
83               options={dropdownOptions}
84               value={formData.did}
85               placeholder='Select Entity'
86               onChange={(e) => setFormData((v) => ({ ...v, did: e.target.value }))}
87               disabled={!onSubmit}
88             />
89           </FlexBox>
90         </SetupActionModalTemplate>
91       )
92     }
```

<br/>

A modal used when transferring entity with toDid input field and validation check

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->

### 📄 src/components/Modals/TransferEntityModal/index.tsx

<!-- collapsed -->

```tsx
19     const TransferEntityModal: React.FC<Props> = ({ open, recipientDid, onClose, onSubmit }): JSX.Element => {
20       const theme = useMantineTheme()
21       const [did, setDid] = useState('')
22
23       useEffect(() => {
24         setDid('')
25       }, [open])
26
27       return (
28         // @ts-ignore
29         <Modal style={ModalStyles} isOpen={open} onRequestClose={onClose} contentLabel='Modal' ariaHideApp={false}>
30           <CloseButton onClick={onClose}>
31             <CloseIcon />
32           </CloseButton>
33
34           <FlexBox $direction='column' $gap={8} width={'700px'}>
35             <Typography weight='medium' size='xl'>
36               Transfer Entity
37             </Typography>
38
39             <FlexBox width='100%' $direction='column' $gap={4}>
40               <FlexBox $direction='column' width='100%' $gap={4}>
41                 <Typography>Paste the recipient ixo DID</Typography>
42                 <InputWithLabel
43                   name='ixo_did'
44                   height='48px'
45                   label='Recipient ixo did'
46                   inputValue={did}
47                   handleChange={(value) => setDid(value)}
48                   wrapperStyle={{
49                     color: did ? (validateDid(did) ? theme.ixoGreen : theme.ixoRed) :  theme.colors.blue[5],
50                   }}
51                 />
52                 {did && !validateDid(did) && (
53                   <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
54                     <Typography size='xl'>Not a valid ixo DID</Typography>
55                     <SvgBox color={theme.ixoRed}>
56                       <TimesCircleIcon />
57                     </SvgBox>
58                   </FlexBox>
59                 )}
60                 {did && validateDid(did) && (
61                   <FlexBox width='100%' $justifyContent='flex-end' $alignItems='center' $gap={2}>
62                     <Typography size='xl'>Valid ixo DID</Typography>
63                     <SvgBox color={theme.ixoGreen}>
64                       <CheckCircleIcon />
65                     </SvgBox>
66                   </FlexBox>
67                 )}
68               </FlexBox>
69             </FlexBox>
70
71             {onSubmit && (
72               <FlexBox width='100%'>
73                 <Button
74                   variant='primary'
75                   onClick={() => onSubmit(did)}
76                   disabled={!validateDid(did)}
77                   style={{ width: '100%' }}
78                 >
79                   Confirm
80                 </Button>
81               </FlexBox>
82             )}
83           </FlexBox>
84         </Modal>
85       )
86     }
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBaXhvLXdlYmNsaWVudCUzQSUzQWl4b2ZvdW5kYXRpb24=/docs/952u74w9).
