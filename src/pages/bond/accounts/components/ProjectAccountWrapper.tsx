import React from 'react';
import _ from 'lodash'
import styled from 'styled-components'

export interface ProjectAccountWrapperProps {
  children: React.ReactNode
}

const StyledRow = styled.div`
&&& {
  margin-left: -30px;
  margin-right: -30px;
  margin-top: 15px;
}
`

const HeaderLabel = styled.span`
&&& {
  color: white;
  font-size: 22px;
  font-weight: bold;
}
`

const AddAccountButton = styled.div`
  color: #39C3E6;
  border: 1px solid #39C3E6;
  font-weight: bold;
  font-size: 16px;
  width: 160px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header: React.FunctionComponent = () => (
  <div className="row justify-content-between mt-2">
    <HeaderLabel>Project Accounts</HeaderLabel>
    <AddAccountButton>Add an Account</AddAccountButton>
  </div>
)

export default function ProjectAccountWrapper ({children}: ProjectAccountWrapperProps): JSX.Element {
  const childsArray = _.chunk(React.Children.toArray(children), 4)
  if (React.Children.count(children) > 4)
    return (
      <div className="container-fluid">
        <Header />
        {
          childsArray.map((chunkedChild, key) => (
            <StyledRow key={`wrapper-row-${key}`} className="row" heightType={4}>
              {
                chunkedChild.map((child, colKey) => (
                  <div key={`wrapper-col-${key}-${colKey}`} className="col-3">
                    {child}
                  </div>
                ))
              }
            </StyledRow>
          ))
        }
      </div>
    );
  else {
    return (
      <div className="container-fluid">
        <Header />
        <StyledRow className="row">
        {
          childsArray[0].map((child, key) => (
            <div key={`wrapper-col-${key}`} className={`col-${12 / childsArray[0].length}`}>
              {child}
            </div>
          ))
        }
        </StyledRow>
      </div>
    )
  }
}
