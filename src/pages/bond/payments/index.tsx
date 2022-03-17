import Axios from 'axios'
import CreatePaymentContractModal from 'common/components/ControlPanel/Actions/CreatePaymentContractModal'
import { ModalWrapper } from 'common/components/Wrappers/ModalWrapper'
import { simplifyId } from 'common/utils/formatters'
import { selectUserAddress } from 'modules/Account/Account.selectors'
import { selectEntityDid } from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import { selectPaymentCoins } from 'modules/relayer/relayer.selectors'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import ContractsPayTable from './components/ContractsPayTable'
import ContractsReceiveTable from './components/ContractsReceiveTable'
import {
  Container,
  SectionContainer,
  SectionTitle,
  SectionTitleContainer,
  StyledButton,
} from './index.style'
import { ContractData } from './types'

export const Payments: React.FunctionComponent = () => {
  const paymentCoins = useSelector(selectPaymentCoins)
  const userAddress = useSelector(selectUserAddress)
  const entityDid = useSelector(selectEntityDid)
  const [newContract, setNewContract] = useState<boolean>(false)
  const [availableContracts, setAvailableContracts] = useState<ContractData[]>(
    [],
  )

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/ixo/payments/contracts_by_id_prefix/payment:contract:${entityDid}`,
    ).then((response) => {
      const templateIds = response.data.payment_contracts.reduce(
        (ids, contract: ContractData) =>
          ids.includes(contract.payment_template_id)
            ? ids
            : [...ids, contract.payment_template_id],
        [],
      )

      const templatePromises = templateIds.map((templateId) =>
        Axios.get(
          `${process.env.REACT_APP_GAIA_URL}/ixo/payments/templates/${templateId}`,
        ),
      )

      Promise.all(templatePromises).then((templateResponses: any[]) => {
        setAvailableContracts(
          response.data.payment_contracts.map((item) => ({
            ...item,
            discount:
              item.discount_id === '0'
                ? '–'
                : String(
                    parseFloat(
                      templateResponses.find(
                        (templateResponse) =>
                          templateResponse.data.payment_template?.id ===
                          item.payment_template_id,
                      ).data.payment_template.discounts[
                        parseInt(item.discount_id) - 1
                      ]?.percent,
                    ),
                  ),
          })),
        )
      })
    })
    // eslint-disable-next-line
  }, [])
  const tableData = useMemo(
    () =>
      availableContracts.map((contract) => ({
        date: contract.date ?? new Date(2020, 6, 6),
        status: contract.authorised ? 'Authorised' : 'Not Authorised',
        type: simplifyId(
          contract.payment_template_id,
          `payment:template:${entityDid}`,
        ),
        source: contract.recipients,
        conditions: simplifyId(contract.id, `payment:contract:${entityDid}`),
        discount: contract.discount,
        value: 'xUSD 1,500 (1000)',
        contractId: contract.id,
        payer: contract.payer,
      })),
    [availableContracts, entityDid],
  )
  return (
    <Container>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO PAY</SectionTitle>
          {
            <StyledButton onClick={(): void => setNewContract(true)}>
              New Contract
            </StyledButton>
          }
        </SectionTitleContainer>
        <ContractsPayTable
          tableData={tableData.filter((item) => item.payer === userAddress)}
        />
      </SectionContainer>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO RECEIVE PAYMENTS</SectionTitle>
        </SectionTitleContainer>
        <ContractsReceiveTable
          tableData={tableData.filter((item) =>
            item.source.some((source) => source.address === userAddress),
          )}
        />
      </SectionContainer>
      <ModalWrapper
        isModalOpen={newContract}
        header={{
          title: 'Create a Payment Contract',
          titleNoCaps: true,
          noDivider: true,
        }}
        handleToggleModal={(): void => setNewContract(false)}
      >
        <CreatePaymentContractModal
          entityDid={entityDid}
          paymentCoins={paymentCoins}
        />
      </ModalWrapper>
    </Container>
  )
}
