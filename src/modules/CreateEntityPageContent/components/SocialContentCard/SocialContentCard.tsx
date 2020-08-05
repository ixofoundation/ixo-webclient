import React from 'react'
import Form from '@rjsf/core'
import { debounce } from 'debounce'
import {
  FormContainer,
  FormWrapper,
} from '../../../../common/components/JsonForm/JsonForm.styles'
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils'
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate'
import {
  FormData,
  customControls,
} from '../../../../common/components/JsonForm/types'

interface Props {
  linkedInUrl: string
  facebookUrl: string
  twitterUrl: string
  discourseUrl: string
  instagramUrl: string
  telegramUrl: string
  githubUrl: string
  otherUrl: string
  handleUpdateContent: (formData: FormData) => void
}

const HeaderCard: React.FunctionComponent<Props> = ({
  linkedInUrl,
  facebookUrl,
  twitterUrl,
  discourseUrl,
  instagramUrl,
  telegramUrl,
  githubUrl,
  otherUrl,
  handleUpdateContent,
}) => {
  const formData = {
    linkedInUrl,
    facebookUrl,
    twitterUrl,
    discourseUrl,
    instagramUrl,
    telegramUrl,
    githubUrl,
    otherUrl,
  }

  const schema = {
    type: 'object',
    required: [],
    properties: {
      linkedInUrl: { type: 'string', title: 'Linked In' },
      facebookUrl: { type: 'string', title: 'Facebook' },
      twitterUrl: { type: 'string', title: 'Twitter' },
      discourseUrl: { type: 'string', title: 'Discourse' },
      instagramUrl: { type: 'string', title: 'Instagram' },
      telegramUrl: { type: 'string', title: 'Telegram' },
      githubUrl: { type: 'string', title: 'Github' },
      otherUrl: { type: 'string', title: 'Other' },
    },
  } as any

  const uiSchema = {
    linkedInUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'LinkedIn',
      ['ui:placeholder']: 'Paste Url',
    },
    facebookUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Facebook',
      ['ui:placeholder']: 'Paste Url',
    },
    twitterUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Twitter',
      ['ui:placeholder']: 'Paste Url',
    },
    discourseUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Discourse',
      ['ui:placeholder']: 'Paste Url',
    },
    instagramUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Instagram',
      ['ui:placeholder']: 'Paste Url',
    },
    telegramUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Telegram',
      ['ui:placeholder']: 'Paste Url',
    },
    githubUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Github',
      ['ui:placeholder']: 'Paste Url',
    },
    otherUrl: {
      ['ui:widget']: customControls['socialtextbox'],
      ['ui:socialIcon']: 'Other',
      ['ui:placeholder']: 'Paste Url',
    },
  }

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500)

  return (
    <FormContainer className="row">
      <div className="col-lg-12">
        <FormWrapper>
          <Form
            formData={formData}
            onChange={(control): void =>
              handleUpdateContentDebounce(control.formData)
            }
            noHtml5Validate
            liveValidate
            showErrorList={false}
            schema={schema}
            uiSchema={uiSchema}
            transformErrors={formUtils.transformErrors}
            ObjectFieldTemplate={ObjectFieldTemplate2Column}
          >
            &nbsp;
          </Form>
        </FormWrapper>
      </div>
    </FormContainer>
  )
}

export default HeaderCard
