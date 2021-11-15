import React, { useState } from 'react'
import cx from 'classnames'
import { Collapse } from 'react-collapse';
import { Draggable } from 'react-beautiful-dnd'
import Trash from 'assets/icons/Trash'
import Expand from 'assets/icons/Expand'
import { Switch } from 'common/components/Switch/Switch'
import { Toolbar, Container, Header } from './QuestionCard.styles'
import Down from 'assets/icons/Down'
// import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'

interface Props {
  id: string
  index: number
  title: string
  required: boolean
  handleRemove(): void
  handleCopy(): void
  handleToggleRequire(): void
}

const QuestionCard: React.FunctionComponent<Props> = ({
  id,
  index,
  title,
  required,
  handleRemove,
  handleCopy,
  handleToggleRequire,
  children,
}) => {
  const [expand, setExpand] = useState(false)

  return (
    <Draggable draggableId={id} index={index}>
      {(provided): JSX.Element => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Container>
            {/* <FormCardWrapper title={title} showAddSection={false}> */}
            <Header>
              <h2>{title}</h2>
              <div
                className={cx('expand-icon', { open: expand })}
                onClick={(): void => setExpand(!expand)}
              >
                <Down fill="#A5ADB0" />
              </div>
            </Header>
            <Collapse isOpened={expand}>
            {children}
            <Toolbar>
              <div className="toolbar-item" onClick={handleCopy}>
                <Expand fill="#A5ADB0" />
              </div>
              <div className="toolbar-item" onClick={handleRemove}>
                <Trash fill="#A5ADB0" />
              </div>
              <div className="divider"></div>
              <div className="toolbar-item">
                <Switch
                  label="Required"
                  on={required}
                  handleChange={handleToggleRequire}
                />
              </div>
            </Toolbar>
            </Collapse>
            {/* </FormCardWrapper> */}
          </Container>
        </div>
      )}
    </Draggable>
  )
}

export default QuestionCard
