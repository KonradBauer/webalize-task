import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { getIntegrations } from '@/lib/api'
import { Link } from '@/i180n/navigation'
import type { Media as MediaType } from '@/payload-types'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

const CATEGORIES = ['analytics', 'marketing', 'sales', 'support', 'development'] as const

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.integrations' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function IntegrationsPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const { category } = await searchParams
  const integrationsResult = await getIntegrations(locale, category)
  const t = await getTranslations({ locale, namespace: 'integrations' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <section>
      <h1>{t('title')}</h1>

      <nav>
        <ul>
          <li>
            <Link href="/integrations">{tCommon('allCategories')}</Link>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link href={`/integrations?category=${cat}`}>{t(`categories.${cat}`)}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {integrationsResult.docs.length === 0 ? (
        <p>{tCommon('noResults')}</p>
      ) : (
        <ul>
          {integrationsResult.docs.map((integration) => {
            const logo = integration.logo as MediaType | undefined
            return (
              <li key={integration.id}>
                <article>
                  {logo?.url && (
                    <Image
                      src={logo.url}
                      alt={logo.alt || integration.name}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  )}
                  <h2>{integration.name}</h2>
                  <p>{integration.shortDescription}</p>

                  <span>{t(`status.${integration.status}`)}</span>

                  {integration.docsUrl && (
                    <a href={integration.docsUrl} target="_blank" rel="noopener noreferrer">
                      {t('docs')}
                    </a>
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}