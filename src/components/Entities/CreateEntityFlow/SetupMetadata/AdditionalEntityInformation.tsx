import { useCreateEntityStateAsActionState } from 'hooks/entity/useCreateEntityStateAsAction'
import { EntityAdditionalInfoForm } from 'screens/CreateEntity/Forms'

export const AdditionalEntityInformation = () => {
  const { entityType, startDate, endDate, updateProfile, updateStartEndDate, profile } =
    useCreateEntityStateAsActionState()

  const handleUpdateProfile = (key: string, value: any): void => {
    updateProfile({
      ...profile,
      [key]: value,
    })
  }

  return (
    <EntityAdditionalInfoForm
      entityType={entityType}
      description={profile?.description ?? ''}
      setDescription={(description): void => handleUpdateProfile('description', description)}
      brand={profile?.brand ?? ''}
      setBrand={(brand): void => handleUpdateProfile('brand', brand)}
      location={profile?.location ?? ''}
      setLocation={(location): void => handleUpdateProfile('location', location)}
      metrics={profile?.metrics ?? []}
      setMetrics={(metrics): void => handleUpdateProfile('metrics', metrics)}
      attributes={profile?.attributes ?? []}
      setAttributes={(attributes): void => handleUpdateProfile('attributes', attributes)}
      startDate={startDate}
      endDate={endDate}
      setStartEndDate={(startDate, endDate) => {
        updateStartEndDate({
          startDate,
          endDate,
        })
      }}
    />
  )
}
