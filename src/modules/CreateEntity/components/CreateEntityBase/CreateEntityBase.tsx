import React from 'react'
import { animateScroll as scroll } from 'react-scroll'
import { ButtonGroup } from '../../../../common/components/JsonForm/JsonForm.styles'
import * as Toast from '../../../../common/utils/Toast'
import { Step } from 'modules/CreateEntity/types'

export interface CreateEntityBaseProps {
  validationComplete: boolean
  validated: boolean
  handleValidated: (identifier: string) => void
  handleValidationError: (identifier: string, errors: string[]) => void
  handleGoToStep: (step: Step) => void
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

  onSubmitted = (): void => {
    throw new Error('Not implemented')
  }

  onBack = (): void => {
    throw new Error('Not implemented')
  }

  componentDidUpdate(): void {
    const { submitting } = this.state
    const { validated, validationComplete } = this.props

    if (submitting && validationComplete && !validated) {
      scroll.scrollToTop()

      Toast.errorToast(
        'Please check details and correct the errors below',
        null,
        true,
      )

      this.setState({ submitting: false })
    } else if (submitting && validationComplete && validated) {
      this.onSubmitted()
      this.setState({ submitting: false })
    }
  }

  renderButtonGroup = (
    formIdentifiers: string[],
    showBackButton: boolean,
  ): JSX.Element => {
    return (
      <ButtonGroup className="buttons-group">
        {showBackButton && (
          <button type="button" onClick={this.onBack}>
            Previous
          </button>
        )}
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
