import React, { useState } from 'react'
import cx from 'classnames'
import { Collapse } from 'react-collapse'
import {
  Container,
  AddSectionButton,
  Header,
  AssistanceButton,
} from './FormCardWrapper.styles'
import Down from 'assets/icons/Down'
import Tooltip, { TooltipPosition } from 'common/components/Tooltip/Tooltip'
import Lottie from 'react-lottie'
import assistanceAnimation from 'assets/animations/transaction/blue_pending.json'

interface Props {
  title: string
  description?: string
  showAddSection: boolean
  addSectionText?: string
  collapsible?: boolean
  onAddSection?: () => void
  handleAssistance: () => void
}

const FormCardWrapper: React.FunctionComponent<Props> = ({
  title,
  description,
  showAddSection,
  addSectionText,
  children,
  collapsible = false,
  onAddSection,
  handleAssistance,
}) => {
  const [expand, setExpand] = useState(true)

  return (
    <Container>
      <AssistanceButton
        className="d-flex justify-content-center align-items-center"
        onClick={handleAssistance}
      >
        <Tooltip text="Get Assistance" position={TooltipPosition.Bottom}>
          <Lottie
            height={50}
            width={50}
            options={{
              loop: false,
              autoplay: true,
              animationData: assistanceAnimation,
            }}
          />
        </Tooltip>
      </AssistanceButton>
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
