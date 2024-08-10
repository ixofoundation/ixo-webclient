export const EditorJsToBlockNote = (page: any) => {
  if (!page) return undefined
  if (Array.isArray(page)) {
    return page.reduce((acc, block) => {
      if (block.type === 'heroImage' || block.type === 'image') {
        return [
          ...acc,
          {
            id: block.id,
            type: 'image',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
              showPreview: true,
              url: block.data.file.url,
            },
          },
        ]
      }
      if (block.type === 'pageTitle') {
        return [
          ...acc,
          {
            id: block.id,
            type: 'heading',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
              level: 1,
            },
            content: [{ type: 'text', text: block.data.text, styles: {} }],
          },
        ]
      }
      if (block.type === 'header') {
        return [
          ...acc,
          {
            id: block.id,
            type: 'heading',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
              level: block.data.level,
            },
            content: [
              {
                type: 'text',
                text: block.data.text,
                styles: {},
              },
            ],
          },
        ]
      }
      if (block.type === 'paragraph') {
        return [
          ...acc,
          {
            id: block.id,
            type: 'paragraph',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
            },
            content: [
              {
                type: 'text',
                text: block.data.text,
                styles: {},
              },
            ],
          },
        ]
      }

      if (block.type === 'list') {
        return [
          ...acc,
          ...block.data.items.map((item: any) => ({
            id: block.id,
            type: 'bulletListItem',
            props: {
              textColor: 'default',
              backgroundColor: 'default',
              textAlignment: 'left',
            },
            content: [
              {
                type: 'text',
                text: item,
                styles: {},
              },
            ],
          })),
        ]
      }

      return acc
    }, [])
  }

  return page.content
}
