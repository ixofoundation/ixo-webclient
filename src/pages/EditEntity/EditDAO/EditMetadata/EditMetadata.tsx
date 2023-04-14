import { Box } from 'components/App/App.styles'
import React, { useContext, useEffect } from 'react'
import { Typography } from 'components/Typography'
import { ELocalisation, TDAOMetadataModel } from 'types/protocol'
import styled from 'styled-components'
import { DAOProfileForm, EntityAdditionalInfoForm, LocalisationForm } from 'pages/CreateEntity/Forms'
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

  const metadata: TDAOMetadataModel = entity.metadata as TDAOMetadataModel

  const canSubmit = true

  const handlePrev = (): void => {
    history.goBack()
  }
  const handleNext = (): void => {
    history.push(`/edit/entity/${entityId}/groups`)
  }

  const handleUpdateMetadata = (key: string, value: any): void => {
    entity.updatePartial('metadata', { [key]: value }, true)
  }

  const handleUpdateLocalisation = (localisation: ELocalisation): void => {
    entity.updatePartial('localisation', localisation)
  }

  useEffect(() => {
    entity.updatePartial('subtitle', 'Profile')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      <Box className='d-flex flex-column'>
        <Box className='d-flex align-items-center justify-content-between'>
          <Typography weight='medium' size='xl'>
            Localisation:
          </Typography>
          <LocalisationForm localisation={entity.localisation} setLocalisation={handleUpdateLocalisation} />
        </Box>
        <Box className='mb-2' />
        <DAOProfileForm
          image={metadata?.image}
          setImage={(image): void => handleUpdateMetadata('image', image)}
          orgName={metadata?.orgName ?? ''}
          setOrgName={(orgName): void => handleUpdateMetadata('orgName', orgName)}
          name={metadata?.name ?? ''}
          setName={(name): void => handleUpdateMetadata('name', name)}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <EntityAdditionalInfoForm
            entityType={entity.entityType}
            description={metadata?.description ?? ''}
            setDescription={(description): void => handleUpdateMetadata('description', description)}
            brand={metadata?.brand ?? ''}
            setBrand={(brand): void => handleUpdateMetadata('brand', brand)}
            location={metadata?.location ?? ''}
            setLocation={(location): void => handleUpdateMetadata('location', location)}
            metrics={metadata?.metrics ?? []}
            setMetrics={(metrics): void => handleUpdateMetadata('metrics', metrics)}
            attributes={metadata?.attributes ?? []}
            setAttributes={(attributes): void => handleUpdateMetadata('attributes', attributes)}
            startDate={metadata?.startDate ?? ''}
            endDate={metadata?.endDate ?? ''}
            setStartEndDate={(startDate, endDate) => {
              entity.updatePartial('metadata', { startDate, endDate }, true)
            }}
          />
        </Box>

        <Box className='d-flex justify-content-end w-100 mt-4' style={{ gap: 20 }}>
          <Button variant='secondary' onClick={handlePrev}>
            Back
          </Button>
          <Button variant={'primary'} disabled={!canSubmit} onClick={handleNext}>
            Continue
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EditMetadata
