import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../types/models'

const TabsContainer = styled.div`
	background:${/* eslint-disable-line */ props => props.theme.bg.gradientBlue};
	border-radius:3px;
	overflow: hidden;
	display:inline-flex;
	box-shadow: 0px 10px 50px 0px rgba(0,0,0,0.35);

	a {
		font-family: ${
      /* eslint-disable-line */ props => props.theme.fontRobotoCondensed
    };
		color:white;
		text-transform: uppercase;
		font-weight:300;
		font-size:14px;
		padding:10px 20px;
		display:flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;

		transition: all 0.3s ease;
	}

	a:last-child {
		border-left: 1px solid rgba(1, 116, 146, 0.5);
	}

	a i {
		margin:0 10px 0 0
		font-size: 18px;
	}

	i:before {
		transition: all 0.3s ease;
	}

	a p {
		margin-bottom:0;
	}

	a:hover {
		text-decoration: none
		color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
		
	}

	a.active {
		background: ${/* eslint-disable-line */ props => props.theme.bg.lightBlue};
		color:white;
	}

	img {
		padding:0 5px;
	}
`

export interface Button {
  linkClass?: string
  iconClass: string
  title?: string
  path: string
  state?: any
}

export interface Props {
  buttons: Button[]
  matchType: MatchType
}

export const Tabs: React.SFC<Props> = props => {
  return (
    <TabsContainer>
      {props.buttons.map((button, index) => {
        return (
          <NavLink
            className={button.linkClass ? button.linkClass : ''}
            exact={props.matchType === MatchType.exact}
            strict={props.matchType === MatchType.strict}
            to={{ pathname: button.path }}
            key={index}
          >
            {button.iconClass && <i className={button.iconClass} />}
            {button.title && <p>{button.title}</p>}
          </NavLink>
        )
      })}
    </TabsContainer>
  )
}
