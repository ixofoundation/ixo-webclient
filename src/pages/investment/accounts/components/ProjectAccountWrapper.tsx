import React from 'react'
import { chunk } from 'lodash'
import styled from 'styled-components'

export interface ProjectAccountWrapperProps {
  children: React.ReactNode
}

interface StyledRowProp {
  heightType: number
}

const StyledRow = styled.div<StyledRowProp>`
  &&& {
    margin-left: -30px;
    margin-right: -30px;
    /* height: ${(props): string => (props.heightType < 3 ? '252px' : props.heightType < 4 ? '300px' : '220px')}; */
    margin-top: 15px;
  }
`

const HeaderLabel = styled.span`
  color: white;
  font-size: 22px;
  font-weight: bold;
`

const AddAccountButton = styled.div`
  color: ${(props): string => props.theme.highlight.light};
  border: 1px solid ${(props): string => props.theme.highlight.light};
  font-weight: bold;
  font-size: 16px;
  width: 160px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = (): JSX.Element => (
  <div className='row justify-content-between mt-2'>
    <HeaderLabel>Project Accounts</HeaderLabel>
    <AddAccountButton>Add an Account</AddAccountButton>
  </div>
)

export default function ProjectAccountWrapper({ children }: ProjectAccountWrapperProps): JSX.Element {
  const childsArray = chunk(React.Children.toArray(children), 4)

  if (React.Children.count(children) > 4)
    return (
      <div className='container-fluid'>
        <Header />
        {childsArray.map((chunkedChild, key) => (
          <StyledRow key={`wrapper-row-${key}`} className='row' heightType={4}>
            {chunkedChild.map((child, colKey) => (
              <div key={`wrapper-col-${key}-${colKey}`} className='col-3'>
                {child}
              </div>
            ))}
          </StyledRow>
        ))}
      </div>
    )
  else {
    return (
      <div className='container-fluid'>
        <Header />
        <StyledRow className='row' heightType={childsArray[0].length}>
          {childsArray[0].map((child, key) => (
            <div key={`wrapper-col-${key}`} className={`col-${12 / childsArray[0].length}`}>
              {child}
            </div>
          ))}
        </StyledRow>
      </div>
    )
  }
}
