import { FlexBox } from 'components/App/App.styles'
import FormCard from 'components/Card/FormCard'
import { InputWithLabel } from 'components/Form/InputWithLabel'
import { Typography } from 'components/Typography'
import { VMKeyMap } from 'constants/entity'
import { useTransferEntityState } from 'hooks/transferEntity'
import { Button } from 'pages/CreateEntity/Components'
import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme } from 'styled-components'

const TransferEntityReview: React.FC = () => {
  const theme: any = useTheme()
  const history = useHistory()
  const { selectedEntity } = useTransferEntityState()
  const [submitting, setSubmitting] = useState(false)
  const [
    authentications = [],
    assertionMethods = [],
    keyAgreements = [],
    capabilityInvocations = [],
    capabilityDelegations = [],
  ] = useMemo(
    () => [
      selectedEntity?.authentication,
      selectedEntity?.assertionMethod,
      selectedEntity?.keyAgreement,
      selectedEntity?.capabilityInvocation,
      selectedEntity?.capabilityDelegation,
    ],
    [selectedEntity],
  )

  const getVMKeyType = (vmId: string): string => {
    if (authentications.includes(vmId)) {
      return 'authentication'
    } else if (assertionMethods.includes(vmId)) {
      return 'assertionMethod'
    } else if (keyAgreements.includes(vmId)) {
      return 'keyAgreement'
    } else if (capabilityInvocations.includes(vmId)) {
      return 'capabilityInvocation'
    } else if (capabilityDelegations.includes(vmId)) {
      return 'capabilityDelegation'
    }
    return ''
  }

  const onBack = () => {
    history.goBack()
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    setSubmitting(false)
  }

  return (
    <FlexBox width='100%' justifyContent='center'>
      <FlexBox maxWidth='800px' width='100%' direction='column' gap={5}>
        <Typography>The former owner of the entity created a document to re-enable verification keys.</Typography>

        {/* {verificationMethods.map((vm, index) => {
          const vmKeyType = getVMKeyType(vm.id)
          return (
            <FormCard
              key={index}
              title={
                <FlexBox alignItems='center' gap={4}>
                  <Typography color='black'>KEY #{index + 1}</Typography>
                  <FlexBox p={2} borderRadius={'8px'} background={'#A1E393'}>
                    <Typography color='black'>{VMKeyMap[vmKeyType]}</Typography>
                  </FlexBox>
                </FlexBox>
              }
            >
              <FlexBox
                direction='column'
                width='100%'
                background={theme.ixoGrey100}
                borderRadius='8px'
                gap={2}
                p={4}
                color='black'
              >
                {Object.entries(vm)
                  .filter(([key]) => key !== 'description')
                  .map(([key, value]) => (
                    <Typography key={key} wordBreak={'break-all'}>
                      {key}: {value}
                    </Typography>
                  ))}
              </FlexBox>
              <InputWithLabel
                width='100%'
                height='48px'
                label='Verification Description'
                inputValue={vm.description || ''}
              />
            </FormCard>
          )
        })} */}

        <FlexBox alignItems='center' width='100%' gap={7}>
          <Button variant='secondary' size='full' height={48} onClick={onBack}>
            Back
          </Button>
          <Button size='full' height={48} loading={submitting} onClick={handleSubmit}>
            Re-enable keys
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default TransferEntityReview
