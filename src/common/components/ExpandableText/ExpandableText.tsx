import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  cursor: pointer;
`
interface Props {
  limit: number
  children: string
}

const ExpandableText: React.FunctionComponent<Props> = ({limit, children}) => {
  const [expanded, setExpanded] = React.useState(false)

  let shortenText = children.substr(0, limit)
  if (shortenText.length < children.length) {
    shortenText = `${shortenText} ...`
  }

  if (expanded) {
    return (
      <Text onClick={ (): void => setExpanded(false) }>
        { children }
      </Text>
    )
  }

  return (
    <Text onClick={ (): void => setExpanded(true) }>
      { shortenText }
    </Text>
  )
}

export default ExpandableText