import { getPayloadClient } from '../payload'
import type { PaginatedDocs } from 'payload'
import type { News } from '@/payload-types'

export type Locale = 'pl' | 'en'

export async function getNewsList(
  locale: Locale,
  category?: string
): Promise<PaginatedDocs<News>> {
  const payload = await getPayloadClient()

  const where: {
    category?: { equals: string }
  } = {}

  if (category) {
    where.category = { equals: category }
  }

  return payload.find({
    collection: 'news',
    locale,
    sort: '-date',
    depth: 1,
    where,
  })
}

export async function getNewsPost(
  slug: string,
  locale: Locale
): Promise<News | null> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'news',
    locale,
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  return docs[0] ?? null
}

export async function getNewsCategories() {
  return ['engineering', 'product', 'company'] as const
}
