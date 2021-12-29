import React from 'react'

export const ObjectFieldTemplate2Column: React.FunctionComponent = (
  props: any,
) => {
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
          <div key={i} className="form-row">
            <div key={property1.id} className="col-lg-6">
              {property1.content}
            </div>
            {property2 && (
              <div key={property2.id} className="col-lg-6">
                {property2.content}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export const ObjectFieldTokenTemplateColumn: React.FunctionComponent = (
  props: any,
) => {
  return (
    <>
      {props.title}
      {props.description}
      <div className="form-row">
        <div className="col-lg-6">
          {props.properties.find((prop) => prop.name === 'templateId')?.content}
        </div>
        <div className="col-lg-6">
          {props.properties.find((prop) => prop.name === 'name')?.content}
          {props.properties.find((prop) => prop.name === 'collection')?.content}
          <div className="form-row">
            <div className="col-lg-6">
              {props.properties.find((prop) => prop.name === 'denom')?.content}
            </div>
            <div className="col-lg-6">
              {
                props.properties.find((prop) => prop.name === 'quantity')
                  ?.content
              }
            </div>
          </div>
        </div>
      </div>

      {/* {rowArray.map((v, i) => {
        const property1 = props.properties[i * 2]
        const property2 = props.properties[i * 2 + 1]

        return (
          <div key={i} className="form-row">
            <div key={property1.id} className="col-lg-6">
              {property1.content}
            </div>
            {property2 && (
              <div key={property2.id} className="col-lg-6">
                {property2.content}
              </div>
            )}
          </div>
        )
      })} */}
    </>
  )
}
