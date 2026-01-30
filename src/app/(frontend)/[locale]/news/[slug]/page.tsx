import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { getNewsPost } from '@/lib/api'
import { Link } from '@/i18n/navigation'
import type { Media as MediaType } from '@/payload-types'
import type { Locale } from '@/lib/api/news'

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getNewsPost(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

type ContentBlock =
  | { blockType: 'paragraph'; text: string; id?: string | null }
  | { blockType: 'heading'; level: '2' | '3'; text: string; id?: string | null }
  | { blockType: 'image'; image: MediaType | string; id?: string | null }
  | { blockType: 'code'; language?: string | null; code: string; id?: string | null }

function renderBlock(block: ContentBlock) {
  switch (block.blockType) {
    case 'paragraph':
      return <p key={block.id}>{block.text}</p>
    case 'heading':
      if (block.level === '3') return <h3 key={block.id}>{block.text}</h3>
      return <h2 key={block.id}>{block.text}</h2>
    case 'image': {
      const media = block.image as MediaType
      return (
        <figure key={block.id} className="relative w-full aspect-video">
          {media?.url && (
            <Image src={media.url} alt={media.alt || ''} fill className="object-cover" />
          )}
        </figure>
      )
    }
    case 'code':
      return (
        <pre key={block.id}>
          <code data-language={block.language ?? undefined}>{block.code}</code>
        </pre>
      )
    default:
      return null
  }
}

export default async function NewsPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getNewsPost(slug, locale)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'news' })
  const tCommon = await getTranslations({ locale, namespace: 'common' })

  const heroImage = post.heroImage as MediaType | undefined

  const relatedPosts = (post.relatedPosts ?? []).filter(
    (p): p is Exclude<typeof p, string> => typeof p !== 'string',
  )

  return (
    <article>
      <Link href="/news">{tCommon('backToList')}</Link>

      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        <span>{t(`categories.${post.category}`)}</span>
      </header>

      {heroImage?.url && (
        <figure className="relative w-full aspect-video">
          <Image
            src={heroImage.url}
            alt={heroImage.alt || ''}
            fill
            priority
            className="object-cover"
          />
        </figure>
      )}

      <section>
        {(post.contentBlocks as ContentBlock[] | undefined)?.map((block) => renderBlock(block))}
      </section>

      {relatedPosts.length > 0 && (
        <aside>
          <h2>{t('relatedPosts')}</h2>
          <ul>
            {relatedPosts.map((related) => (
              <li key={related.id}>
                <Link href={`/news/${related.slug}`}>{related.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  )
}
