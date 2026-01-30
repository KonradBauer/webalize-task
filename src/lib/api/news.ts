import { getPayloadClient } from '../payload'

export async function getNewsList(locale: string, category?: string) {
  const payload = await getPayloadClient()

  const where: Record<string, unknown> = {}
  if (category) {
    where.category = { equals: category }
  }

  return payload.find({
    collection: 'news',
    locale: locale as 'pl' | 'en',
    sort: '-date',
    depth: 1,
    where,
  })
}

export async function getNewsPost(slug: string, locale: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'news',
    locale: locale as 'pl' | 'en',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] ?? null
}

export async function getNewsCategories() {
  return ['engineering', 'product', 'company'] as const
}