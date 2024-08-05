import React, { ReactNode, useState } from 'react'
import cx from 'classnames'
import Lottie from 'react-lottie'
import { Collapse } from 'react-collapse'
import {
  DraggableContainer,
  DraggableContainerContent,
  AddSectionButton,
  Header,
  AssistanceButton,
} from './FormCardWrapper.styles'
import Down from 'assets/icons/Down'
import Tooltip, { TooltipPosition } from 'components/Tooltip/Tooltip'
import assistanceAnimation from '/public/assets/animations/transaction/blue_pending.json'

function NaF(): void {
  return
}

interface Props {
  title: string
  description?: string
  showAddSection: boolean
  addSectionText?: string
  collapsible?: boolean
  disableDrag?: boolean
  keyword?: string
  onAddSection?: () => void
  children?: ReactNode
}

const FormCardWrapper: React.FunctionComponent<Props> = ({
  title,
  description,
  showAddSection,
  addSectionText,
  children,
  collapsible = false,
  keyword = undefined,
  onAddSection,
  disableDrag,
}) => {
  const [expand, setExpand] = useState(true)
  const [animLoop, setAnimLoop] = useState(false)
  const [dragAnimDone, setDragAnimDone] = useState(disableDrag)

  function handleAssistance(): void {
    // dispatch(
    //   toggleAssistant({
    //     fixed: true,
    //     intent: `/${keyword}{"relayerNode": "did:sov:Rmb6Rd1CU6k74FM2xzy6Do"}`,
    //   }),
    // )
  }

  function clearDraggable(): void {
    if (!dragAnimDone) {
      setDragAnimDone(true)
    }
  }

  return (
    <DraggableContainer
      className={!dragAnimDone ? 'draggable' : ''}
      onMouseLeave={!dragAnimDone ? clearDraggable : NaF}
    >
      <DraggableContainerContent>
        {keyword && (
          <AssistanceButton
            className='d-flex justify-content-center align-items-center'
            onClick={handleAssistance}
            onMouseEnter={(): void => setAnimLoop(true)}
            onMouseLeave={(): void => setAnimLoop(false)}
            style={{ cursor: 'pointer' }}
          >
            <Tooltip text='Get Assistance' position={TooltipPosition.Bottom}>
              <Lottie
                height={75}
                width={75}
                options={{
                  loop: true,
                  autoplay: false,
                  animationData: assistanceAnimation,
                }}
                isStopped={!animLoop}
              />
            </Tooltip>
          </AssistanceButton>
        )}
        <Header>
          <h2>{title}</h2>
          {collapsible && (
            <div className={cx('expand-icon', { open: expand })} onClick={(): void => setExpand(!expand)}>
              <Down fill='#A5ADB0' />
            </div>
          )}
        </Header>
        {collapsible && (
          <Collapse isOpened={expand}>
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            {children}
            {showAddSection && (
              <div style={{ textAlign: 'center' }}>
                <hr />
                <AddSectionButton type='button' onClick={onAddSection}>
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
                <AddSectionButton type='button' onClick={onAddSection}>
                  + {addSectionText || 'Add Section'}
                </AddSectionButton>
              </div>
            )}
          </>
        )}
      </DraggableContainerContent>
    </DraggableContainer>
  )
}

export default FormCardWrapper
