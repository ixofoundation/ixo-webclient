import { Box } from 'components/App/App.styles'
import React, { useContext, useEffect } from 'react'
import { TDAOMetadataModel } from 'types/protocol'
import styled from 'styled-components'
import { DAOProfileForm, EntityAdditionalInfoForm } from 'pages/CreateEntity/Forms'
import { Button } from 'pages/CreateEntity/Components'
import { EditEntityContext } from 'pages/EditEntity/EditEntity'
import { useHistory, useParams } from 'react-router-dom'

const PageWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  gap: 50px;
`

const EditMetadata: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const entity = useContext(EditEntityContext)

  const profile: TDAOMetadataModel = entity.profile as TDAOMetadataModel

  const canSubmit = true

  const handlePrev = (): void => {
    history.goBack()
  }
  const handleNext = (): void => {
    history.push(`/edit/entity/${entityId}/groups`)
  }

  const handleUpdateProfile = (key: string, value: any): void => {
    entity.updatePartial('profile', { [key]: value }, true)
  }

  useEffect(() => {
    entity.updatePartial('subtitle', 'Profile')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      <Box className='d-flex flex-column'>
        {/* <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={entity.localisation} setLocalisation={handleUpdateLocalisation} />
        </Box> */}
        <Box className='mb-2' />
        <DAOProfileForm
          image={profile?.image}
          setImage={(image): void => handleUpdateProfile('image', image)}
          logo={profile?.logo}
          setLogo={(logo): void => handleUpdateProfile('logo', logo)}
          orgName={profile?.orgName ?? ''}
          setOrgName={(orgName): void => handleUpdateProfile('orgName', orgName)}
          name={profile?.name ?? ''}
          setName={(name): void => handleUpdateProfile('name', name)}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <EntityAdditionalInfoForm
            entityType={entity.entityType}
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
            startDate={profile?.startDate ?? ''}
            endDate={profile?.endDate ?? ''}
            setStartEndDate={(startDate, endDate) => {
              entity.updatePartial('profile', { startDate, endDate }, true)
            }}
          />
        </Box>

        <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button size='full' height={48} variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button size='full' height={48} variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EditMetadata
