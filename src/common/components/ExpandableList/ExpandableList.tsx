import React from 'react'
import styled from 'styled-components'

import { Button, ButtonTypes } from 'common/components/Form/Buttons'

interface Props {
  limit: number
  children: JSX.Element []
}

const ExpandButton = styled(Button)`
  margin-top: 1rem;
  border: none;
  color: ${/* eslint-disable-line */ (props) => props.theme.fontSkyBlue} !important;
  background: transparent;
`

const ExpandableList: React.FunctionComponent<Props> = ({limit, children}) => {
  const [expanded, setExpanded] = React.useState(false)
  const hasMoreToShow = children.length > limit

  const handleClickViewMore = (event): void => {
    event.stopPropagation()
    setExpanded( !expanded )
  }

  return (
    <>
      {
        [...children].splice(0, limit)
      }
      <div className={`fade ${ expanded ? 'show' : ''}`} style={{ maxHeight: expanded ? 'initial' : 0 }}>
        {
          [...children].splice(limit)
        }
      </div>
      {
        hasMoreToShow &&
        <ExpandButton type={ ButtonTypes.dark } onClick={ handleClickViewMore }>
          { expanded ? 'View Less' : 'View More'}
        </ExpandButton>
      }
    </>
  )
}

export default ExpandableList;