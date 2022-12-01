import React, { useEffect, useState } from 'react'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import styled from 'styled-components'
// import InputText from 'components/Form/InputText/InputText'
// import { FormStyles } from 'types/models'
import { Spinner } from 'components/Spinner/Spinner'
import { useAccount } from 'redux/account/account.hooks'
import { Validator } from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/staking'
import { GetValidatorByAddr } from 'lib/protocol'

const Container = styled.div`
  padding: 1rem 1rem;
  min-width: 32rem;
`

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  button {
    border: 1px solid #00d2ff;
    border-radius: 0.25rem;
    height: 2.25rem;
    width: 6.5rem;
    background: transparent;
    color: white;
    outline: none;
  }
`

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const UpdateValidatorModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { address } = useAccount()
  const [validator, setValidator] = useState<Validator | undefined>()

  useEffect(() => {
    if (address) {
      GetValidatorByAddr(address).then(setValidator)
    }
  }, [address])

  const handleUpdateValidator = (
    validatorAddress: string,
    moniker: string,
    identity: string,
    website: string,
    details: string,
    minDelegation: string,
    commissionRate: string,
  ): void => {
    // const msg = {
    //   type: 'cosmos-sdk/MsgEditValidator',
    //   value: {
    //     description: {
    //       moniker,
    //       identity,
    //       website,
    //       details,
    //     },
    //     validator_address: validatorAddress,
    //     commission_rate: String(commissionRate),
    //     min_self_delegation: String(minDelegation),
    //   },
    // }
    // const fee = {
    //   amount: [{ amount: String(5000), denom: 'uixo' }],
    //   gas: String(200000),
    // }
    // broadCast(userInfo, userSequence as any, userAccountNumber as any, [msg], '', fee, () => {
    //   console.log('handleUpdateValidator')
    // })
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()

    const moniker = event.target.elements['moniker'].value
    const identity = event.target.elements['identity'].value
    const website = event.target.elements['website'].value
    const details = event.target.elements['details'].value
    const minDelegation = event.target.elements['minDelegation'].value
    const commissionRate = event.target.elements['commissionRate'].value

    if (moniker !== '') {
      handleUpdateValidator(address, moniker, identity, website, details, minDelegation, commissionRate)
    }
  }

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title: 'Update Validator',
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      {validator ? (
        <Container>
          <form onSubmit={handleSubmit}>
            {/* <InputText
            type='text'
            formStyle={FormStyles.modal}
            text='Moniker'
            id='moniker'
            defaultValue={validator.moniker}
          />
          <InputText
            type='text'
            formStyle={FormStyles.modal}
            text='Identity'
            id='identity'
            defaultValue={validator.identity}
          />
          <InputText
            type='text'
            formStyle={FormStyles.modal}
            text='Website'
            id='website'
            defaultValue={validator.website}
          />
          <InputText
            type='text'
            formStyle={FormStyles.modal}
            text='Details'
            id='details'
            defaultValue={validator.details}
          />
          <InputText
            formStyle={FormStyles.modal}
            text='Min Delegation'
            id='minDelegation'
            defaultValue={Number(validator.minDelegation)}
            type='number'
            step='0.000001'
          />
          <InputText
            formStyle={FormStyles.modal}
            text='Commission Rate'
            id='commissionRate'
            defaultValue={Number(validator.commissionRate)}
            type='number'
            step={validator.commissionRateStep}
          /> */}
            <ButtonContainer>
              <button type='submit'>Update</button>
            </ButtonContainer>
          </form>
        </Container>
      ) : (
        <Container>
          <Spinner info='Loading Details...' />
        </Container>
      )}
    </ModalWrapper>
  )
}

export default UpdateValidatorModal
