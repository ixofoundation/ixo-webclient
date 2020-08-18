import React from 'react'
import Trash from 'assets/icons/Trash'
import Expand from 'assets/icons/Expand'
import { Switch } from 'common/components/Switch/Switch'
import { Toolbar } from './QuestionCardWrapper.styles'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'

interface Props {
  title: string
  required: boolean
  handleDelete(): void
  handleDuplicate(): void
  handleToggleRequire(): void
}

class QuestionCardWrapper extends React.Component<Props> {
  render(): JSX.Element {
    const {
      title,
      required,
      handleDelete,
      handleDuplicate,
      handleToggleRequire,
      children,
    } = this.props
    return (
      <FormCardWrapper title={title} showAddSection={false}>
        {children}
        <Toolbar>
          <div className="toolbar-item" onClick={handleDuplicate}>
            <Expand fill="#A5ADB0" />
          </div>
          <div className="toolbar-item" onClick={handleDelete}>
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
    )
  }
}

export default QuestionCardWrapper
