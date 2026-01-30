import React from 'react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getLayoutData } from '@/lib/api'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const [messages, { navigation, footer }] = await Promise.all([
    getMessages(),
    getLayoutData(locale),
  ])

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <header>
            <nav>
              <ul>
                {navigation.items?.map((item, i) => (
                  <li key={i}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            {footer.columns?.map((column, i) => (
              <div key={i}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links?.map((link, j) => (
                    <li key={j}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
