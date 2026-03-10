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

// ─── Step 1 ───────────────────────────────────────────────────────────────────
// (no code block — just a terminal command)

// ─── Sanity Theme URL (copy this for each new project) ───────────────────────
const sanityThemeUrl = `https://themer.sanity.build/api/hues?default=6b7280;lightest:f9fafb;darkest:111827&primary=18a1ad;lightest:f0feff;darkest:0d4f56&transparent=f2fcfe;100;darkest:e6f7fb&positive=779e43;lightest:f7f9f2;darkest:3d4f22&caution=f59e0b;lightest:fef3c7;darkest:92400e&critical=ef4444;lightest:fef2f2;darkest:991b1b`;

// ─── Step 2 — sanity.config.js (updated / full version) ──────────────────────
const sanityConfigCode = `/* eslint-disable no-undef */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
// TODO: add once structure.js is set up
// import {structure, singletonActions, singletonNewDocument} from './structure'
import CustomLayout from './components/CustomLayout.jsx'
import clientLogo from './components/clientLogo.jsx'
import {theme} from 'https://themer.sanity.build/api/hues?default=6b7280;lightest:f9fafb;darkest:111827&primary=18a1ad;lightest:f0feff;darkest:0d4f56&transparent=f2fcfe;100;darkest:e6f7fb&positive=779e43;lightest:f7f9f2;darkest:3d4f22&caution=f59e0b;lightest:fef3c7;darkest:92400e&critical=ef4444;lightest:fef2f2;darkest:991b1b'

export default defineConfig({
  name: 'default',
  title: 'Client Name CMS',
  subtitle: 'Powered by Latz Web Design',
  icon: clientLogo,
  projectId: 'your_project_id',
  dataset: 'production',
  theme: theme,
  releases: {
    enabled: false,
  },
  plugins: [
    structureTool({
      title: 'Edit Content',
      // TODO: uncomment once structure.js is set up
      // structure,
    }),
    presentationTool({
      title: 'Live Preview',
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  // TODO: uncomment once structure.js is set up
  // document: {
  //   actions: singletonActions,
  //   newDocumentOptions: singletonNewDocument,
  // },
  studio: {
    components: {
      layout: (props) => <CustomLayout {...props} cmsGuideUrl='/static/cms-guide.pdf' />,
    },
  },
})`;


// ─── Step 3 — Custom Studio branding ─────────────────────────────────────────
const clientLogoCode = `import React from 'react'

const clientLogo = () => (
  <img
    src="/static/client-logo.png"
    alt="Client Logo"
    style={{ width: '25px', height: '25px', objectFit: 'contain' }}
  />
)

export default clientLogo`;

const customLayoutCode = `/* eslint-env browser */

import {forwardRef, useState} from 'react'

const CustomLayout = forwardRef(({cmsGuideUrl = '/static/cms-guide.pdf', ...props}, ref) => {
  const [showPopup, setShowPopup] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleBrandClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPopup(!showPopup)
  }

  const handleEmailCopy = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await navigator.clipboard.writeText('jordan@latzwebdesign.com')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowPopup(false)
      }, 2000)
    } catch (err) {
      console.log('Email: jordan@latzwebdesign.com')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setShowPopup(false)
      }, 2000)
    }
  }

  return (
    <div ref={ref} style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <div style={{flex: 1, minHeight: 0, overflow: 'auto'}}>{props.renderDefault(props)}</div>

      <footer
        style={{
          flexShrink: 0,
          padding: '10px 20px',
          background: '#111827',
          borderTop: '1px solid #18a1ad',
          textAlign: 'center',
          fontSize: '12px',
          position: 'relative',
          zIndex: 1000,
          fontFamily:
            '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <span style={{color: '#f9fafb'}}>
          Powered by{' '}
          <strong
            style={{
              color: '#18a1ad',
              cursor: 'pointer',
              textDecoration: 'underline',
              userSelect: 'none',
            }}
            onClick={handleBrandClick}
          >
            Latz Web Design
          </strong>{' '}
          <span
            style={{
              color: '#f2fcfe',
              cursor: 'pointer',
              fontSize: '14px',
              userSelect: 'none',
            }}
            onClick={handleBrandClick}
          >
            &#9432;
          </span>
        </span>

        {showPopup && (
          <div
            style={{
              position: 'fixed',
              bottom: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#f9fafb',
              border: '2px solid #18a1ad',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              zIndex: 10000,
              minWidth: '280px',
              fontFamily:
                '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
            }}
          >
            <div
              style={{
                color: '#111827',
                marginBottom: '14px',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Need Help?
            </div>

            <button
              style={{
                color: copied ? '#f9fafb' : '#111827',
                cursor: 'pointer',
                padding: '10px 12px',
                background: copied ? '#18a1ad' : '#f2fcfe',
                borderRadius: '4px',
                border: '1px solid #18a1ad',
                width: '100%',
                fontSize: '12px',
                fontWeight: copied ? 'bold' : 'normal',
                fontFamily: 'inherit',
              }}
              onClick={handleEmailCopy}
            >
              {copied ? '✓ Copied to Clipboard!' : '📧  jordan@latzwebdesign.com'}
            </button>

            <a
              href={cmsGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                color: '#f9fafb',
                padding: '10px 12px',
                background: '#111827',
                borderRadius: '4px',
                border: '1px solid #18a1ad',
                width: '100%',
                fontSize: '12px',
                fontFamily: 'inherit',
                textAlign: 'center',
                textDecoration: 'none',
                marginTop: '8px',
                boxSizing: 'border-box',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              📖 How to Edit Your Website
            </a>

            <a
              href="https://latzwebdesign.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                color: '#6b7280',
                fontSize: '11px',
                textAlign: 'center',
                marginTop: '12px',
                textDecoration: 'none',
                fontFamily: 'inherit',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              latzwebdesign.com
            </a>
          </div>
        )}

        {showPopup && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
            }}
            onClick={() => setShowPopup(false)}
          />
        )}
      </footer>
    </div>
  )
})

CustomLayout.displayName = 'CustomLayout'

export default CustomLayout
`;

// ─── Step 4 — Contact form schema ────────────────────────────────────────────
const contactFormCode = `export default {
  name: 'contactForm',
  type: 'document',
  title: 'Contact Form',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'phoneNumber', type: 'string', title: 'Phone Number' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'sentAt', type: 'datetime', title: 'Sent At' },
  ],
}`;

// ─── Step 5 — Homepage schema ─────────────────────────────────────────────────
const homePageSchemaCode = `export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
      initialValue: 'Welcome to Our Website',
    },
    {
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
      initialValue: 'We build custom websites that convert leads into customers.',
    },
    {
      name: 'body',
      type: 'text',
      title: 'Body',
      initialValue:
        'This is a placeholder to test your Sanity connection ' +
        'and visual editing preview are working. ' +
        'Replace with real content once confirmed working.',
    },
  ],
}`;

// ─── Step 6 — Navigation schema ──────────────────────────────────────────────
const navigationSchemaCode = `export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  preview: {
    prepare() {
      return { title: 'Navigation' }
    },
  },
  fields: [
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true },
    },
    {
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
            },
            {
              name: 'url',
              type: 'string',
              title: 'URL',
              description: 'e.g. /about or https://example.com',
            },
            {
              name: 'isButton',
              type: 'boolean',
              title: 'Show as Button',
              description: 'Check to display this link as a CTA button',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
              isButton: 'isButton',
            },
            prepare({ title, subtitle, isButton }) {
              return {
                title: isButton ? title + ' [BUTTON]' : title,
                subtitle,
              }
            },
          },
        },
      ],
    },
  ],
}`;

const schemaIndexCode = `import contactForm from './contactForm'
import homePage from './homePage'
import navigation from './navigation'
import seoSettings from './seoSettings'

export const schemaTypes = [contactForm, homePage, navigation, seoSettings]`;

// ─── SEO Settings schema ──────────────────────────────────────────────────────
const seoSettingsSchemaCode = `export default {
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
}\`;

// ─── Step 7 — .env.local ──────────────────────────────────────────────────────
const envCode = `# Sanity (server-side)
SANITY_PROJECT_ID=your_project_id

# Sanity (public)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
# prod: https://your-project-name.sanity.studio

# Sanity tokens
SANITY_API_TOKEN=        # Editor permissions — for form submissions
SANITY_VIEWER_TOKEN=     # Viewer permissions — for draft mode/visual editing


# Email
EMAIL_PASS=
EMAIL_USER=
CLIENT_EMAIL=`;

const studioEnvCode = `# Sanity Studio project .env (separate from Next.js)
SANITY_STUDIO_PREVIEW_ORIGIN=https://your-production-domain.com`;

// ─── Draft mode route ────────────────────────────────────────────────────────
const draftModeRouteCode = `import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { sanityClient } from '@/utils/cms/sanityConnection'

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
})`;

// ─── Step 10 — Draft mode test URL ───────────────────────────────────────────
const draftModeTestUrl = `http://localhost:3000/api/draft-mode/enable`;

export default function SanitySetup() {
	return (
		<section className='max-w-7xl mx-auto mt-3 mb-2 px-1'>
			<div className='mb-2 pb-1 border-b border-accent'>
				<h2 className='font-default text-xl font-bold text-dark mb-0.25'>
					Sanity CMS Setup
				</h2>
				<p className='text-xs font-secondary text-dark opacity-60'>
					Follow these steps when connecting a new project to Sanity.
				</p>
			</div>

			<div className='space-y-0.5'>
				{/* STEP 1 */}
				<Step number={1} title='Create a new Sanity project'>
					<Note>
						Run this in a <strong>separate folder</strong> from your Next.js
						project.
					</Note>
					<CodeBlock language='terminal' code='npm create sanity@latest' />
					<Note>
						Follow the prompts. Choose <code>production</code> as your dataset.
						Note your <strong>Project ID</strong> — you will need it for env vars.
					</Note>
				</Step>

				{/* STEP 2 */}
				<Step number={2} title='Update sanity.config.js (full version)'>
					<Note>
						Replace the default <code>sanity.config.js</code> with this full
						version. It wires in custom branding, the theme, the Presentation
						tool with env-driven preview origin, and the custom layout. Fill in{' '}
						<code>your_project_id</code> and update the title/theme URL before
						continuing.
					</Note>
					<Label>Theme URL (copy and swap into import)</Label>
					<CodeBlock language='sanity themer url' code={sanityThemeUrl} />
					<CodeBlock language='sanity.config.js' code={sanityConfigCode} />
					<Note>
						Customize your theme at{' '}
						<strong>sanity.build/themer</strong>, then replace the URL above
						with the new hues before committing.
					</Note>
				</Step>

				{/* STEP 3 */}
				<Step number={3} title='Add custom Studio branding'>
					<Note>
						Create a <code>components/</code> folder inside your Sanity Studio
						project and add these two files.
					</Note>
					<Label>components/clientLogo.jsx</Label>
					<CodeBlock language='components/clientLogo.jsx' code={clientLogoCode} />
					<Note>
						Drop the client&apos;s logo at <code>public/static/client-logo.png</code> in
						the Studio project. 25 × 25 px works well; use a square or icon
						version of their mark. File must be <code>.jsx</code> — JSX won&apos;t
						parse in a plain <code>.js</code> file.
					</Note>
					<Label>components/CustomLayout.jsx</Label>
					<CodeBlock language='components/CustomLayout.jsx' code={customLayoutCode} />
					<Note>
						This adds the &ldquo;Powered by Latz Web Design&rdquo; footer with a
						click-to-copy email popup. Paste in the full component code from your
						template.
					</Note>
				</Step>

				{/* STEP 4 */}
				<Step number={4} title='Add the contact form schema'>
					<Note>
						Create <code>schemaTypes/contactForm.js</code> in your Studio
						project.
					</Note>
					<Label>schemaTypes/contactForm.js</Label>
					<CodeBlock
						language='schemaTypes/contactForm.js'
						code={contactFormCode}
					/>
				</Step>

				{/* STEP 5 */}
				<Step number={5} title='Add the homepage schema'>
					<Note>
						Create <code>schemaTypes/homePage.js</code>. The Home Page does not
						get its own SEO fields — it uses the global SEO Settings document
						for everything. The <code>seoNote</code> field communicates this
						directly to the client inside Studio.
					</Note>
					<Label>schemaTypes/homePage.js</Label>
					<CodeBlock
						language='schemaTypes/homePage.js'
						code={homePageSchemaCode}
					/>
				</Step>

				{/* STEP 6 */}
				<Step number={6} title='Add the navigation schema'>
					<Note>
						Create <code>schemaTypes/navigation.js</code>. Each link has a
						label, URL, and an <code>isButton</code> toggle — check it on
						whichever link should render as the CTA button.
					</Note>
					<Label>schemaTypes/navigation.js</Label>
					<CodeBlock
						language='schemaTypes/navigation.js'
						code={navigationSchemaCode}
					/>
					<Note>
						In Studio, create a Navigation document, add your links, and check{' '}
						<strong>Show as Button</strong> on the CTA link.
					</Note>
				</Step>

				{/* STEP 7 */}
				<Step number={7} title='Add the SEO Settings schema'>
					<Note>
						Create <code>schemaTypes/seoSettings.js</code>. This is the global
						SEO document — site name, default title, description, OG image,
						Schema.org type, contact info, and service areas. The Home Page
						uses this directly. All other pages build on top of it.
					</Note>
					<Label>schemaTypes/seoSettings.js</Label>
					<CodeBlock
						language='schemaTypes/seoSettings.js'
						code={seoSettingsSchemaCode}
					/>
					<Note>
						Register all four schemas in <code>schemaTypes/index.js</code>:
					</Note>
					<Label>schemaTypes/index.js</Label>
					<CodeBlock
						language='schemaTypes/index.js'
						code={schemaIndexCode}
					/>
					<Note>
						In Studio, create an SEO Settings document and fill in the site
						name, URL, default title, and description before launch.
					</Note>
				</Step>

				{/* STEP 8 */}
				<Step number={8} title='Fill out .env.local (Next.js project)'>
					<Note>
						Copy <code>.env.template</code> to <code>.env.local</code> and fill
						in all values. Generate tokens at <strong>sanity.io/manage</strong>{' '}
						→ your project → API → Tokens.
					</Note>
					<CodeBlock language='.env.local' code={envCode} />
				</Step>

				{/* STEP 9 */}
				<Step number={9} title='Fill out .env (Sanity Studio project)'>
					<Note>
						The Studio project needs its own env file for the preview origin.
						This lets Vercel-deployed Studio point at the live domain without
						hardcoding it.
					</Note>
					<CodeBlock language='sanity-studio/.env' code={studioEnvCode} />
					<Note>
						For local dev, <code>SANITY_STUDIO_PREVIEW_ORIGIN</code> falls back
						to <code>http://localhost:3000</code> automatically via the config
						fallback — you only need this set in production.
					</Note>
				</Step>

				{/* STEP 10 */}
				<Step number={10} title='Start both dev servers'>
					<Label>Terminal 1 — Next.js</Label>
					<CodeBlock language='terminal' code='npm run dev' />
					<Label>Terminal 2 — Sanity Studio</Label>
					<CodeBlock language='terminal' code='npm run dev' />
					<Note>
						Next.js runs on <code>localhost:3000</code> — Studio on{' '}
						<code>localhost:3333</code>. Open the Studio, click{' '}
						<strong>Presentation</strong> (now labeled{' '}
						<strong>Live Preview</strong>), and your site should load with
						clickable overlays.
					</Note>
				</Step>

				{/* STEP 11 */}
				<Step number={11} title='Test draft mode'>
					<Note>
						The draft mode route is already in the starter at{' '}
						<code>app/api/draft-mode/enable/route.js</code>. Just make sure{' '}
						<code>SANITY_VIEWER_TOKEN</code> is set in <code>.env.local</code>, then
						hit this URL to confirm it&apos;s working:
					</Note>
					<CodeBlock language='browser' code={draftModeTestUrl} />
					<Note>
						You should be redirected to <code>/</code> with{' '}
						<code>?sanity-preview-perspective=drafts</code> in the URL.
					</Note>
				</Step>

				{/* STEP 12 */}
				<Step number={12} title='Configure Desk Structure'>
					<Note>
						Set up <code>structure.js</code> based on the pages and singletons
						this project needs. This is manual and changes per project — there is
						no universal template. Define singleton documents (Home Page,
						Navigation, etc.) so they open directly without a list view, and
						group the rest logically. Wire it into <code>sanity.config.js</code>{' '}
						via the <code>structureTool</code> config option.
					</Note>
				</Step>
			</div>
		</section>
	);
}