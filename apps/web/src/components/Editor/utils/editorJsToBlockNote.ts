export const EditorJsToBlockNote = (page: any[]) => {
  return page.reduce(
    (acc, block) => {
      if (block.type === 'heroImage') {
        return {
          ...acc,
          featuredImage: block?.data?.file?.url ?? '',
        }
      }
      if (block.type === 'pageTitle') {
        return {
          ...acc,
          pageTitle: block.data.text,
        }
      }
      if (block.type === 'paragraph') {
        return {
          ...acc,
          content: [
            ...(acc?.content ?? []),
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
          ],
        }
      }

      if (block.type === 'list') {
        return {
          ...acc,
          content: [
            ...(acc?.content ?? []),
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
          ],
        }
      }

      return acc
    },
    {
      featuredImage: '',
      pageTitle: '',
      content: [],
    },
  )
}
