import { getPayloadClient } from '../payload'

export async function getFaqItems(locale: string) {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'faq',
    locale: locale as 'pl' | 'en',
    limit: 100,
  })
}
