import { getContactModal, getFooter, getNavigation } from '@/lib/api/globals'

export async function getLayoutData(locale: string) {
  const [navigation, footer, contactModal] = await Promise.all([
    getNavigation(locale),
    getFooter(locale),
    getContactModal(locale),
  ])
  return { navigation, footer, contactModal }
}