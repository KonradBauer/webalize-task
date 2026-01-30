import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  labels: { singular: 'Code', plural: 'Code Blocks' },
  fields: [
    {
      name: 'language',
      type: 'text',
    },
    {
      name: 'code',
      type: 'code',
      required: true,
    },
  ],
}
