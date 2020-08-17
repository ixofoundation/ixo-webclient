import React from 'react';
import Form from '@rjsf/core';
import { debounce } from 'debounce';
import { FormContainer } from '../../../../common/components/JsonForm/JsonForm.styles';
import * as formUtils from '../../../../common/components/JsonForm/JsonForm.utils';
import { ObjectFieldTemplate2Column } from '../../../../common/components/JsonForm/CustomTemplates/ObjectFieldTemplate';
import { FormData } from '../../../../common/components/JsonForm/types';
import { ClaimQuestionCardWrapper } from '../ClaimQuestionCard/ClaimQuestionCard.styles';

interface Props {
  claimName: string
  shortDescription: string
  handleUpdateContent: (formData: FormData) => void
}

const ClaimInfoCard: React.FunctionComponent<Props> = ({
  claimName,
  shortDescription,
  handleUpdateContent,
}) => {
  const formData = {
    claimName,
    shortDescription,
  };

  const schema = {
    type: 'object',
    required: [],
    properties: {
      claimName: { type: 'string', title: '*Claim Name' },
      shortDescription: { type: 'string', title: 'Short Description' },
    },
  } as any;

  const uiSchema = {
    claimName: {
      'ui:widget': 'text',
      'ui:placeholder': 'Enter Name',
    },
    shortDescription: {
      'ui:widget': 'text',
      'ui:placeholder': 'Start Typing Here',
    },
  };

  const handleUpdateContentDebounce = debounce(handleUpdateContent, 500);

  return (
    <FormContainer>
      <ClaimQuestionCardWrapper>
        <h2>Claim info</h2>
        <Form
          formData={formData}
          onChange={(control): void =>
            handleUpdateContentDebounce(control.formData)}
          noHtml5Validate
          liveValidate
          showErrorList={false}
          schema={schema}
          uiSchema={uiSchema}
          transformErrors={formUtils.transformErrors}
          ObjectFieldTemplate={ObjectFieldTemplate2Column}
        >
          <span className="hide">&nbsp;</span>
        </Form>
      </ClaimQuestionCardWrapper>
    </FormContainer>
  );
};

export default ClaimInfoCard;
