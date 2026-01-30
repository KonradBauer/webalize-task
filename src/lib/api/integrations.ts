import { getPayloadClient } from '../payload'

export async function getIntegrations(locale: string, category?: string) {
  const payload = await getPayloadClient()

  const where: Record<string, unknown> = {}
  if (category) {
    where.category = { equals: category }
  }

  return payload.find({
    collection: 'integrations',
    locale: locale as 'pl' | 'en',
    sort: 'name',
    depth: 1,
    where,
  })
}