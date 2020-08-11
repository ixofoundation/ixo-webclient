import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { ButtonGroup } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as Toast from '../../../../common/utils/Toast'

export interface CreateEntityBaseProps {
  validationComplete: boolean
  validated: boolean
  handleValidated: (identifier: string) => void
  handleValidationError: (identifier: string, errors: string[]) => void
}

interface State {
  submitting: boolean
}

class CreateEntityBase<T extends CreateEntityBaseProps> extends React.Component<
  T,
  State
> {
  cardRefs = {}

  constructor(props) {
    super(props)

    this.state = {
      submitting: false,
    }
  }

  componentDidUpdate(): void {
    const { submitting } = this.state
    const { validated, validationComplete } = this.props

    if (submitting && validationComplete && !validated) {
      this.setState({ submitting: false })

      scroll.scrollToTop()

      Toast.errorToast(
        'Please check details and correct the errors below',
        null,
        true,
      )
    }
  }

  renderButtonGroup = (formIdentifiers: string[]): JSX.Element => {
    return (
      <ButtonGroup className="buttons-group">
        <button
          type="submit"
          className="submitForm"
          onClick={(): void => this.handleSubmit(formIdentifiers)}
        >
          Next
        </button>
      </ButtonGroup>
    )
  }

  handleSubmit = (formIdentifiers: string[]): void => {
    formIdentifiers.forEach(identifier => {
      this.cardRefs[identifier].current.validateAndSubmit()
    })

    setTimeout(() => {
      this.setState({ submitting: true })
    }, 100)
  }
}

export default CreateEntityBase
