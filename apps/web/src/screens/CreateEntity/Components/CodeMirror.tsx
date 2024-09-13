import React from 'react'
import { Controlled } from 'react-codemirror2'
import styled from 'styled-components'

const Wrapper = styled.div<{ readOnly: boolean }>`
  width: 100%;
  .CodeMirror {
    height: auto !important;
    border-radius: 6px;
    ${(props) => props.readOnly && `background-color: ${props.theme.ixoGrey300};`}
  }
`

// This check is to prevent this import to be server side rendered.
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('codemirror/mode/javascript/javascript.js')
}

interface Props {
  readOnly?: boolean
  value: string
  onChange?: (value: string) => void
}

const CodeMirror: React.FC<Props> = ({ readOnly = false, value, onChange }): JSX.Element => {
  const editorTheme = 'default'
  const cmOptions = {
    mode: {
      name: 'javascript',
      json: true,
    },
    theme: editorTheme,
    lineNumbers: false,
    lineWrapping: true,
    autoCloseBrackets: false,
    tabSize: 2,
    gutters: ['CodeMirror-lint-markers'],
    lint: true,
    readOnly,
  }
  return (
    <Wrapper readOnly={readOnly}>
      <Controlled
        onBeforeChange={(_editor, _data, value) => onChange && onChange(value)}
        // onBlur={(_instance, _event) => onBlur()}
        options={cmOptions}
        value={value}
      />
    </Wrapper>
  )
}

export default CodeMirror
