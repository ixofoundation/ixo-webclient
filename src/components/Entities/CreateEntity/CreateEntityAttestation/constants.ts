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
    'ui:placeholder': 'Provide a short explanation or instruction for the question (optional)',
  },
  attributeType: {
    'ui:widget': 'text',
    'ui:placeholder': 'The attribute eg https://schema.org/Person',
  },
}

export const currencyEnum = [
  'USD (2)',
  'GBP (2)',
  'EUR (2)',
  'CHF (2)',
  'xUSD (6)',
  'eEUR (6)',
  'eCHF (6)',
  'IXO (6)',
  'UST (6)',
  'ATOM (6)',
  'BTC (8)',
  'ETH (8)',
  'USDC (8)',
]

export const amountSchema = currencyEnum.map((item) => {
  const decimalPart = item.match(/.*\((\d+)\)/)
  let decimalLength = 0
  if (decimalPart && decimalPart.length > 1) {
    decimalLength = Number(decimalPart[1])
  }
  return {
    properties: {
      currency: {
        enum: [item],
      },
      amount: {
        type: 'number',
        title: 'Amount',
        multipleOf: 10 ** -decimalLength,
      },
    },
  }
})
