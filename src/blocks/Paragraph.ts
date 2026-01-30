import type { Block } from 'payload'

export const Paragraph: Block = {
  slug: 'paragraph',
  labels: {
    singular: 'Paragraph',
    plural: 'Paragraphs',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}