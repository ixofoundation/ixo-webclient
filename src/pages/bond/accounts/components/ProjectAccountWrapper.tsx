import React from 'react'
import { chunk } from 'lodash'
import styled from 'styled-components'

export interface ProjectAccountWrapperProps {
  children: React.ReactNode
  title?: string
  handleAddAccount: (e) => void
}

interface StyledRowProp {
  heightType: number
}

interface HeaderProp {
  title: string
  handleAddAccount: (e) => void
}

const StyledRow = styled.div<StyledRowProp>`
&&& {
  margin-left: -30px;
  margin-right: -30px;
  /* height: ${(props) =>
    props.heightType < 3
      ? '252px'
      : props.heightType < 4
      ? '300px'
      : '220px'}; */
  margin-top: 15px;
}
`

const HeaderLabel = styled.span`
  color: white;
  font-size: 22px;
  font-weight: normal;
`

const AddAccountButton = styled.button`
  color: #39c3e6;
  border: 1px solid #39c3e6;
  font-weight: normal;
  font-size: 16px;
  width: 160px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`

const Header = ({ title, handleAddAccount }: HeaderProp) => (
  <div className="row justify-content-between mt-2">
    <HeaderLabel>{title}</HeaderLabel>
    <AddAccountButton onClick={handleAddAccount}>
      Add an Account
    </AddAccountButton>
  </div>
)

export default function ProjectAccountWrapper({
  children,
  title = '',
  handleAddAccount,
}: ProjectAccountWrapperProps): JSX.Element {
  const childsArray = chunk(React.Children.toArray(children), 4)

  if (React.Children.count(children) > 4)
    return (
      <div className="container-fluid">
        <Header title={title} handleAddAccount={handleAddAccount} />
        {childsArray.map((chunkedChild, key) => (
          <StyledRow key={`wrapper-row-${key}`} className="row" heightType={4}>
            {chunkedChild.map((child, colKey) => (
              <div key={`wrapper-col-${key}-${colKey}`} className="col-3">
                {child}
              </div>
            ))}
          </StyledRow>
        ))}
      </div>
    )
  else {
    return (
      <div className="container-fluid">
        <Header title={title} handleAddAccount={handleAddAccount} />
        <StyledRow className="row" heightType={childsArray[0].length}>
          {childsArray[0].map((child, key) => (
            <div key={`wrapper-col-${key}`} className={`col-3`}>
              {child}
            </div>
          ))}
        </StyledRow>
      </div>
    )
  }
}
