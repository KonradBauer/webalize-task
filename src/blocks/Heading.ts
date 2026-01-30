import type { Block } from 'payload'

export const Heading: Block = {
  slug: 'heading',
  labels: { singular: 'Heading', plural: 'Headings' },
  fields: [
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: '2',
      options: [
        { label: 'H2', value: '2' },
        { label: 'H3', value: '3' },
      ],
    },
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
