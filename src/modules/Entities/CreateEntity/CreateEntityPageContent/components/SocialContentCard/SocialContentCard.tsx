import React from 'react'
import { customControls } from 'components/JsonForm/types'
import MultiControlForm from 'components/JsonForm/MultiControlForm/MultiControlForm'
import { FormCardProps } from '../../../../../../redux/createEntityOld/createEntity.types'
import { ObjectFieldTemplate2Column } from 'components/JsonForm/CustomTemplates/ObjectFieldTemplate'

interface Props extends FormCardProps {
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

const SocialContentCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      linkedInUrl,
      facebookUrl,
      twitterUrl,
      discourseUrl,
      instagramUrl,
      telegramUrl,
      githubUrl,
      otherUrl,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
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
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'LinkedIn',
        'ui:placeholder': 'Paste Url',
      },
      facebookUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Facebook',
        'ui:placeholder': 'Paste Url',
      },
      twitterUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Twitter',
        'ui:placeholder': 'Paste Url',
      },
      discourseUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Discourse',
        'ui:placeholder': 'Paste Url',
      },
      instagramUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Instagram',
        'ui:placeholder': 'Paste Url',
      },
      telegramUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Telegram',
        'ui:placeholder': 'Paste Url',
      },
      githubUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Github',
        'ui:placeholder': 'Paste Url',
      },
      otherUrl: {
        'ui:widget': customControls['socialtextbox'],
        'ui:socialIcon': 'Other',
        'ui:placeholder': 'Paste Url',
      },
    }

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
        customObjectFieldTemplate={ObjectFieldTemplate2Column}
      >
        &nbsp;
      </MultiControlForm>
    )
  },
)
SocialContentCard.displayName = 'SocialContentCard'

export default SocialContentCard
