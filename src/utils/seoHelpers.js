/**
 * Advanced SEO utility functions for CoverGhar
 * Generates structured data (JSON-LD), meta tags, canonical URLs,
 * and rich snippet schemas for Google Search Console optimization.
 */

const SITE_URL = 'https://www.coverghar.in';
const BRAND_NAME = 'CoverGhar';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/dwmytphop/image/upload/v1766473299/ChatGPT_Image_Dec_23_2025_12_30_26_PM_oyeb3g.jpg';
const DEFAULT_LOGO = DEFAULT_IMAGE;

// ─── Organization Schema ────────────────────────────────────────────────────
/**
 * Generate Organization JSON-LD (appears in Knowledge Panel)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND_NAME,
    "alternateName": "CoverGhar - Custom Mobile Covers",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": DEFAULT_LOGO,
      "width": 600,
      "height": 600,
    },
    "description": "Premium custom mobile covers and personalized phone cases for all brands. Starting ₹199 with fast delivery across India.",
    "foundingDate": "2024",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"],
      },
    ],
    "sameAs": [
      "https://www.facebook.com/coverghar",
      "https://www.instagram.com/coverghar",
      "https://twitter.com/coverghar",
      "https://www.youtube.com/@coverghar",
      "https://www.pinterest.com/coverghar",
    ],
  };
}

// ─── WebSite Schema with SearchAction ───────────────────────────────────────
/**
 * Generate WebSite JSON-LD with sitelinks search box
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND_NAME,
    "alternateName": "CoverGhar - Custom Mobile Covers Online",
    "url": SITE_URL,
    "description": "Create custom mobile covers and personalized phone cases online. Starting ₹199.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    "inLanguage": "en-IN",
  };
}

// ─── LocalBusiness Schema ───────────────────────────────────────────────────
/**
 * Generate LocalBusiness JSON-LD for map/local SEO
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND_NAME,
    "image": DEFAULT_IMAGE,
    "@id": SITE_URL,
    "url": SITE_URL,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ranchi",
      "addressRegion": "Jharkhand",
      "postalCode": "825418",
      "addressCountry": "IN",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "21:00",
      },
    ],
  };
}

// ─── Product Schema ─────────────────────────────────────────────────────────
/**
 * Generate Product JSON-LD schema (enhanced with reviews, shipping, return policy)
 */
export function generateProductSchema(product) {
  if (!product) return null;

  const image = product.images?.[0]?.url || product.image || DEFAULT_IMAGE;
  const price = product.price || product.variants?.[0]?.price || "199";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name || product.title,
    "description": product.description || `Custom ${product.name || product.title} mobile cover from CoverGhar`,
    "image": Array.isArray(product.images) ? product.images.map(i => i.url || i) : [image],
    "sku": product.sku || product._id,
    "mpn": product._id,
    "brand": {
      "@type": "Brand",
      "name": product.brand || BRAND_NAME,
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/products/${product._id}`,
      "priceCurrency": "INR",
      "price": price,
      "priceValidUntil": "2027-12-31",
      "availability": product.inStock !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": BRAND_NAME,
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR",
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY",
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "DAY",
          },
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN",
        },
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IN",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 7,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn",
      },
    },
    ...(product.rating?.average && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.average || product.rating,
        "reviewCount": product.rating.count || product.reviewCount || 1,
        "bestRating": "5",
        "worstRating": "1",
      },
    }),
    ...(product.reviews?.length && {
      "review": product.reviews.slice(0, 5).map((r) => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.rating,
          "bestRating": "5",
        },
        "author": {
          "@type": "Person",
          "name": r.name || r.user?.name || "Customer",
        },
        "reviewBody": r.comment || r.text || "",
        "datePublished": r.createdAt,
      })),
    }),
  };
}

// ─── Collection/Category Schema ─────────────────────────────────────────────
/**
 * Generate CollectionPage + ItemList JSON-LD schema
 */
export function generateCollectionSchema(collection, images = []) {
  if (!collection) return null;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${collection.title} Mobile Covers - ${BRAND_NAME}`,
    "description": collection.description || `Shop ${collection.title} themed mobile covers at CoverGhar. Premium quality, fast delivery.`,
    "url": `${SITE_URL}/collection/${collection.handle}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": images.length,
      "itemListElement": images.slice(0, 50).map((img, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${SITE_URL}/collection/${collection.handle}`,
        "name": img.alt || img.title || `${collection.title} Design ${idx + 1}`,
        "image": img.url || img.secure_url || img.path || '',
      })),
    },
  };
}

// ─── ProductList Schema (for product listing pages) ─────────────────────────
/**
 * Generate ItemList JSON-LD for product listing / category pages
 */
export function generateProductListSchema(products = [], listName = 'Products', listUrl = '/products') {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "url": `${SITE_URL}${listUrl}`,
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 30).map((product, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${SITE_URL}/products/${product._id}`,
      "name": product.name || product.title,
      "image": product.images?.[0]?.url || product.image || DEFAULT_IMAGE,
    })),
  };
}

// ─── Breadcrumb Schema ──────────────────────────────────────────────────────
/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

// ─── Article / BlogPosting Schema ───────────────────────────────────────────
/**
 * Generate Article/BlogPosting JSON-LD schema (enhanced for Google Discover)
 */
export function generateArticleSchema(post) {
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.description,
    "image": {
      "@type": "ImageObject",
      "url": post.image || post.featuredImage || DEFAULT_IMAGE,
      "width": 1200,
      "height": 630,
    },
    "author": {
      "@type": "Organization",
      "name": BRAND_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_LOGO,
      },
    },
    "publisher": {
      "@type": "Organization",
      "name": BRAND_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_LOGO,
        "width": 600,
        "height": 600,
      },
    },
    "datePublished": post.createdAt || post.publishedAt,
    "dateModified": post.updatedAt || post.createdAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    "url": `${SITE_URL}/blog/${post.slug}`,
    "wordCount": post.content ? post.content.split(/\s+/).length : undefined,
    "inLanguage": "en-IN",
    "isAccessibleForFree": true,
    ...(post.tags?.length && {
      "keywords": post.tags.join(', '),
    }),
  };
}

// ─── FAQ Schema ─────────────────────────────────────────────────────────────
/**
 * Generate FAQ JSON-LD schema (rich snippet in SERPs)
 */
export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

// ─── HowTo Schema ───────────────────────────────────────────────────────────
/**
 * Generate HowTo JSON-LD schema (for customizer/tutorial pages)
 */
export function generateHowToSchema({
  name = 'How to Create a Custom Mobile Cover',
  description = 'Step-by-step guide to designing your own personalized mobile cover on CoverGhar',
  totalTime = 'PT5M',
  steps = [],
  image = DEFAULT_IMAGE,
} = {}) {
  const defaultSteps = steps.length ? steps : [
    { name: 'Choose Your Phone Model', text: 'Select your phone brand and model from our extensive collection (iPhone, Samsung, OnePlus, Realme, Vivo, Oppo, Xiaomi, etc.).' },
    { name: 'Select a Design or Upload Photo', text: 'Browse 1000+ pre-designed themes or upload your own photos to create a truly unique cover.' },
    { name: 'Customize Your Design', text: 'Adjust placement, add text, apply filters, and preview your design on a real phone mockup.' },
    { name: 'Place Your Order', text: 'Add to cart and checkout securely. Your custom cover starts at just ₹199.' },
    { name: 'Receive Your Cover', text: 'We ship within 24 hours from our Neemuch studio. Delivered within 5-7 business days across India.' },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "image": image,
    "step": defaultSteps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url }),
    })),
  };
}

// ─── VideoObject Schema ─────────────────────────────────────────────────────
/**
 * Generate VideoObject JSON-LD schema
 */
export function generateVideoSchema(video) {
  if (!video) return null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title || video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnail || DEFAULT_IMAGE,
    "uploadDate": video.uploadDate || video.createdAt,
    "duration": video.duration,
    "contentUrl": video.url,
    ...(video.embedUrl && { "embedUrl": video.embedUrl }),
    "publisher": {
      "@type": "Organization",
      "name": BRAND_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_LOGO,
      },
    },
  };
}

// ─── SiteNavigationElement Schema ───────────────────────────────────────────
/**
 * Generate SiteNavigationElement for enhanced sitelinks
 */
export function generateNavigationSchema() {
  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Themes', url: '/themes' },
    { name: 'Custom Cover Designer', url: '/customizer' },
    { name: 'Blog', url: '/blog' },
    { name: 'Track Order', url: '/track-order' },
    { name: 'Contact Us', url: '/contact' },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "hasPart": navItems.map((item) => ({
      "@type": "WebPage",
      "name": item.name,
      "url": `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── OfferCatalog Schema ────────────────────────────────────────────────────
/**
 * Generate OfferCatalog for category/brand pages
 */
export function generateOfferCatalogSchema(categoryName, offers = []) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": `${categoryName} Mobile Covers - ${BRAND_NAME}`,
    "url": `${SITE_URL}/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
    "itemListElement": offers.slice(0, 30).map((offer) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": offer.name || offer.title,
        "image": offer.image || DEFAULT_IMAGE,
        "url": `${SITE_URL}/products/${offer._id}`,
      },
      "price": offer.price || "199",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
    })),
  };
}

// ─── Utility Functions ──────────────────────────────────────────────────────

/**
 * Generate SEO-friendly title with brand suffix
 * @param {string} title - Page title
 * @param {boolean} includeBrand - Whether to append brand name
 * @returns {string}
 */
export function seoTitle(title, includeBrand = true) {
  if (!title) return `Custom Mobile Covers Online | ${BRAND_NAME}`;
  const maxLen = includeBrand ? 50 : 60;
  const truncated = title.length > maxLen ? title.substring(0, maxLen) + '...' : title;
  return includeBrand ? `${truncated} | ${BRAND_NAME}` : truncated;
}

/**
 * Generate SEO-friendly meta description (max 155 chars for SERP)
 */
export function seoDescription(text, maxLen = 155) {
  if (!text) return `Custom mobile covers & phone cases from CoverGhar. Starting ₹199. Fast delivery across India.`;
  const clean = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return clean.length > maxLen ? clean.substring(0, maxLen - 3) + '...' : clean;
}

/**
 * Sanitize and format keyword string
 */
export function formatKeywords(keywords = []) {
  return keywords
    .filter(Boolean)
    .map((k) => k.toLowerCase().trim())
    .filter((k, i, arr) => arr.indexOf(k) === i) // unique
    .join(', ');
}

/**
 * Generate a URL-safe slug from a string
 */
export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

/**
 * Generate page-specific keywords combining base + dynamic terms
 */
export function generatePageKeywords(pageType, dynamicTerms = []) {
  const baseKeywords = {
    home: ['custom mobile covers', 'personalized phone cases', 'mobile cover online India', 'coverghar', 'photo phone cases', 'design phone case', 'mobile cover under 200', 'phone case COD India', 'shockproof mobile cover', 'naam wala cover'],
    products: ['buy mobile covers online', 'phone cases India', 'mobile back cover', 'phone cover designs', 'premium mobile cases', 'printed mobile cover online', 'custom phone case India', 'mobile cover free delivery'],
    themes: ['mobile cover designs', 'themed phone cases', 'designer mobile covers', 'pre-designed phone cases', 'trendy mobile covers', 'anime phone cases India', 'couple phone covers'],
    customizer: ['design your own phone case', 'photo mobile cover maker', 'custom phone case creator', 'upload photo phone case', 'personalized cover design', 'apna photo wala cover', 'naam print mobile cover'],
    blog: ['mobile cover tips', 'phone case guide', 'mobile accessories blog', 'custom cover ideas', 'phone protection tips', 'mobile cover kaise choose kare'],
    collection: ['mobile cover collection', 'themed phone covers', 'curated mobile cases', 'designer phone cases'],
    category: ['mobile covers by brand', 'phone cases by model', 'brand mobile covers', 'model specific cases', 'shockproof phone cover India'],
    contact: ['coverghar contact', 'mobile cover customer support', 'phone case help', 'coverghar support', 'coverghar whatsapp number'],
  };

  const base = baseKeywords[pageType] || baseKeywords.home;
  return formatKeywords([...base, ...dynamicTerms]);
}

/**
 * Get the full set of home page schemas (Organization + WebSite + LocalBusiness + Navigation)
 */
export function getHomePageSchemas() {
  return [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateLocalBusinessSchema(),
    generateNavigationSchema(),
  ];
}

export default {
  generateProductSchema,
  generateCollectionSchema,
  generateProductListSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateVideoSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateNavigationSchema,
  generateOfferCatalogSchema,
  getHomePageSchemas,
  seoTitle,
  seoDescription,
  formatKeywords,
  generateSlug,
  generatePageKeywords,
  SITE_URL,
  BRAND_NAME,
  DEFAULT_IMAGE,
  DEFAULT_LOGO,
};
