'use client';

import { useState } from 'react';

const CodeBlock = ({ code, language = '' }) => {
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	return (
		<div className='rounded-sm overflow-hidden border border-primary bg-dark'>
			<div className='flex items-center justify-between px-1 py-0.5 bg-dark border-b border-primary'>
				<span className='text-xs text-secondary font-secondary'>
					{language}
				</span>
				<button
					onClick={handleCopy}
					className='text-xs text-white hover:text-secondary transition-colors px-0.75 py-0.25 rounded-sm font-secondary'
				>
					{copied ? '✓ Copied' : 'Copy'}
				</button>
			</div>
			<pre className='p-1 overflow-x-auto text-white font-secondary text-xs leading-relaxed whitespace-pre'>
				{code}
			</pre>
		</div>
	);
};

const Step = ({ number, title, children }) => (
	<div className='flex gap-1'>
		<div className='flex-shrink-0 w-2 h-2 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white font-secondary mt-0.25'>
			{number}
		</div>
		<div className='flex-1 space-y-0.75 pb-2 border-b border-accent last:border-0'>
			<h3 className='font-default font-semibold text-dark pt-0.25'>{title}</h3>
			{children}
		</div>
	</div>
);

const Label = ({ children }) => (
	<p className='text-xs text-primary font-secondary font-semibold mb-0.25 mt-0.75'>
		{children}
	</p>
);

const Note = ({ children }) => (
	<p className='text-xs font-secondary text-dark opacity-70 leading-relaxed'>
		{children}
	</p>
);

// ─── FILE REFERENCE ───────────────────────────────────────────────────────────
const fileStructure = `schemaTypes/
  seoSettings.js              ← singleton: site-wide SEO + schema.org data
  partials/
    seoField.js               ← reusable object field, spread into any page schema

utils/
  cms/
    fetchSeoSettings.js       ← cached fetch, used by layout + buildPageMetadata
  seo/
    buildPageMetadata.js      ← one helper called on every page

lib/seo/
  buildOrganizationSchema.js  ← builds JSON-LD from seoSettings data
  buildFaqSchema.js           ← use on pages with FAQ sections
  buildBreadcrumbSchema.js    ← use on pages with nested URLs

components/seo/
  JsonLd.js                   ← drops the <script> tag into the page`;

// ─── STEP 1 — seoSettings schema ─────────────────────────────────────────────
const seoSettingsCode = `// schemaTypes/seoSettings.js

export default {
  name: 'seoSettings',
  type: 'document',
  title: 'SEO Settings',
  fields: [
    // ── Site Identity ──────────────────────────────────────────────────────
    {
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      description: 'Business name as it appears in the title tag. e.g. "Acme Cleaning Co."',
    },
    {
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      description: 'Production URL with https. e.g. "https://www.acmecleaning.com"',
    },
    {
      name: 'titleTemplate',
      type: 'string',
      title: 'Title Template',
      description: 'Use %s as the page title placeholder. e.g. "%s | Acme Cleaning Co."',
      initialValue: '%s | Site Name',
    },

    // ── Default Meta ───────────────────────────────────────────────────────
    {
      name: 'defaultTitle',
      type: 'string',
      title: 'Default Title',
      description: 'Homepage title and fallback for pages with no custom title. 50-60 chars.',
    },
    {
      name: 'defaultDescription',
      type: 'text',
      title: 'Default Description',
      rows: 3,
      description: 'Fallback meta description site-wide. 150-160 chars.',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Primary site keywords. 5-10 is plenty.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Default OG Image',
      description: 'Social share image. 1200x630px. Used on all pages unless overridden.',
      options: { hotspot: true },
    },

    // ── Social ────────────────────────────────────────────────────────────
    {
      name: 'twitterHandle',
      type: 'string',
      title: 'Twitter / X Handle',
      description: 'Include the @. Leave blank if client has no presence.',
    },

    // ── Schema.org ────────────────────────────────────────────────────────
    {
      name: 'schemaType',
      type: 'string',
      title: 'Schema Type',
      description: 'Organization for non-physical businesses. LocalBusiness for everyone else.',
      options: {
        list: [
          { title: 'Organization', value: 'Organization' },
          { title: 'LocalBusiness', value: 'LocalBusiness' },
          { title: 'Restaurant', value: 'Restaurant' },
          { title: 'HomeAndConstructionBusiness', value: 'HomeAndConstructionBusiness' },
          { title: 'CleaningService', value: 'CleaningService' },
          { title: 'Photographer', value: 'Photographer' },
          { title: 'InsuranceAgency', value: 'InsuranceAgency' },
        ],
        layout: 'radio',
      },
      initialValue: 'LocalBusiness',
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      description: 'e.g. 715-000-0000',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
    },
    {
      name: 'address',
      type: 'object',
      title: 'Address',
      fields: [
        { name: 'street', type: 'string', title: 'Street Address' },
        { name: 'city',   type: 'string', title: 'City' },
        { name: 'state',  type: 'string', title: 'State', initialValue: 'WI' },
        { name: 'zip',    type: 'string', title: 'ZIP Code' },
      ],
    },
    {
      name: 'serviceAreas',
      type: 'array',
      title: 'Service Areas',
      description: 'Cities or counties served. Used in schema areaServed.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'priceRange',
      type: 'string',
      title: 'Price Range',
      description: 'For LocalBusiness schema. $, $$, $$$, or $$$$',
      options: { list: ['$', '$$', '$$$', '$$$$'], layout: 'radio' },
    },
  ],
  preview: {
    select: { title: 'siteName', subtitle: 'siteUrl' },
  },
}`;

// ─── STEP 2 — seoField partial ────────────────────────────────────────────────
const seoFieldCode = `// schemaTypes/partials/seoField.js
// Reusable SEO field — spread into any page schema with ...seoField

export const seoField = [
  {
    name: 'seo',
    type: 'object',
    title: 'SEO',
    description: 'Leave blank to use site defaults from SEO Settings.',
    options: { collapsible: true, collapsed: true },
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Page Title',
        description: '50-60 characters. Leave blank to use site default.',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Meta Description',
        rows: 3,
        description: '150-160 characters. Leave blank to use site default.',
      },
      {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Page-specific keywords. Leave blank to use site defaults.',
        of: [{ type: 'string' }],
        options: { layout: 'tags' },
      },
      {
        name: 'ogImage',
        type: 'image',
        title: 'Social Share Image',
        description: '1200x630px. Leave blank to use the default OG image.',
        options: { hotspot: true },
      },
      {
        name: 'noIndex',
        type: 'boolean',
        title: 'Hide from search engines',
        description: 'Sets noindex. Use for thank-you pages, redirects, etc.',
        initialValue: false,
      },
    ],
  },
]`;

// ─── STEP 2b — usage in a page schema ────────────────────────────────────────
const seoFieldUsageCode = `// schemaTypes/homePage.js — example using seoField
import { seoField } from './partials/seoField'

export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    // ... all your other page fields ...

    ...seoField,  // ← one line, dropped at the bottom of every page schema
  ],
}`;

// ─── STEP 3 — schemaTypes/index.js ───────────────────────────────────────────
const schemaIndexCode = `// schemaTypes/index.js

import seoSettings from './seoSettings'
import contactForm from './contactForm'
import homePage    from './homePage'
import navigation  from './navigation'
// ... other page schemas

export const schemaTypes = [
  seoSettings,
  contactForm,
  homePage,
  navigation,
]`;

// ─── STEP 4 — structure.js snippet ───────────────────────────────────────────
const structureSnippetCode = `// When you build structure.js for a project, paste this block in.
// It is commented out by default — seoSettings is invisible to the client.
// To expose it for a client on an SEO plan: uncomment and move above the divider.

// S.listItem()
//   .title('SEO Settings')
//   .child(
//     S.document()
//       .schemaType('seoSettings')
//       .documentId('seoSettings')
//   ),`;

// ─── STEP 5 — GROQ queries ────────────────────────────────────────────────────
const seoSettingsQueryCode = `// data/queries/FETCH_SEO_SETTINGS_QUERY.js

export const FETCH_SEO_SETTINGS_QUERY = \`*[_type == "seoSettings"][0]{
  siteName,
  siteUrl,
  titleTemplate,
  defaultTitle,
  defaultDescription,
  keywords,
  "ogImage": ogImage.asset->url,
  twitterHandle,
  schemaType,
  phone,
  email,
  address,
  serviceAreas,
  priceRange,
}\``;

const pageSeoFragmentCode = `// Add this seo{} block to the bottom of every page query.
// The rest of the query stays exactly the same.

// Example: data/queries/pages/FETCH_ABOUT_QUERY.js
export const FETCH_ABOUT_QUERY = \`*[_type == "aboutPage"][0]{
  hero,
  content,
  // ... all your other page fields ...

  seo{
    title,
    description,
    keywords,
    "ogImage": ogImage.asset->url,
    noIndex,
  }
}\``;

// ─── STEP 6 — fetchSeoSettings utility ───────────────────────────────────────
const fetchSeoSettingsCode = `// utils/cms/fetchSeoSettings.js

import { sanityClient } from '@/utils/cms/sanityConnection'
import { FETCH_SEO_SETTINGS_QUERY } from '@/data/queries/FETCH_SEO_SETTINGS_QUERY'

export async function fetchSeoSettings() {
  return sanityClient.fetch(
    FETCH_SEO_SETTINGS_QUERY,
    {},
    { next: { revalidate: 3600 } } // 1 hour cache — SEO settings rarely change
  )
}`;

// ─── STEP 7 — buildPageMetadata helper ───────────────────────────────────────
const buildPageMetadataCode = `// utils/seo/buildPageMetadata.js
// The one helper you call on every page instead of writing the same
// fallback logic over and over.

import { fetchContent }     from '@/utils/cms/fetchContent'
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings'

export async function buildPageMetadata({ slug, query }) {
  const [pageData, site] = await Promise.all([
    fetchContent(query),
    fetchSeoSettings(),
  ])

  const seo = pageData?.seo  // null if client left it blank — fallback handles it

  return {
    title:       seo?.title       ?? site.defaultTitle,
    description: seo?.description ?? site.defaultDescription,
    keywords:    seo?.keywords    ?? site.keywords,
    alternates: {
      canonical: slug,
    },
    robots: {
      index:  seo?.noIndex ? false : true,
      follow: true,
    },
    openGraph: {
      title:       seo?.title       ?? site.defaultTitle,
      description: seo?.description ?? site.defaultDescription,
      images: [{
        url:    seo?.ogImage ?? site.ogImage,
        width:  1200,
        height: 630,
      }],
    },
  }
}`;

// ─── STEP 8 — layout.js diff ──────────────────────────────────────────────────
const layoutDiffCode = `// app/layout.js — changes from starter
// Everything else (fonts, draft mode, nav, footer) stays exactly the same.
// Make 3 changes:

// 1. REMOVE this import:
import { mainLayoutMetadata } from '@/lib/seo/mainLayoutMetadata'

// 2. ADD these imports:
import { fetchSeoSettings }        from '@/utils/cms/fetchSeoSettings'
import { buildOrganizationSchema } from '@/lib/seo/buildOrganizationSchema'
import JsonLd                      from '@/components/seo/JsonLd'

// ─────────────────────────────────────────────────────────────────────────────

// 3. REPLACE the static metadata export:

// REMOVE:
export const metadata = {
  metadataBase: new URL(mainLayoutMetadata.siteUrl),
  // ... all of it
}

// ADD:
export async function generateMetadata() {
  const seo = await fetchSeoSettings()

  return {
    metadataBase:    new URL(seo.siteUrl),
    applicationName: seo.siteName,
    title: {
      default:  seo.defaultTitle,
      template: seo.titleTemplate,
    },
    description: seo.defaultDescription,
    keywords:    seo.keywords,
    icons: { icon: '/favicon.ico' },
    openGraph: {
      title:       seo.defaultTitle,
      description: seo.defaultDescription,
      url:         seo.siteUrl,
      siteName:    seo.siteName,
      images: [{ url: seo.ogImage, width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       seo.defaultTitle,
      description: seo.defaultDescription,
      ...(seo.twitterHandle && { creator: seo.twitterHandle }),
      images:      [seo.ogImage],
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────

// 4. ADD JsonLd inside <body> — before {children}:

export default async function RootLayout({ children }) {
  const seo    = await fetchSeoSettings()  // same cached call — no extra Sanity hit
  const schema = buildOrganizationSchema(seo)

  return (
    <html lang='en'>
      <body className={\`min-h-screen \${fustat.variable} \${openSans.variable}\`}>
        <JsonLd data={schema} />           {/* ← ADD THIS */}
        <NavigationContainer />
        {children}
        <Analytics />
        <Footer />
        {(await draftMode()).isEnabled && <VisualEditingClient />}
      </body>
    </html>
  )
}`;

// ─── STEP 9 — per-page usage ──────────────────────────────────────────────────
const pageUsageCode = `// Every page — this is all you write. 4 lines.

import { buildPageMetadata }  from '@/utils/seo/buildPageMetadata'
import { FETCH_ABOUT_QUERY }  from '@/data/queries/pages/FETCH_ABOUT_QUERY'

export async function generateMetadata() {
  return buildPageMetadata({ slug: '/about', query: FETCH_ABOUT_QUERY })
}

export default async function About() {
  const data = await fetchContent(FETCH_ABOUT_QUERY) // already cached — no extra call
  // ...
}`;

const pageUsageHomepageCode = `// Homepage — title comes from seoSettings.defaultTitle directly
// so no override needed. Canonical is just '/'.

import { buildPageMetadata } from '@/utils/seo/buildPageMetadata'
import { FETCH_HOMEPAGE_QUERY } from '@/data/queries/pages/FETCH_HOMEPAGE_QUERY'

export async function generateMetadata() {
  return buildPageMetadata({ slug: '/', query: FETCH_HOMEPAGE_QUERY })
}`;

// ─── STEP 10 — buildOrganizationSchema ───────────────────────────────────────
const buildOrganizationSchemaCode = `// lib/seo/buildOrganizationSchema.js
// Builds JSON-LD from live seoSettings data.
// One function handles all schema types — no per-client files.

export function buildOrganizationSchema(seo) {
  return {
    '@context': 'https://schema.org',
    '@type':    seo.schemaType ?? 'LocalBusiness',
    name:        seo.siteName,
    url:         seo.siteUrl,
    logo:        seo.ogImage,
    description: seo.defaultDescription,
    telephone:   seo.phone,
    email:       seo.email,
    ...(seo.address && {
      address: {
        '@type':         'PostalAddress',
        streetAddress:   seo.address.street,
        addressLocality: seo.address.city,
        addressRegion:   seo.address.state,
        postalCode:      seo.address.zip,
        addressCountry:  'US',
      },
    }),
    ...(seo.serviceAreas?.length && {
      areaServed: seo.serviceAreas.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })),
    }),
    ...(seo.priceRange && { priceRange: seo.priceRange }),
    contactPoint: {
      '@type':       'ContactPoint',
      telephone:     seo.phone,
      contactType:   'customer service',
      email:         seo.email,
      areaServed:    'US',
    },
  }
}`;

const jsonLdCode = `// components/seo/JsonLd.js

export default function JsonLd({ data }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}`;

// ─── STEP 11 — FAQ + Breadcrumb ───────────────────────────────────────────────
const faqSchemaCode = `// lib/seo/buildFaqSchema.js
// Use on any page with a FAQ section.
// faqs come from your Sanity page data — add a faqs array field to the page schema.

export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}`;

const breadcrumbSchemaCode = `// lib/seo/buildBreadcrumbSchema.js
// Use on pages with nested URLs (services → individual service, etc.)

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type':    'ListItem',
      position:   index + 1,
      name:       item.name,
      item:       item.url,
    })),
  }
}`;

const faqUsageCode = `// Any page with FAQs

import JsonLd from '@/components/seo/JsonLd'
import { buildFaqSchema } from '@/lib/seo/buildFaqSchema'

export default async function Services() {
  const data = await fetchContent(FETCH_SERVICES_QUERY)

  return (
    <>
      <JsonLd data={buildFaqSchema(data.faqs)} />
      {/* page content */}
    </>
  )
}`;

// ─── STEP 12 — next-sitemap ───────────────────────────────────────────────────
const nextSitemapCode = `// next-sitemap.config.js
// Already in the starter. Only change needed per project: update siteUrl.

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.clientdomain.com',  // ← update before launch
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  exclude: ['/api/*', '/studio/*'],
}`;

// ─── STEP 13 — checklist ──────────────────────────────────────────────────────
const checklistCode = `SANITY
✅  seoSettings document created and published
✅  siteName, siteUrl, defaultTitle, defaultDescription filled in
✅  titleTemplate set  — e.g. "%s | Business Name"
✅  OG image uploaded (1200x630px)
✅  schemaType selected (LocalBusiness for most clients)
✅  phone, email, address, serviceAreas filled in
✅  seoField spread into every page schema  — ...seoField
✅  seo{} block added to every page GROQ query

NEXT.JS
✅  layout.js updated — generateMetadata() + JsonLd in body
✅  buildPageMetadata() called on every page
✅  Correct canonical slug on every page
✅  next-sitemap.config.js siteUrl updated to production domain

STRUCTURE.JS  (when you build it)
✅  seoSettings block pasted in and commented out by default

PRE-LAUNCH
✅  /public/opengraph-image.png exists as fallback (1200x630px)
✅  Build locally — /sitemap.xml generates correctly
✅  Build locally — /robots.txt is correct
✅  Test OG image:  opengraph.xyz
✅  Test JSON-LD:   search.google.com/test/rich-results
✅  No pages have noIndex accidentally set to true`;

// ─────────────────────────────────────────────────────────────────────────────

export default function SEOSetup() {
	return (
		<section className='max-w-7xl mx-auto mt-3 mb-2 px-1'>
			<div className='mb-2 pb-1 border-b border-accent'>
				<h2 className='font-default text-xl font-bold text-dark mb-0.25'>
					SEO Setup
				</h2>
				<p className='text-xs font-secondary text-dark opacity-60'>
					Sanity-first. No metadata files. Fill it in Sanity while you build.
					Hidden from clients by default — expose per plan.
				</p>
			</div>

			{/* File map */}
			<div className='mb-2'>
				<Label>Files you are creating</Label>
				<CodeBlock language='file structure' code={fileStructure} />
			</div>

			<div className='space-y-0.5'>
				{/* STEP 1 */}
				<Step number={1} title='seoSettings schema — Sanity'>
					<Note>
						One singleton document per project. Holds everything: site identity,
						default meta, OG image, and all schema.org data. Fill it in Sanity
						while you&apos;re building — no separate metadata files.
					</Note>
					<Label>schemaTypes/seoSettings.js</Label>
					<CodeBlock
						language='schemaTypes/seoSettings.js'
						code={seoSettingsCode}
					/>
				</Step>

				{/* STEP 2 */}
				<Step number={2} title='seoField partial — reusable page SEO field'>
					<Note>
						Write once, import everywhere. Spread <code>...seoField</code> at
						the bottom of any page schema and the SEO block is there — collapsed
						by default, fully optional. All fields fall back to{' '}
						<code>seoSettings</code> when left blank.
					</Note>
					<Label>schemaTypes/partials/seoField.js</Label>
					<CodeBlock
						language='schemaTypes/partials/seoField.js'
						code={seoFieldCode}
					/>
					<Label>Usage in any page schema</Label>
					<CodeBlock
						language='schemaTypes/homePage.js (example)'
						code={seoFieldUsageCode}
					/>
				</Step>

				{/* STEP 3 */}
				<Step number={3} title='Register seoSettings in schemaTypes/index.js'>
					<Note>
						Add <code>seoSettings</code> to your schema index. The page schemas
						already pull in <code>seoField</code> via the spread — nothing extra
						needed there.
					</Note>
					<Label>schemaTypes/index.js</Label>
					<CodeBlock language='schemaTypes/index.js' code={schemaIndexCode} />
				</Step>

				{/* STEP 4 */}
				<Step number={4} title='structure.js — hide seoSettings from client'>
					<Note>
						You won&apos;t have <code>structure.js</code> at project start —
						that&apos;s fine. When you build it for a project, paste this block
						in and leave it commented out. Clients can&apos;t see it. To expose
						it for a client on an SEO plan: uncomment and move it above the
						divider. Zero other changes needed.
					</Note>
					<Label>Paste into structure.js when you build it</Label>
					<CodeBlock
						language='structure.js snippet'
						code={structureSnippetCode}
					/>
				</Step>

				{/* STEP 5 */}
				<Step number={5} title='GROQ queries'>
					<Note>
						Two queries. One for <code>seoSettings</code> — used by the layout
						helper. One fragment you add to the bottom of every page query — no
						changes to your existing fields, just tack it on.
					</Note>
					<Label>data/queries/FETCH_SEO_SETTINGS_QUERY.js</Label>
					<CodeBlock
						language='FETCH_SEO_SETTINGS_QUERY.js'
						code={seoSettingsQueryCode}
					/>
					<Label>Add seo&#123;&#125; to every page query</Label>
					<CodeBlock
						language='FETCH_ABOUT_QUERY.js (example)'
						code={pageSeoFragmentCode}
					/>
				</Step>

				{/* STEP 6 */}
				<Step number={6} title='fetchSeoSettings utility'>
					<Note>
						Dedicated fetch for <code>seoSettings</code> with a 1-hour cache.
						Used by the layout and by <code>buildPageMetadata</code> on every
						page. Next.js deduplicates it automatically — Sanity is hit once per
						cache window regardless of how many pages call it.
					</Note>
					<Label>utils/cms/fetchSeoSettings.js</Label>
					<CodeBlock
						language='utils/cms/fetchSeoSettings.js'
						code={fetchSeoSettingsCode}
					/>
				</Step>

				{/* STEP 7 */}
				<Step
					number={7}
					title='buildPageMetadata helper — write once, use everywhere'
				>
					<Note>
						This is the helper that makes every page a 4-liner. It handles the{' '}
						<code>Promise.all</code>, the fallback chain, the OG image, the{' '}
						<code>noIndex</code> check — everything. You write this file once
						and never touch it again.
					</Note>
					<Label>utils/seo/buildPageMetadata.js</Label>
					<CodeBlock
						language='utils/seo/buildPageMetadata.js'
						code={buildPageMetadataCode}
					/>
				</Step>

				{/* STEP 8 */}
				<Step number={8} title='Update layout.js — 4 surgical changes'>
					<Note>
						Your existing layout stays almost identical. Fonts, draft mode,
						analytics, nav, footer — all untouched. You are making 4 changes:
						swap one import, remove the static metadata export, add{' '}
						<code>generateMetadata()</code>, and drop{' '}
						<code>&lt;JsonLd&gt;</code> inside the body.
					</Note>
					<Label>app/layout.js — diff</Label>
					<CodeBlock language='app/layout.js (diff)' code={layoutDiffCode} />
				</Step>

				{/* STEP 9 */}
				<Step number={9} title='generateMetadata on every page — 4 lines'>
					<Note>
						Every page is now this. Import the helper, import the query, call it
						with the slug. That&apos;s the entire SEO setup per page. Fallbacks,
						OG image, robots — all handled inside the helper.
					</Note>
					<Label>Any interior page</Label>
					<CodeBlock language='app/about/page.js' code={pageUsageCode} />
					<Label>Homepage</Label>
					<CodeBlock language='app/page.js' code={pageUsageHomepageCode} />
				</Step>

				{/* STEP 10 */}
				<Step number={10} title='buildOrganizationSchema + JsonLd'>
					<Note>
						Builds JSON-LD from live Sanity data. One function handles every
						schema type — no per-client files. Rendered in layout so Google sees
						it on every page.
					</Note>
					<Label>lib/seo/buildOrganizationSchema.js</Label>
					<CodeBlock
						language='lib/seo/buildOrganizationSchema.js'
						code={buildOrganizationSchemaCode}
					/>
					<Label>components/seo/JsonLd.js</Label>
					<CodeBlock language='components/seo/JsonLd.js' code={jsonLdCode} />
				</Step>

				{/* STEP 11 */}
				<Step number={11} title='FAQ + Breadcrumb schema helpers (situational)'>
					<Note>
						Use <code>buildFaqSchema</code> on any page with a FAQ section —
						Google can show Q&amp;A rich snippets in search results. Use{' '}
						<code>buildBreadcrumbSchema</code> on pages with nested URLs.
					</Note>
					<Label>lib/seo/buildFaqSchema.js</Label>
					<CodeBlock
						language='lib/seo/buildFaqSchema.js'
						code={faqSchemaCode}
					/>
					<Label>lib/seo/buildBreadcrumbSchema.js</Label>
					<CodeBlock
						language='lib/seo/buildBreadcrumbSchema.js'
						code={breadcrumbSchemaCode}
					/>
					<Label>Usage</Label>
					<CodeBlock language='app/services/page.js' code={faqUsageCode} />
				</Step>

				{/* STEP 12 */}
				<Step number={12} title='next-sitemap — update siteUrl before launch'>
					<Note>
						Already installed in the starter and runs automatically on build.
						The only thing you touch per project is <code>siteUrl</code>.{' '}
						<strong>Do not</strong> add a manual <code>robots.txt</code> to{' '}
						<code>/public</code> — next-sitemap writes it on build.
					</Note>
					<Label>next-sitemap.config.js</Label>
					<CodeBlock language='next-sitemap.config.js' code={nextSitemapCode} />
				</Step>

				{/* STEP 13 */}
				<Step number={13} title='Pre-launch checklist'>
					<CodeBlock language='checklist' code={checklistCode} />
				</Step>
			</div>
		</section>
	);
}
