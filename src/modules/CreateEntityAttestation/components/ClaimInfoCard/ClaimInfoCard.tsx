import React from 'react';
import MultiControlForm from '../../../../common/components/JsonForm/MultiControlForm/MultiControlForm';
import { FormCardProps } from '../../../CreateEntity/types';

interface Props extends FormCardProps {
  title: string
  shortDescription: string
}

const ClaimInfoCard: React.FunctionComponent<Props> = React.forwardRef(
  (
    {
      title,
      shortDescription,
      handleUpdateContent,
      handleSubmitted,
      handleError,
    },
    ref,
  ) => {
    const formData = {
      title,
      shortDescription,
    };

    const schema = {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', title: 'Title' },
        shortDescription: { type: 'string', title: 'Short Description' },
      },
    } as any;

    const uiSchema = {
      title: {
        'ui:widget': 'text',
        'ui:placeholder': 'Enter Name',
      },
      shortDescription: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'Start Typing Here',
      },
    };

    return (
      <MultiControlForm
        ref={ref}
        onSubmit={handleSubmitted}
        onFormDataChange={handleUpdateContent}
        onError={handleError}
        formData={formData}
        schema={schema}
        uiSchema={uiSchema}
      >
        &nbsp;
      </MultiControlForm>
    );
  },
);

export default ClaimInfoCard;
