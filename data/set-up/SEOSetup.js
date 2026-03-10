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
				<span className='text-xs text-secondary font-secondary'>{language}</span>
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

const RefRow = ({ file, note }) => (
	<div className='flex gap-0.75 items-start py-0.25'>
		<code className='text-xs text-primary font-secondary shrink-0'>{file}</code>
		<span className='text-xs font-secondary text-dark opacity-50'>—</span>
		<span className='text-xs font-secondary text-dark opacity-60'>{note}</span>
	</div>
);

// ─── FILE MAP ─────────────────────────────────────────────────────────────────
const fileStructure = `SANITY STUDIO  (you set this up per project)
  schemaTypes/
    seoSettings.js              ← singleton: site-wide SEO + schema.org data
    homePage.js                 ← starter page schema
    aboutPage.js                ← starter page schema
    servicesPage.js             ← starter page schema
    contactPage.js              ← starter page schema
    partials/
      seoField.js               ← reusable SEO object, spread into any page schema
    index.js                    ← register all schemas
  structure.js                  ← sidebar structure + singleton actions

NEXT.JS  (already in starter template — do not recreate)
  utils/cms/fetchSeoSettings.js
  utils/seo/buildPageMetadata.js
  lib/seo/buildOrganizationSchema.js
  lib/seo/buildFaqSchema.js
  lib/seo/buildBreadcrumbSchema.js
  components/seo/JsonLd.js
  app/layout.js                 ← generateMetadata() already wired`;

// ─── STEP 1 — seoSettings ─────────────────────────────────────────────────────
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
          { title: 'Organization',                   value: 'Organization' },
          { title: 'LocalBusiness',                  value: 'LocalBusiness' },
          { title: 'Restaurant',                     value: 'Restaurant' },
          { title: 'HomeAndConstructionBusiness',    value: 'HomeAndConstructionBusiness' },
          { title: 'CleaningService',                value: 'CleaningService' },
          { title: 'Photographer',                   value: 'Photographer' },
          { title: 'InsuranceAgency',                value: 'InsuranceAgency' },
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

// ─── STEP 2 — seoField + page schemas ────────────────────────────────────────
const seoFieldCode = `// schemaTypes/partials/seoField.js

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

const pageSchemaCode = `// schemaTypes/homePage.js
import { seoField } from './partials/seoField'
export default {
  name: 'homePage', type: 'document', title: 'Home Page',
  fields: [
    { name: 'title', type: 'string', title: 'Title', initialValue: 'Home Page' },
    ...seoField,
  ],
  preview: { select: { title: 'title' } },
}

// ─────────────────────────────────────────────────────────────────────────────

// schemaTypes/aboutPage.js
import { seoField } from './partials/seoField'
export default {
  name: 'aboutPage', type: 'document', title: 'About Page',
  fields: [
    { name: 'title', type: 'string', title: 'Title', initialValue: 'About Page' },
    ...seoField,
  ],
  preview: { select: { title: 'title' } },
}

// ─────────────────────────────────────────────────────────────────────────────

// schemaTypes/servicesPage.js
import { seoField } from './partials/seoField'
export default {
  name: 'servicesPage', type: 'document', title: 'Services Page',
  fields: [
    { name: 'title', type: 'string', title: 'Title', initialValue: 'Services Page' },
    ...seoField,
  ],
  preview: { select: { title: 'title' } },
}

// ─────────────────────────────────────────────────────────────────────────────

// schemaTypes/contactPage.js
import { seoField } from './partials/seoField'
export default {
  name: 'contactPage', type: 'document', title: 'Contact Page',
  fields: [
    { name: 'title', type: 'string', title: 'Title', initialValue: 'Contact Page' },
    ...seoField,
  ],
  preview: { select: { title: 'title' } },
}`;

// ─── STEP 3 — index.js ───────────────────────────────────────────────────────
const schemaIndexCode = `// schemaTypes/index.js

import navigation   from './navigation'
import homePage     from './homePage'
import aboutPage    from './aboutPage'
import servicesPage from './servicesPage'
import contactPage  from './contactPage'
import seoSettings  from './seoSettings'
import contactForm  from './contactForm'

export const schemaTypes = [
  navigation,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  seoSettings,
  contactForm,
]`;

// ─── STEP 4 — structure.js ────────────────────────────────────────────────────
const structureCode = `// sanity-studio/structure.js

import {
  HomeIcon,
  InfoOutlineIcon,
  CogIcon,
  EnvelopeIcon,
  EarthGlobeIcon,
  ThListIcon,
} from '@sanity/icons'

const singletonTypes = [
  'homePage',
  'aboutPage',
  'servicesPage',
  'contactPage',
  'seoSettings',
  'navigation',
]

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('About Page')
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

      S.listItem()
        .title('Services Page')
        .icon(ThListIcon)
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),

      S.listItem()
        .title('Contact Page')
        .icon(EnvelopeIcon)
        .child(S.document().schemaType('contactPage').documentId('contactPage')),

      S.listItem()
        .title('Navigation')
        .icon(EarthGlobeIcon)
        .child(S.document().schemaType('navigation').documentId('navigation')),

      S.divider(),

      S.listItem()
        .title('Form Submissions')
        .icon(EnvelopeIcon)
        .child(
          S.documentTypeList('contactForm')
            .title('Form Submissions')
            .defaultOrdering([{ field: 'sentAt', direction: 'desc' }]),
        ),

      S.divider(),

      // Hidden from client — uncomment to expose for SEO plan clients
      // S.listItem()
      //   .title('SEO Settings')
      //   .icon(CogIcon)
      //   .child(S.document().schemaType('seoSettings').documentId('seoSettings')),
    ])

export const singletonActions = (input, context) => {
  if (singletonTypes.includes(context.schemaType)) {
    return input.filter(
      ({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action),
    )
  }
  return input
}

export const singletonNewDocument = (prev) =>
  prev.filter((item) => !singletonTypes.includes(item.templateId))`;

// ─── STEP 5 — GROQ queries ────────────────────────────────────────────────────
const seoSettingsQueryCode = `// data/queries/FETCH_SEO_SETTINGS_QUERY.js

export const FETCH_SEO_SETTINGS_QUERY = \`*[_type == "seoSettings" && _id == "seoSettings"][0]{
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

const pageQueriesCode = `// data/queries/pages/FETCH_HOMEPAGE_QUERY.js
export const FETCH_HOMEPAGE_QUERY = \`*[_type == "homePage" && _id == "homePage"][0]{
  title,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, noIndex }
}\`

// data/queries/pages/FETCH_ABOUTPAGE_QUERY.js
export const FETCH_ABOUTPAGE_QUERY = \`*[_type == "aboutPage" && _id == "aboutPage"][0]{
  title,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, noIndex }
}\`

// data/queries/pages/FETCH_SERVICESPAGE_QUERY.js
export const FETCH_SERVICESPAGE_QUERY = \`*[_type == "servicesPage" && _id == "servicesPage"][0]{
  title,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, noIndex }
}\`

// data/queries/pages/FETCH_CONTACTPAGE_QUERY.js
export const FETCH_CONTACTPAGE_QUERY = \`*[_type == "contactPage" && _id == "contactPage"][0]{
  title,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, noIndex }
}\`

// ⚠️  Always use _type == "x" && _id == "x" for singleton queries.
// Prevents leftover random-ID documents from being returned instead of the singleton.
// As you build out each page, add content fields above the seo{} block.`;

// ─── STEP 6 — per-page usage ──────────────────────────────────────────────────
const pageUsageCode = `// Every page.js — same 4 lines every time, swap query + slug

import { buildPageMetadata } from '@/utils/seo/buildPageMetadata'
import { FETCH_ABOUTPAGE_QUERY } from '@/data/queries/pages/FETCH_ABOUTPAGE_QUERY'

export async function generateMetadata() {
  return await buildPageMetadata({ slug: '/about', query: FETCH_ABOUTPAGE_QUERY })
}

// ⚠️  Make sure seoSettings document is PUBLISHED in Sanity Studio or
//     buildPageMetadata returns {} (empty metadata) until it exists.`;

// ─── STEP 7 — checklist ───────────────────────────────────────────────────────
const checklistCode = `SANITY STUDIO
✅  seoSettings document created and PUBLISHED
✅  siteName, siteUrl, defaultTitle, defaultDescription filled in
✅  titleTemplate set — e.g. "%s | Business Name"
✅  OG image uploaded (1200x630px)
✅  schemaType selected (LocalBusiness for most clients)
✅  phone, email, address, serviceAreas filled in
✅  All page documents created and PUBLISHED in Studio
✅  seoSettings commented out of structure.js sidebar

NEXT.JS  (already in starter — just confirm)
✅  FETCH_SEO_SETTINGS_QUERY exists in data/queries/
✅  Page queries exist with seo{} block in data/queries/pages/
✅  generateMetadata() on every page with await + correct slug
✅  next-sitemap.config.js siteUrl updated to production domain

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
					Sanity-first. No metadata files. Fill it out while you build.
					Next.js side is already in the starter template.
				</p>
			</div>

			{/* File map */}
			<div className='mb-2'>
				<Label>File overview</Label>
				<CodeBlock language='file structure' code={fileStructure} />
			</div>

			{/* Next.js reference — no code, just what each file does */}
			<div className='mb-2 p-1 rounded-sm border border-accent bg-accent/30'>
				<p className='text-xs font-secondary font-semibold text-dark mb-0.75'>
					Next.js files — already in starter template
				</p>
				<RefRow
					file='utils/cms/fetchSeoSettings.js'
					note='Fetches seoSettings from Sanity with 1hr cache. Used by layout + buildPageMetadata.'
				/>
				<RefRow
					file='utils/seo/buildPageMetadata.js'
					note='Called on every page. Handles Promise.all, fallback chain, OG image, noIndex. Returns {} if seoSettings not published yet.'
				/>
				<RefRow
					file='lib/seo/buildOrganizationSchema.js'
					note='Builds JSON-LD from seoSettings data. Returns null if seoSettings not published yet.'
				/>
				<RefRow
					file='lib/seo/buildFaqSchema.js'
					note='Pass an array of {question, answer} objects. Use on pages with FAQ sections.'
				/>
				<RefRow
					file='lib/seo/buildBreadcrumbSchema.js'
					note='Pass an array of {name, url} objects. Use on pages with nested URLs.'
				/>
				<RefRow
					file='components/seo/JsonLd.js'
					note='Renders a <script type="application/ld+json"> tag. Used in layout.js and on pages with FAQ/breadcrumb schema.'
				/>
				<RefRow
					file='app/layout.js'
					note='generateMetadata() pulls from fetchSeoSettings. JsonLd renders buildOrganizationSchema in <body>. Both guarded with if (!seo) checks.'
				/>
			</div>

			<div className='space-y-0.5'>

				{/* STEP 1 */}
				<Step number={1} title='seoSettings schema — Sanity'>
					<Note>
						One singleton per project. Holds everything — site identity, default
						meta, OG image, schema.org data. Fill it out in Sanity while
						you&apos;re building. The Next.js side reads from this automatically.
					</Note>
					<Label>schemaTypes/seoSettings.js</Label>
					<CodeBlock language='schemaTypes/seoSettings.js' code={seoSettingsCode} />
				</Step>

				{/* STEP 2 */}
				<Step number={2} title='seoField partial + starter page schemas'>
					<Note>
						<code>seoField</code> is written once and spread into every page
						schema. All fields are optional and collapsible — blank fields fall
						back to <code>seoSettings</code> defaults automatically. Add real
						content fields above <code>...seoField</code> as you build out each
						page.
					</Note>
					<Label>schemaTypes/partials/seoField.js</Label>
					<CodeBlock language='schemaTypes/partials/seoField.js' code={seoFieldCode} />
					<Label>schemaTypes/ — all 4 starter page schemas</Label>
					<CodeBlock language='homePage · aboutPage · servicesPage · contactPage' code={pageSchemaCode} />
				</Step>

				{/* STEP 3 */}
				<Step number={3} title='Register all schemas — schemaTypes/index.js'>
					<Note>
						Keep this order consistent across projects.
					</Note>
					<Label>schemaTypes/index.js</Label>
					<CodeBlock language='schemaTypes/index.js' code={schemaIndexCode} />
				</Step>

				{/* STEP 4 */}
				<Step number={4} title='structure.js — singletons + seoSettings hidden'>
					<Note>
						All pages and navigation are singletons. <code>seoSettings</code> is
						in <code>singletonTypes</code> so delete/duplicate/unpublish are
						blocked — but it&apos;s commented out of the sidebar so clients
						can&apos;t see it. To expose it for a client on an SEO plan:
						uncomment the 4 lines at the bottom. That&apos;s the only change.
					</Note>
					<Label>sanity-studio/structure.js</Label>
					<CodeBlock language='structure.js' code={structureCode} />
				</Step>

				{/* STEP 5 */}
				<Step number={5} title='GROQ queries'>
					<Note>
						<code>FETCH_SEO_SETTINGS_QUERY</code> is used by{' '}
						<code>fetchSeoSettings.js</code> in the starter — don&apos;t
						rename it. The 4 page queries are your starters. Add content fields
						above <code>seo&#123;&#125;</code> as each page grows.
					</Note>
					<Label>data/queries/FETCH_SEO_SETTINGS_QUERY.js</Label>
					<CodeBlock language='FETCH_SEO_SETTINGS_QUERY.js' code={seoSettingsQueryCode} />
					<Label>data/queries/pages/ — all 4 starter page queries</Label>
					<CodeBlock language='page queries' code={pageQueriesCode} />
				</Step>

				{/* STEP 6 */}
				<Step number={6} title='Per-page generateMetadata — 4 lines per page'>
					<Note>
						Import <code>buildPageMetadata</code> and the page query. Call it
						with <code>await</code> and the canonical slug. That&apos;s it —
						everything else is handled in the starter.
					</Note>
					<Label>Any page.js</Label>
					<CodeBlock language='app/about/page.js' code={pageUsageCode} />
				</Step>

				{/* STEP 7 */}
				<Step number={7} title='Pre-launch checklist'>
					<CodeBlock language='checklist' code={checklistCode} />
				</Step>

			</div>
		</section>
	);
}