import React, { useState } from 'react'
import cx from 'classnames'
import { Collapse } from 'react-collapse'
import { Container, AddSectionButton, Header } from './FormCardWrapper.styles'
import Down from 'assets/icons/Down'

interface Props {
  title: string
  description?: string
  showAddSection: boolean
  addSectionText?: string
  collapsible?: boolean
  onAddSection?: () => void
}

const FormCardWrapper: React.FunctionComponent<Props> = ({
  title,
  description,
  showAddSection,
  addSectionText,
  children,
  collapsible = false,
  onAddSection,
}) => {
  const [expand, setExpand] = useState(true)

  return (
    <Container>
      <Header>
        <h2>{title}</h2>
        {collapsible && (
          <div
            className={cx('expand-icon', { open: expand })}
            onClick={(): void => setExpand(!expand)}
          >
            <Down fill="#A5ADB0" />
          </div>
        )}
      </Header>
      {collapsible && (
        <Collapse isOpened={expand}>
          {description && <p>{description}</p>}
          {children}
          {showAddSection && (
            <div style={{ textAlign: 'center' }}>
              <hr />
              <AddSectionButton type="button" onClick={onAddSection}>
                + {addSectionText || 'Add Section'}
              </AddSectionButton>
            </div>
          )}
        </Collapse>
      )}
      {!collapsible && (
        <>
          {description && <p>{description}</p>}
          {children}
          {showAddSection && (
            <div style={{ textAlign: 'center' }}>
              <hr />
              <AddSectionButton type="button" onClick={onAddSection}>
                + {addSectionText || 'Add Section'}
              </AddSectionButton>
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default FormCardWrapper
