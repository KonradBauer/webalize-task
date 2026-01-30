import { getPayloadClient } from '../payload'

export async function getNavigation(locale: string) {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'pl' | 'en',
  })
}

export async function getFooter(locale: string) {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'footer',
    locale: locale as 'pl' | 'en',
  })
}

export async function getContactModal(locale: string) {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'contact-modal',
    locale: locale as 'pl' | 'en',
  })
}
