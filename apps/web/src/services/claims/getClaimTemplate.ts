import { getEntity } from 'api/blocksync/getEntity'
import { ClaimCollection } from 'generated/graphql'
import { getEntityProfile } from 'services/entities'

interface EntityProfile {
  name: string;
}

interface SelectOption {
  value: string;
  label: string;
}

export const getClaimTemplateProfile = async ({ protocolId }: { protocolId: string }): Promise<EntityProfile> => {
  const entity = await getEntity({ id: protocolId });
  return await getEntityProfile(entity.settings['Profile'], entity.service);
}

export const claimCollectionSelectOptions = async (claimCollections: ClaimCollection[]): Promise<SelectOption[]> => {
  return Promise.all(claimCollections.map(async (claimCollection): Promise<SelectOption> => {
    const profile = await getClaimTemplateProfile({ protocolId: claimCollection.protocol });
    return {
      value: claimCollection.id,
      label: profile.name
    };
  }));
}
