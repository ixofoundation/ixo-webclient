import React from 'react';
import { EDITOR_JS_TOOLS } from 'pages/CreateEntity/Forms/PropertiesForm/SetupPageContent/SetupPageContent.constants';
import { createReactEditorJS } from 'react-editor-js';
import styled from 'styled-components';
import { Box } from 'components/App/App.styles';
import { TEntityPageSectionModel } from 'types/entities';

const ReactEditorJS = createReactEditorJS();

const Wrapper = styled(Box)`
  width: 100%;
  .codex-editor {
    &__redactor {
      padding-bottom: 50px !important;
    }
  }
  .ce-block {
    &__content {
      max-width: unset;
    }
  }
  .image-tool {
    &__image-picture {
      width: 100%;
    }
    &__caption:empty {
      display: none;
    }
  }
`;

interface Props {
  page: TEntityPageSectionModel[] | undefined;
}

const PageContent: React.FC<Props> = ({ page }) => {
  const nonEmptyPage = (page ?? []).filter((content) => !!content.data);

  // If there's no content yet, show skeleton loaders
  if (nonEmptyPage.length === 0) {
    return null
  }

  return (
    <Wrapper>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={{ time: new Date().getTime(), blocks: nonEmptyPage }}
        readOnly
      />
    </Wrapper>
  );
};

export default PageContent;
