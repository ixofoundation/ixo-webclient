import React from 'react'
import Trash from 'assets/icons/Trash'
import Expand from 'assets/icons/Expand'
import { Switch } from 'common/components/Switch/Switch'
import { QuestionCardWrapper, Toolbar } from './QuestionCard.styles'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'

interface Props {
  title: string
  required: boolean
  handleRemove(): void
  handleCopy(): void
  handleToggleRequire(): void
}

const QuestionCard: React.FunctionComponent<Props> = ({
  title,
  required,
  handleRemove,
  handleCopy,
  handleToggleRequire,
  children,
}) => {
  return (
    <QuestionCardWrapper>
      <FormCardWrapper title={title} showAddSection={false}>
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
    </QuestionCardWrapper>
  )
}

export default QuestionCard
