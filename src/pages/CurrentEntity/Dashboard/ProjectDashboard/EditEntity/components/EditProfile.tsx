import { Box, FlexBox } from 'components/App/App.styles'
import React from 'react'
import { EntityAdditionalInfoForm, ProjectProfileForm } from 'pages/CreateEntity/Forms'
import useEditEntity from 'hooks/editEntity'

const EditProfile: React.FC = (): JSX.Element => {
  const { editEntity, setEditedField } = useEditEntity()

  const handleUpdateProfile = (key: string, value: any): void => {
    setEditedField('profile', { [key]: value }, true)
  }

  const handleUpdateStartEndDate = ({ startDate, endDate }: { startDate: string; endDate: string }): void => {
    setEditedField('startDate', startDate)
    setTimeout(() => {
      setEditedField('endDate', endDate)
    }, 1)
  }

  return (
    <FlexBox justifyContent='stretch' gap={12.5}>
      <Box className='d-flex flex-column'>
        <Box className='mb-2' />
        <ProjectProfileForm
          image={editEntity.profile?.image}
          setImage={(image): void => handleUpdateProfile('image', image)}
          logo={editEntity.profile?.logo || ''}
          setLogo={(logo): void => handleUpdateProfile('logo', logo)}
          orgName={editEntity.profile?.orgName ?? ''}
          setOrgName={(orgName): void => handleUpdateProfile('orgName', orgName)}
          name={editEntity.profile?.name ?? ''}
          setName={(name): void => handleUpdateProfile('name', name)}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <EntityAdditionalInfoForm
            entityType={editEntity.type!}
            description={editEntity.profile?.description ?? ''}
            setDescription={(description): void => handleUpdateProfile('description', description)}
            brand={editEntity.profile?.brand ?? ''}
            setBrand={(brand): void => handleUpdateProfile('brand', brand)}
            location={editEntity.profile?.location ?? ''}
            setLocation={(location): void => handleUpdateProfile('location', location)}
            metrics={editEntity.profile?.metrics ?? []}
            setMetrics={(metrics): void => handleUpdateProfile('metrics', metrics)}
            attributes={editEntity.profile?.attributes ?? []}
            setAttributes={(attributes): void => handleUpdateProfile('attributes', attributes)}
            startDate={editEntity.startDate as never as string}
            endDate={editEntity.endDate as never as string}
            setStartEndDate={(startDate, endDate) => {
              handleUpdateStartEndDate({
                startDate,
                endDate,
              })
            }}
          />
        </Box>
      </Box>
    </FlexBox>
  )
}

export default EditProfile
