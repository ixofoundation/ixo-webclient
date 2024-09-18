export const getUserRole = ({
  userLinkedResources,
  collectionId,
}: {
  userLinkedResources: any[]
  collectionId: string
}) => {
  const claim = userLinkedResources?.find(
    (v) =>
      v.id === `{id}#offer#${collectionId}` && v.type === 'DeedOffer' && v.description.split('#')[0] === collectionId,
  )

  const role = claim?.description.split('#')[1]
  return role
}
