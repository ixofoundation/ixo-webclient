export const questionSchema = {
  type: 'object',
  required: ['title', 'label', 'attributeType'],
  properties: {
    title: { type: 'string', title: 'Title' },
    label: { type: 'string', title: 'Control Label' },
    description: { type: 'string', title: 'Description' },
    attributeType: { type: 'string', title: 'Attribute', format: 'uri' },
  },
}

export const questionUiSchema = {
  title: {
    'ui:widget': 'text',
    'ui:placeholder': 'The title of the question',
  },
  label: {
    'ui:widget': 'text',
    'ui:placeholder': 'The label for the input',
  },
  description: {
    'ui:widget': 'textarea',
    'ui:placeholder':
      'Provide a short explanation or instruction for the question (optional)',
  },
  attributeType: {
    'ui:widget': 'text',
    'ui:placeholder': 'The attribute eg https://schema.org/Person',
  },
}
