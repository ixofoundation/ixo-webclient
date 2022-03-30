import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Trash from 'assets/icons/Trash'
import Expand from 'assets/icons/Expand'
import { Switch } from 'common/components/Switch/Switch'
import { Toolbar } from './QuestionCard.styles'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'

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
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <FormCardWrapper
            title={title}
            showAddSection={false}
            handleAssistance={(): void => {
              //
            }}
          >
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
          </FormCardWrapper>
        </div>
      )}
    </Draggable>
  )
}

export default QuestionCard
