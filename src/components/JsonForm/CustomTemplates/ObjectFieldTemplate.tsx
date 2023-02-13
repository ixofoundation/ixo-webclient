import React, { useMemo } from 'react'

export const ObjectFieldTemplate2Column: React.FunctionComponent = (props: any) => {
  const totalRows = Math.ceil(props.properties.length / 2)
  const rowArray = new Array(totalRows).fill(null)

  return (
    <>
      {props.title}
      {props.description}
      {rowArray.map((v, i) => {
        const property1 = props.properties[i * 2]
        const property2 = props.properties[i * 2 + 1]

        return (
          <div key={i} className='form-row'>
            <div key={property1.id} className='col-lg-6'>
              {property1.content}
            </div>
            {property2 && (
              <div key={property2.id} className='col-lg-6'>
                {property2.content}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export const ObjectFieldTokenTemplateColumn: React.FunctionComponent = (props: any) => {
  return (
    <>
      {props.title}
      {props.description}
      <div className='form-row'>
        <div className='col-lg-6'>{props.properties.find((prop: any) => prop.name === 'templateId')?.content}</div>
        <div className='col-lg-6'>
          {props.properties.find((prop: any) => prop.name === 'name')?.content}
          {props.properties.find((prop: any) => prop.name === 'collection')?.content}
          <div className='form-row'>
            <div className='col-lg-6'>{props.properties.find((prop: any) => prop.name === 'denom')?.content}</div>
            <div className='col-lg-6'>{props.properties.find((prop: any) => prop.name === 'quantity')?.content}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const ObjectFieldLinkedResourcesColumn: React.FunctionComponent = (props: any) => {
  return (
    <>
      {props.title}
      {props.description}
      <div className='form-row'>
        <div className='col-lg-6'>{props.properties.find((prop: any) => prop.name === 'file')?.content}</div>
        <div className='col-lg-6'>
          {props.properties.find((prop: any) => prop.name === 'name')?.content}
          {props.properties.find((prop: any) => prop.name === 'path')?.content}
          {props.properties.find((prop: any) => prop.name === 'type')?.content}
          {props.properties.find((prop: any) => prop.name === 'description')?.content}
        </div>
      </div>
    </>
  )
}

export const ObjectFieldConfigureAlphaBondColumn: React.FunctionComponent = (props: any) => {
  const properties = useMemo(() => props.properties, [props])
  const formData = useMemo(() => props.formData, [props])

  const baseBondingCurve = useMemo(() => properties.find((item: any) => item.name === 'baseBondingCurve'), [properties])
  const token = useMemo(() => properties.find((item: any) => item.name === 'token'), [properties])
  const name = useMemo(() => properties.find((item: any) => item.name === 'name'), [properties])
  const controllerDid = useMemo(() => properties.find((item: any) => item.name === 'controllerDid'), [properties])
  const reserveToken = useMemo(() => properties.find((item: any) => item.name === 'reserveToken'), [properties])
  const txFeePercentage = useMemo(() => properties.find((item: any) => item.name === 'txFeePercentage'), [properties])
  const exitFeePercentage = useMemo(
    () => properties.find((item: any) => item.name === 'exitFeePercentage'),
    [properties],
  )
  const feeAddress = useMemo(() => properties.find((item: any) => item.name === 'feeAddress'), [properties])
  const reserveWithdrawalAddress = useMemo(
    () => properties.find((item: any) => item.name === 'reserveWithdrawalAddress'),
    [properties],
  )
  const maxSupply = useMemo(() => properties.find((item: any) => item.name === 'maxSupply'), [properties])
  const initialPrice = useMemo(() => properties.find((item: any) => item.name === 'initialPrice'), [properties])
  const initialSupply = useMemo(() => properties.find((item: any) => item.name === 'initialSupply'), [properties])
  const allowReserveWithdrawals = useMemo(
    () => properties.find((item: any) => item.name === 'allowReserveWithdrawals'),
    [properties],
  )
  const outcomePayment = useMemo(() => properties.find((item: any) => item.name === 'outcomePayment'), [properties])
  const bondDid = useMemo(() => properties.find((item: any) => item.name === 'bondDid'), [properties])
  const minimumYield = useMemo(() => properties.find((item: any) => item.name === 'minimumYield'), [properties])
  const period = useMemo(() => properties.find((item: any) => item.name === 'period'), [properties])
  const targetRaise = useMemo(() => properties.find((item: any) => item.name === 'targetRaise'), [properties])

  return (
    <>
      {props.title}
      {props.description}
      <div className='row'>
        <div className='col-lg-6'>{baseBondingCurve && baseBondingCurve.content}</div>
        <div className='col-lg-6'>
          <div className='d-flex flex-column'>
            {name && name.content}
            {controllerDid && controllerDid.content}
            <div className='row'>
              <div className='col-6'>{token && token.content}</div>
              <div className='col-6'>{reserveToken && reserveToken.content}</div>
            </div>
            {targetRaise && targetRaise.content}
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-6'>{minimumYield && minimumYield.content}</div>
            <div className='col-6'>{period && period.content}</div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-6'>{initialSupply && initialSupply.content}</div>
            <div className='col-6'>{maxSupply && maxSupply.content}</div>
          </div>
        </div>
        <div className='col-lg-6'>{feeAddress && feeAddress.content}</div>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-6'>{initialPrice && initialPrice.content} </div>
            <div className='col-6'>{allowReserveWithdrawals && allowReserveWithdrawals.content}</div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-6'>{txFeePercentage && txFeePercentage.content}</div>
            <div className='col-6'>{exitFeePercentage && exitFeePercentage.content}</div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-12'>
              {formData.allowReserveWithdrawals && reserveWithdrawalAddress && reserveWithdrawalAddress.content}
            </div>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='row'>
            <div className='col-12'>{outcomePayment && outcomePayment.content}</div>
          </div>
        </div>
      </div>
      {!!formData.bondDid && (
        <div className='row'>
          <div className='col-6 offset-md-6'>{bondDid && bondDid.content}</div>
        </div>
      )}
    </>
  )
}

export const ObjectFieldProtocolInformationColumn: React.FunctionComponent = (props: any) => {
  const properties = useMemo(() => props.properties, [props])

  const TypeEl = useMemo(() => properties.find((item: any) => item.name === 'type')?.content, [properties])
  const TitleEl = useMemo(() => properties.find((item: any) => item.name === 'title')?.content, [properties])
  const ShortDescriptionEl = useMemo(
    () => properties.find((item: any) => item.name === 'shortDescription')?.content,
    [properties],
  )
  const FeatureEl = useMemo(() => properties.find((item: any) => item.name === 'feature')?.content, [properties])
  const ReliabilityEl = useMemo(
    () => properties.find((item: any) => item.name === 'reliability')?.content,
    [properties],
  )
  const UserGuideEl = useMemo(() => properties.find((item: any) => item.name === 'userGuide')?.content, [properties])
  const ReferenceEl = useMemo(() => properties.find((item: any) => item.name === 'reference')?.content, [properties])
  const KeywordsEl = useMemo(() => properties.find((item: any) => item.name === 'keywords')?.content, [properties])

  return (
    <>
      <div className='row mb-4'>
        <div className='col-lg-6'>{TypeEl}</div>
        <div className='col-lg-6'>{TitleEl}</div>
        <div className='col-lg-6'>{ShortDescriptionEl}</div>
      </div>

      <div className='row'>
        <div className='col-12'>
          <h3>Additional information:</h3>
        </div>
        <div className='col-lg-6'>{FeatureEl}</div>
        <div className='col-lg-6'>{ReliabilityEl}</div>
        <div className='col-lg-6'>{UserGuideEl}</div>
        <div className='col-lg-6'>{ReferenceEl}</div>
        <div className='col-lg-6'>{KeywordsEl}</div>
      </div>
    </>
  )
}

export const ObjectFieldEntitySettingsFilterColumn: React.FunctionComponent = (props: any) => {
  const properties = useMemo(() => props.properties, [props])

  const addFilterStIdx = useMemo(
    () => properties.findIndex((property: any) => property.name === 'impactCategory'),
    [properties],
  )

  const mainFilters = useMemo(() => {
    if (addFilterStIdx === -1) {
      return properties
    }
    return properties.filter((_: any, index: any) => index < addFilterStIdx)
  }, [properties, addFilterStIdx])

  const additionalFilters = useMemo(() => {
    if (addFilterStIdx === -1) {
      return []
    }
    return properties.filter((_: any, index: any) => index >= addFilterStIdx)
  }, [properties, addFilterStIdx])

  return (
    <>
      <div className='row mb-4'>
        {mainFilters.map((filter: any, index: any) => (
          <div key={index} className='col-lg-6'>
            {filter.content}
          </div>
        ))}
      </div>

      <div className='row'>
        <div className='col-12'>
          <h3>Additional filters:</h3>
        </div>
        {additionalFilters.map((filter: any, index: any) => (
          <div key={index} className='col-lg-6'>
            {filter.content}
          </div>
        ))}
      </div>
    </>
  )
}
