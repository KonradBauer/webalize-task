import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Faq } from './collections/Faq'
import { Integrations } from './collections/Integrations'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Navigation, Footer, ContactModal } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, News, Faq, Integrations, ContactSubmissions],
  globals: [Navigation, Footer, ContactModal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  localization: {
    locales: [
      { label: 'Polski', code: 'pl' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'pl',
    fallback: true,
  },
  sharp,
  plugins: [],
})
