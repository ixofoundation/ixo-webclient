import Axios from 'axios'
import { simplifyId } from 'utils/formatters'
import { selectAccountAddress } from 'redux/account/account.selectors'
import { selectEntityDid } from 'redux/selectedEntity/selectedEntity.selectors'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'redux/hooks'
import ContractsPayTable from './Components/ContractsPayTable'
import ContractsReceiveTable from './Components/ContractsReceiveTable'
import { Container, SectionContainer, SectionTitle, SectionTitleContainer } from './Payments.style'
import { ContractData } from './types'

const Payments: React.FunctionComponent = () => {
  const userAddress = useAppSelector(selectAccountAddress)
  const entityDid = useAppSelector(selectEntityDid)
  // const [newContract, setNewContract] = useState<boolean>(false)

  const [availableContracts, setAvailableContracts] = useState<ContractData[]>([])

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_GAIA_URL}/ixo/payments/contracts_by_id_prefix/payment:contract:${entityDid}`,
    ).then((response) => {
      const templateIds = response.data.payment_contracts.reduce(
        (ids: any, contract: ContractData) =>
          ids.includes(contract.payment_template_id) ? ids : [...ids, contract.payment_template_id],
        [],
      )

      const templatePromises = templateIds.map((templateId: any) =>
        Axios.get(`${process.env.REACT_APP_GAIA_URL}/ixo/payments/templates/${templateId}`),
      )

      Promise.all(templatePromises).then((templateResponses: any[]) => {
        setAvailableContracts(
          response.data.payment_contracts.map((item: any) => ({
            ...item,
            discount:
              item.discount_id === '0'
                ? '–'
                : String(
                    parseFloat(
                      templateResponses.find(
                        (templateResponse) => templateResponse.data.payment_template?.id === item.payment_template_id,
                      ).data.payment_template.discounts[parseInt(item.discount_id) - 1]?.percent,
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
        type: simplifyId(contract.payment_template_id, `payment:template:${entityDid}`),
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
          {/* {<StyledButton onClick={(): void => setNewContract(true)}>New Contract</StyledButton>} */}
        </SectionTitleContainer>
        <ContractsPayTable tableData={tableData.filter((item) => item.payer === userAddress) as any} />
      </SectionContainer>
      <SectionContainer>
        <SectionTitleContainer>
          <SectionTitle>CONTRACTS TO RECEIVE PAYMENTS</SectionTitle>
        </SectionTitleContainer>
        <ContractsReceiveTable
          tableData={tableData.filter((item) => item.source.some((source) => source.address === userAddress)) as any}
        />
      </SectionContainer>
    </Container>
  )
}

export default Payments
