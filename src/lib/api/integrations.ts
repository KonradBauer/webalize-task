import { getPayloadClient } from '../payload'
import type { PaginatedDocs } from 'payload'
import type { Integration } from '@/payload-types'

export type Locale = 'pl' | 'en'

export async function getIntegrations(
  locale: Locale,
  category?: string
): Promise<PaginatedDocs<Integration>> {
  const payload = await getPayloadClient()

  const where: {
    category?: { equals: string }
  } = {}

  if (category) {
    where.category = { equals: category }
  }

  return payload.find({
    collection: 'integrations',
    locale,
    sort: 'name',
    depth: 1,
    where,
  })
}
