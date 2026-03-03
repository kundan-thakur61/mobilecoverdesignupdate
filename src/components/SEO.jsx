import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.coverghar.in';
const SITE_NAME = 'CoverGhar';

/**
 * Advanced SEO component with full meta tag, Open Graph, Twitter Card,
 * structured data, hreflang, canonical, and crawler hint support.
 */
const SEO = ({
  title = 'CoverGhar | Custom Mobile Covers - Design Your Own Phone Case',
  description = 'Design personalized mobile covers with premium materials. Fast shipping across India from CoverGhar.',
  keywords = 'custom mobile cover, personalized phone case, photo phone cover, design your own phone case, custom phone case India, mobile cover with photo, customized mobile back cover, printed mobile cover online, iPhone 15 back cover, Samsung Galaxy S24 cover, OnePlus 12 mobile cover, anime phone case India, couple phone cases, zodiac sign phone cover, mobile cover under 200, premium quality phone case',
  image = '/mobile-covers-banner.png',
  url = '',
  type = 'website',
  schema = null,
  // Advanced props
  noindex = false,
  nofollow = false,
  article = null,         // { publishedTime, modifiedTime, author, section, tags }
  product = null,         // { price, currency, availability, condition, brand, sku }
  breadcrumbs = null,     // Array of { name, url }
  alternateLanguages = null, // Array of { hreflang, href }
  prev = null,            // Pagination: previous page URL
  next = null,            // Pagination: next page URL
  additionalSchemas = [], // Array of extra JSON-LD objects
  preconnect = [],        // Array of origins to preconnect
  imageAlt = '',
  videoUrl = '',
  locale = 'en_IN',
  rating = null,          // { value, count }
}) => {
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image}`;
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-image-preview:large',
    'max-snippet:-1',
    'max-video-preview:-1',
  ].join(', ');

  // Collect all schemas
  const allSchemas = [];
  if (schema) {
    allSchemas.push(schema);
  }
  if (breadcrumbs?.length) {
    allSchemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "item": item.url ? `${SITE_URL}${item.url}` : undefined,
      })),
    });
  }
  if (additionalSchemas?.length) {
    allSchemas.push(...additionalSchemas);
  }

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {/* Canonical & Pagination */}
      <link rel="canonical" href={fullUrl} />
      {prev && <link rel="prev" href={`${SITE_URL}${prev}`} />}
      {next && <link rel="next" href={`${SITE_URL}${next}`} />}

      {/* Hreflang - alternate languages */}
      {alternateLanguages?.map(({ hreflang, href }) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
      <link rel="alternate" hrefLang="en-IN" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />

      {/* OG Article (for blog posts) */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}

      {/* OG Product (for product pages) */}
      {product?.price && <meta property="product:price:amount" content={product.price} />}
      {product?.currency && <meta property="product:price:currency" content={product.currency || 'INR'} />}
      {product?.availability && <meta property="product:availability" content={product.availability} />}
      {product?.condition && <meta property="product:condition" content={product.condition || 'new'} />}
      {product?.brand && <meta property="product:brand" content={product.brand} />}
      {product?.sku && <meta property="product:retailer_item_id" content={product.sku} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      <meta name="twitter:site" content="@coverghar" />
      <meta name="twitter:creator" content="@coverghar" />

      {/* Video if available */}
      {videoUrl && <meta property="og:video" content={videoUrl} />}
      {videoUrl && <meta property="og:video:type" content="video/mp4" />}

      {/* Preconnect hints */}
      {preconnect?.map((origin) => (
        <link key={origin} rel="preconnect" href={origin} crossOrigin="anonymous" />
      ))}

      {/* Structured Data (JSON-LD) - bundled into single script for efficiency */}
      {allSchemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  schema: PropTypes.object,
  noindex: PropTypes.bool,
  nofollow: PropTypes.bool,
  article: PropTypes.shape({
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
    author: PropTypes.string,
    section: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  product: PropTypes.shape({
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    availability: PropTypes.string,
    condition: PropTypes.string,
    brand: PropTypes.string,
    sku: PropTypes.string,
  }),
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  })),
  alternateLanguages: PropTypes.arrayOf(PropTypes.shape({
    hreflang: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
  prev: PropTypes.string,
  next: PropTypes.string,
  additionalSchemas: PropTypes.array,
  preconnect: PropTypes.arrayOf(PropTypes.string),
  imageAlt: PropTypes.string,
  videoUrl: PropTypes.string,
  locale: PropTypes.string,
  rating: PropTypes.shape({
    value: PropTypes.number,
    count: PropTypes.number,
  }),
};

export default SEO;
