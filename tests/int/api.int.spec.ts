import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  describe('News', () => {
    let newsId: string

    it('creates a news article', async () => {
      const news = await payload.create({
        collection: 'news',
        data: {
          title: 'Test News',
          slug: 'test-news-int',
          excerpt: 'Test excerpt',
          date: '2025-01-01',
          category: 'engineering',
          heroImage: '',
        } as any,
      })
      expect(news).toBeDefined()
      expect(news.title).toBe('Test News')
      newsId = news.id
    })

    it('reads a news article', async () => {
      const news = await payload.findByID({
        collection: 'news',
        id: newsId,
      })
      expect(news).toBeDefined()
      expect(news.slug).toBe('test-news-int')
    })

    it('filters news by category', async () => {
      const result = await payload.find({
        collection: 'news',
        where: {
          category: { equals: 'engineering' },
        },
      })
      expect(result.docs.length).toBeGreaterThanOrEqual(1)
    })

    it('deletes a news article', async () => {
      const deleted = await payload.delete({
        collection: 'news',
        id: newsId,
      })
      expect(deleted).toBeDefined()
    })
  })

  describe('FAQ', () => {
    let faqId: string

    it('creates a FAQ entry', async () => {
      const faq = await payload.create({
        collection: 'faq',
        data: {
          question: 'What is Webalize?',
          answer: 'A web platform.',
        },
      })
      expect(faq).toBeDefined()
      expect(faq.question).toBe('What is Webalize?')
      faqId = faq.id
    })

    it('reads a FAQ entry', async () => {
      const faq = await payload.findByID({
        collection: 'faq',
        id: faqId,
      })
      expect(faq).toBeDefined()
      expect(faq.answer).toBe('A web platform.')
    })

    it('filters FAQ by question', async () => {
      const result = await payload.find({
        collection: 'faq',
        where: {
          question: { contains: 'Webalize' },
        },
      })
      expect(result.docs.length).toBeGreaterThanOrEqual(1)
    })

    it('deletes a FAQ entry', async () => {
      const deleted = await payload.delete({
        collection: 'faq',
        id: faqId,
      })
      expect(deleted).toBeDefined()
    })
  })

  describe('Integrations', () => {
    let integrationId: string

    it('creates an integration', async () => {
      const integration = await payload.create({
        collection: 'integrations',
        data: {
          name: 'Test Integration',
          shortDescription: 'A test integration.',
          category: 'analytics',
          status: 'available',
          logo: '',
        } as any,
      })
      expect(integration).toBeDefined()
      expect(integration.name).toBe('Test Integration')
      integrationId = integration.id
    })

    it('reads an integration', async () => {
      const integration = await payload.findByID({
        collection: 'integrations',
        id: integrationId,
      })
      expect(integration).toBeDefined()
      expect(integration.category).toBe('analytics')
    })

    it('filters integrations by status', async () => {
      const result = await payload.find({
        collection: 'integrations',
        where: {
          status: { equals: 'available' },
        },
      })
      expect(result.docs.length).toBeGreaterThanOrEqual(1)
    })

    it('deletes an integration', async () => {
      const deleted = await payload.delete({
        collection: 'integrations',
        id: integrationId,
      })
      expect(deleted).toBeDefined()
    })
  })

  describe('ContactSubmissions', () => {
    let submissionId: string

    it('creates a contact submission', async () => {
      const submission = await payload.create({
        collection: 'contact-submissions',
        data: {
          email: 'test@example.com',
          data: { name: 'Test User', message: 'Hello' },
          locale: 'en',
        },
      })
      expect(submission).toBeDefined()
      expect(submission.email).toBe('test@example.com')
      submissionId = submission.id
    })

    it('reads a contact submission', async () => {
      const submission = await payload.findByID({
        collection: 'contact-submissions',
        id: submissionId,
      })
      expect(submission).toBeDefined()
      expect(submission.locale).toBe('en')
    })

    it('filters contact submissions by email', async () => {
      const result = await payload.find({
        collection: 'contact-submissions',
        where: {
          email: { equals: 'test@example.com' },
        },
      })
      expect(result.docs.length).toBeGreaterThanOrEqual(1)
    })

    it('rejects a contact submission without email', async () => {
      await expect(
        payload.create({
          collection: 'contact-submissions',
          data: {
            data: { name: 'No Email' },
          } as any,
        }),
      ).rejects.toThrow()
    })

    it('deletes a contact submission', async () => {
      const deleted = await payload.delete({
        collection: 'contact-submissions',
        id: submissionId,
      })
      expect(deleted).toBeDefined()
    })
  })
})
