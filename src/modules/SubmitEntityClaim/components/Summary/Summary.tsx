import * as React from 'react'
import ApprovedTick from '../../../../assets/icons/ApprovedTick'
import Query from '../../../../assets/icons/Query'
import {
  ActionWrapper,
  SummaryWrapper,
  ClaimSummaryList,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
} from './Summary.styles'

class ClaimSummary extends React.Component {
  // @TODO Replace with actual answers
  questions = [
    {
      id: 'i',
      title: 'Upload an Avatar/Profile Pic',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Select an avatar to upload',
      required: true,
      type: 'string',
      control: 'avatarupload',
    },
    {
      id: 'h',
      title: 'Upload an Image',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Select an image to upload',
      required: true,
      type: 'string',
      control: 'imageupload',
    },
    {
      id: 'g',
      title: 'Enter Location',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Location',
      required: true,
      type: 'string',
      control: 'locationselector',
    },
    {
      id: 'f',
      title: 'QR Code',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'QR Code',
      required: true,
      type: 'string',
      control: 'qrcode',
      initialValue: 'https://www.google.com/',
    },
    {
      id: 'a',
      title: 'Short Text Question',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Short Answer',
      required: true,
      type: 'string',
      control: 'text',
      placeholder: 'Start Typing here',
    },
    {
      id: 'b',
      title: 'Long Text Question',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Long Answer',
      required: true,
      type: 'string',
      control: 'textarea',
      placeholder: 'Start Typing here',
    },
    {
      id: 'c',
      title: 'Select some of the text items below',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Select 1 to 2 options',
      required: true,
      type: 'array',
      minItems: 1,
      maxItems: 2,
      control: 'checkboxes',
      itemValues: [
        'Option1',
        'Option2',
        'Option3',
        'Option4',
        'Option5',
        'Option6',
        'Option7',
      ],
      itemLabels: [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
        'Option 6',
        'Option 7',
      ],
    },
    {
      id: 'd',
      title: 'Select some of the image items below',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Select 3 options',
      required: true,
      type: 'array',
      minItems: 3,
      maxItems: 3,
      control: 'imagecheckboxes',
      itemValues: ['Option1', 'Option2', 'Option3', 'Option4'],
      itemLabels: [
        'Picture Option 1',
        'Picture Option 2',
        'Picture Option 3',
        'Picture Option 4',
      ],
      itemImages: [
        'https://claimformtemp.s3-eu-west-1.amazonaws.com/PictureOption1.png',
        'https://claimformtemp.s3-eu-west-1.amazonaws.com/PictureOption2.png',
        'https://claimformtemp.s3-eu-west-1.amazonaws.com/PictureOption3.png',
        'https://claimformtemp.s3-eu-west-1.amazonaws.com/PictureOption4.png',
      ],
    },
    {
      id: 'e',
      title: 'Selector Rate out of 10',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label:
        'Rate the below from 1 to 10 with 1 bring terrible and 10 being excellent',
      required: true,
      inline: true,
      type: 'number',
      control: 'radio',
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    {
      id: 'a',
      title: 'Date Picker',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Dates',
      required: true,
      type: 'string',
      control: 'daterangeselector',
      placeholder: 'Select Date',
    },
    {
      id: 'aa',
      title: 'Date Picker',
      description:
        'This will be a short description or explainer text explaining the question. ',
      label: 'Date of pickup',
      required: true,
      type: 'string',
      control: 'singledateselector',
      placeholder: 'Select Date',
    },
  ]

  componentDidMount(): void {
    if (!document.querySelector('body').classList.contains('noScroll')) {
      document.querySelector('body').classList.add('noScroll')
    }
    document.querySelector('#ControlPanelWrapper').classList.add('fixed')
  }

  componentWillUnmount(): void {
    document.querySelector('body').classList.remove('noScroll')
    document.querySelector('#ControlPanelWrapper').classList.remove('fixed')
  }

  render(): JSX.Element {
    return (
      <ActionWrapper className="open summary">
        <SummaryWrapper>
          <div>
            <h2 className="summary-header">Claim Summary</h2>
            <h6>Claim Identifier</h6>
            <strong>
              {/* @TODO Upadate this dynamically */}
              a5e45d26a84df315a11384a1b7c1e3e94dda327fa15bd22254da8d45ed95840e
            </strong>
            <h3 className="list-header">Sections</h3>
          </div>
          <ClaimSummaryList>
            {this.questions.map(
              (item, index): JSX.Element => {
                return (
                  <li key={index}>
                    <div>
                      {/* @TODO Add conditional to check for answer status */}
                      {item.title === 'Date Picker' ? (
                        <Query width="13" fill="#F89D28" />
                      ) : (
                        <ApprovedTick width="13" fill="#6FCF97" />
                      )}
                      {item.title}
                    </div>
                    {/* @TODO Add link to answer to edit */}
                    <button>View answer</button>
                  </li>
                )
              },
            )}
          </ClaimSummaryList>
          <ButtonWrapper className="row">
            {/* @TODO Add navigational functions */}
            <div className="col-6">
              <CancelButton>Cancel</CancelButton>
            </div>
            <div className="col-6 select-button-wrapper">
              <SubmitButton>Submit</SubmitButton>
            </div>
          </ButtonWrapper>
        </SummaryWrapper>
      </ActionWrapper>
    )
  }
}

export default ClaimSummary
