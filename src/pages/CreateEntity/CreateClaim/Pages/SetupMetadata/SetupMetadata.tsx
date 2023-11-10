import React, { useCallback, useMemo } from 'react'
import { Box } from 'components/App/App.styles'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from '../../../Components'
import { EntityAdditionalInfoForm, ClaimProfileForm } from '../../../Forms'
import { PageWrapper } from './SetupMetadata.styles'
import { TEntityMetadataModel } from 'types/entities'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { selectAllClaimProtocols } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'

const SetupMetadata: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const history = useHistory()
  const baseLink = match.path.split('/').slice(0, -1).join('/')

  const claimProtocols = useAppSelector(selectAllClaimProtocols)
  const createEntityState = useCreateEntityState()
  const { entityType, startDate, endDate, updateProfile, updateStartEndDate } = createEntityState
  const profile: TEntityMetadataModel = createEntityState.profile as TEntityMetadataModel

  const claimNameFound = useMemo(
    () => claimProtocols.some((entity) => entity.profile?.name === profile?.name),
    [claimProtocols, profile?.name],
  )

  const canSubmit = useMemo(
    () => !!profile && !!profile.type && !!profile.name && !!profile.description && !claimNameFound,
    [profile, claimNameFound],
  )

  const handlePrev = useCallback((): void => {
    history.push(`${baseLink}/process`)
  }, [history, baseLink])

  const handleNext = useCallback((): void => {
    history.push(`${baseLink}/collection`)
  }, [history, baseLink])

  const handleUpdateProfile = useCallback(
    (key: string, value: any): void => {
      updateProfile({
        ...profile,
        [key]: value,
      })
    },
    [updateProfile, profile],
  )

  const handleSetStartEndDate = useCallback(
    (startDate: string, endDate: string) => {
      if (updateStartEndDate) {
        updateStartEndDate({ startDate, endDate })
      }
    },
    [updateStartEndDate],
  )

  const emptyArray = useMemo(() => [], [])

  return (
    <PageWrapper>
      <Box className='d-flex flex-column'>
        <Box className='mb-2' />
        <ClaimProfileForm
          type={profile?.type || ''}
          setType={(type: string) => handleUpdateProfile('type', type)}
          title={profile?.name || ''}
          setTitle={(name: string) => handleUpdateProfile('name', name)}
          description={profile?.description || ''}
          error={{
            title: profile?.name && claimNameFound ? 'Duplicated Name' : '',
          }}
        />
      </Box>
      <Box className='d-flex flex-column justify-content-between' style={{ width: 400 }}>
        <Box>
          <EntityAdditionalInfoForm
            entityType={entityType}
            description={profile?.description ?? ''}
            setDescription={(description: string) => handleUpdateProfile('description', description)}
            brand={profile?.brand ?? ''}
            setBrand={(brand: string) => handleUpdateProfile('brand', brand)}
            location={profile?.location ?? ''}
            setLocation={(location: string) => handleUpdateProfile('location', location)}
            metrics={profile?.metrics ?? emptyArray}
            setMetrics={(metrics: any[]) => handleUpdateProfile('metrics', metrics)}
            attributes={profile?.attributes ?? emptyArray}
            setAttributes={(attributes: any[]) => handleUpdateProfile('attributes', attributes)}
            startDate={startDate}
            endDate={endDate}
            setStartEndDate={handleSetStartEndDate}
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

export default SetupMetadata
