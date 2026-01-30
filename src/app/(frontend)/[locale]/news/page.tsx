import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getNewsList, getNewsCategories } from '@/lib/api'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/lib/api/news'

type Props = {
  params: { locale: Locale }
  searchParams: { category?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params

  const t = await getTranslations({
    locale,
    namespace: 'metadata.news',
  })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { locale } = params
  const { category } = searchParams

  setRequestLocale(locale)

  const [newsResult, categories] = await Promise.all([
    getNewsList(locale, category),
    getNewsCategories(),
  ])

  const t = await getTranslations({ locale, namespace: 'news' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  return (
    <section>
      <h1>{t('title')}</h1>

      <nav>
        <ul>
          <li>
            <Link href="/news">{tCommon('allCategories')}</Link>
          </li>

          {categories.map((cat) => (
            <li key={cat}>
              <Link href={{ pathname: '/news', query: { category: cat } }}>
                {t(`categories.${cat}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {newsResult.docs.length === 0 ? (
        <p>{tCommon('noResults')}</p>
      ) : (
        <ul>
          {newsResult.docs.map((post) => (
            <li key={post.id}>
              <article>
                <h2>
                  <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <time dateTime={post.date}>{post.date}</time>
                <span>{t(`categories.${post.category}`)}</span>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
