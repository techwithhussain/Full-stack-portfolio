import { Helmet } from 'react-helmet-async'
import { SITE } from '@/data/constants'
import { truncateForSEO } from '@/utils/seo'

/**
 * SEOMeta — drop-in Helmet wrapper for every page.
 *
 * Usage:
 *   <SEOMeta
 *     title="Projects"
 *     description="Browse all projects..."
 *     keywords="web developer Kashmir, best web developer J&K"
 *     schema={blogPostSchema(post)}
 *   />
 */
export default function SEOMeta({
  title,
  titleAsIs = false, // use `title` verbatim as the <title> tag — skips the " | Tech With Hussain" suffix and length truncation, for pages that specify an exact, final meta title
  description,
  keywords,
  canonical,
  ogImage,
  ogType   = 'website',
  noIndex  = false,
  schema,
  breadcrumbs,
}) {
  const fullTitle = titleAsIs && title
    ? title
    : truncateForSEO(title ? `${title} | ${SITE.name}` : SITE.name, 60)
  const metaDesc  = truncateForSEO(description || SITE.tagline, 160)
  const ogImg     = ogImage || `${SITE.url}/og-default.png`
  const canonUrl  = canonical ? `${SITE.url}${canonical}` : undefined

  // Default keywords for all pages (location-based)
  const defaultKeywords = 'best web developer in J&K, web developer in Kashmir, best web developer in Jammu and Kashmir, web developer Srinagar, SEO expert Kashmir, freelance web developer Kashmir, website designer Srinagar, digital marketing J&K, Hussain Lone, Tech With Hussain'
  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Hussain Lone" />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      {canonUrl && <link rel="canonical" href={canonUrl} />}

      {/* Geo / Location meta — present on every page */}
      <meta name="geo.region" content="IN-JK" />
      <meta name="geo.placename" content="Srinagar, Jammu &amp; Kashmir, India" />
      <meta name="geo.position" content="34.0837;74.7973" />
      <meta name="ICBM" content="34.0837, 74.7973" />

      {/* Open Graph */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image"       content={ogImg} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url"         content={canonUrl || SITE.url} />
      <meta property="og:site_name"   content={SITE.name} />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@techwithhussain" />
      <meta name="twitter:creator"     content="@techwithhussain" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={ogImg} />

      {/* JSON-LD Schema */}
      {schema && Array.isArray(schema) ? (
        schema.map((s, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))
      ) : schema ? (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ) : null}

      {/* Breadcrumb Schema */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((b, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: b.name,
              item: `${SITE.url}${b.path}`,
            })),
          })}
        </script>
      )}
    </Helmet>
  )
}
