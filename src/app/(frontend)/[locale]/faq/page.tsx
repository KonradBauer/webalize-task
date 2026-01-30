import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getFaqItems } from '@/lib/api'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata.faq' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const faqResult = await getFaqItems(locale)
  const t = await getTranslations({ locale, namespace: 'faq' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  const grouped = new Map<string, typeof faqResult.docs>()
  for (const item of faqResult.docs) {
    const cat = item.category ?? ''
    const existing = grouped.get(cat) ?? []
    existing.push(item)
    grouped.set(cat, existing)
  }

  return (
    <section>
      <h1>{t('title')}</h1>

      {faqResult.docs.length === 0 ? (
        <p>{tCommon('noResults')}</p>
      ) : (
        Array.from(grouped.entries()).map(([category, items]) => (
          <div key={category || '_uncategorized'}>
            {category && <h2>{category}</h2>}
            <dl>
              {items.map((item) => (
                <div key={item.id}>
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))
      )}
    </section>
  )
}
