import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { uploadFile } from 'components/Editor/uploadFile';
import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { useEffect, useState } from 'react';
import './Editor.css';
import { ImageBlock } from './CustomBlocks/Image/ImageBlock';
import { en } from './customDictionary';
import { Box } from '@mantine/core';
import { TEntityPageModel } from 'types/entities';
import FeaturedImage from './FeaturedImage/FeaturedImage';
import PageTitle from './PageTitle/PageTitle';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    heroImage: ImageBlock,
  },
});

type Props = {
  editable?: boolean;
  initialPage?: TEntityPageModel;
  onChange?: (page: TEntityPageModel) => void;
};

const Editor = ({ editable = false, initialPage, onChange }: Props) => {
  const [page, setPage] = useState<TEntityPageModel>(
    initialPage ?? { featuredImage: '', pageTitle: '', content: [] }
  );

  const editor = useCreateBlockNote({
    schema,
    ...(page?.content?.length > 0 && { initialContent: page.content }),
    uploadFile,
    dictionary: en,
  });

  useEffect(() => {
    if (page !== initialPage && onChange) {
      onChange(page);
    }
  }, [page, initialPage, onChange]);

  const handleFeaturedImageChange = (image: string) => {
    setPage((prev) => ({ ...prev, featuredImage: image }));
  };

  const handleContentChange = () => {
    setPage((prev) => ({ ...prev, content: editor?.document as Block[] }));
  };

  const handlePageTitleChange = (title: string) => {
    setPage((prev) => ({ ...prev, pageTitle: title }));
  }

  return (
    <Box>
      <FeaturedImage editable={editable} onChange={handleFeaturedImageChange} initialImage={page.featuredImage} />
      <PageTitle editable={editable} onChange={handlePageTitleChange} initialTitle={page.pageTitle} />
      <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={handleContentChange}
      />
    </Box>
  );
};

export default Editor;
