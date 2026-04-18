import { useRef, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getHomePageSchemas, generateFAQSchema, generateHowToSchema } from '../utils/seoHelpers';
import './Home.css';

// Cloudinary AVIF URL builder for hero images (critical path - no external component)
const heroImgUrl = (publicId, w, q = 60) =>
  `https://res.cloudinary.com/dwmytphop/image/upload/f_avif,q_${q},w_${w},c_limit/${publicId}`;

const heroSrcSet = (publicId) =>
  [320, 480, 768].map(w => `${heroImgUrl(publicId, w)} ${w}w`).join(', ');

const PremiumCard = memo(({ image, title, subtitle, badge, priority = false }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const rafRef = useRef(null);

  // Mouse tracking with direct DOM manipulation (no re-renders) — desktop only
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || !overlayRef.current || window.innerWidth < 768) return;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !overlayRef.current) { rafRef.current = null; return; }
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      overlayRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.2), transparent 50%)`;
      rafRef.current = null;
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer"
    >
      <div className="relative" style={{ aspectRatio: '16/10' }}>
        <img
          src={heroImgUrl(image, 480)}
          srcSet={heroSrcSet(image)}
          sizes="(min-width: 1024px) 45vw, 90vw"
          alt={title}
          width="480"
          height="300"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'auto'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div
          ref={overlayRef}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
        />
        {badge && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 text-gray-900 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
            {badge}
          </div>
        )}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 text-white">
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm opacity-90 line-clamp-2">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
});

PremiumCard.displayName = 'PremiumCard';

function PremiumCardSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <Link to="/themes">
            <PremiumCard
              image="v1768802259/main_background_theame_aqmriv.png"
              title="Pre-Designed Themes"
              subtitle="Explore 1000+ professionally crafted designs"
              badge="🎨 1000+ Designs"
              priority
            />
          </Link>
          <Link to="/customizer">
            <PremiumCard
              image="v1768802258/Customised_theam_my15vv.png"
              title="Custom Design"
              subtitle="Upload your photos and create unique mobile covers"
              badge="✨ Your Photos"
              priority
            />
          </Link>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: '🎯', text: 'Perfect Fit', desc: 'All Models' },
            { icon: '⚡', text: 'Quick Print', desc: '24-48 Hours' },
            { icon: '🛡️', text: 'Durable', desc: 'Long Lasting' },
            { icon: '🚚', text: 'Fast Ship', desc: 'India Wide' }
          ].map((feature, i) => (
            <div 
              key={i}
              className="text-center p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{feature.icon}</div>
              <div className="font-bold text-gray-900 text-xs sm:text-sm">{feature.text}</div>
              <div className="text-xs text-gray-600 hidden sm:block">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── India Trust Signals Section ──────────────────────────────────────────── */
function TrustSignals() {
  const signals = [
    { icon: '💵', title: 'Cash on Delivery', desc: 'COD available poore India mein' },
    { icon: '🚚', title: 'Free Delivery', desc: 'No hidden charges, free shipping' },
    { icon: '🇮🇳', title: 'Made in India', desc: 'Proudly designed & printed in India' },
    { icon: '📱', title: 'WhatsApp Support', desc: 'Instant reply on WhatsApp' },
    { icon: '🔄', title: '7-Day Easy Returns', desc: 'Hassle-free returns guaranteed' },
    { icon: '⭐', title: '4.8/5 Rating', desc: '50,000+ happy customers' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
          Why 50,000+ Indians Trust CoverGhar
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
          Premium quality covers at affordable prices — COD available! 🇮🇳
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {signals.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
              <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Popular Categories Section ───────────────────────────────────────────── */
function PopularCategories() {
  const categories = [
    { name: 'iPhone Covers', path: '/category/iphone', emoji: '🍎' },
    { name: 'Samsung Covers', path: '/category/samsung', emoji: '📱' },
    { name: 'OnePlus Covers', path: '/category/oneplus', emoji: '⚡' },
    { name: 'Xiaomi / Redmi', path: '/category/xiaomi', emoji: '🔥' },
    { name: 'Realme Covers', path: '/category/realme', emoji: '🎯' },
    { name: 'Vivo Covers', path: '/category/vivo', emoji: '✨' },
    { name: 'Oppo Covers', path: '/category/oppo', emoji: '💎' },
    { name: 'Custom Covers', path: '/customizer', emoji: '🎨' },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
          Shop by Phone Brand
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
          500+ phone models ke liye covers available hain — apna brand choose karo!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="group flex flex-col items-center p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Hinglish FAQ Section ─────────────────────────────────────────────────── */
const HOME_FAQS = [
  {
    question: 'Custom mobile cover kitne din mein deliver hota hai?',
    answer: 'CoverGhar ke custom covers 3-7 working days mein deliver ho jaate hain. Metro cities mein usually 3-4 din lagta hai. Order place hone ke baad tracking link WhatsApp pe mil jaayega.'
  },
  {
    question: 'Kya CoverGhar pe COD (Cash on Delivery) available hai?',
    answer: 'Haan! CoverGhar pe Cash on Delivery (COD) available hai poore India mein. Aap bina advance payment ke order kar sakte hain. UPI, Credit/Debit Card, Net Banking bhi available hai.'
  },
  {
    question: 'Cover ki quality kaisi hoti hai? Kitne din chalega?',
    answer: 'Humare covers premium TPU + polycarbonate materials se bane hain. HD UV printing technology use hoti hai jo scratch-resistant hai. Military-grade shockproof protection milta hai. 6 month warranty bhi dete hain quality pe.'
  },
  {
    question: 'Kaun kaun se phone models ke covers milte hain?',
    answer: 'Hum 500+ phone models support karte hain — iPhone 16/15/14/13, Samsung Galaxy S25/S24/A55, OnePlus 13/12/Nord, Redmi Note 14/13 Pro, Poco X6, Realme 12 Pro, Vivo V40, Oppo Reno 12, aur bahut saare aur models.'
  },
  {
    question: 'Apna photo kaise lagaye mobile cover pe?',
    answer: 'Bahut easy hai! Humari website pe "Design Your Cover" pe click karo, apna phone model choose karo, photo upload karo, preview dekho aur order karo — bas! 3 simple steps mein apna custom cover ready.'
  },
  {
    question: 'Return ya exchange kaise hota hai?',
    answer: '7-day easy return policy hai manufacturing defects ke liye. Agar cover mein koi defect hai toh WhatsApp pe photo bhejo aur hum replacement ya refund process kar denge. Custom designs non-returnable hain unless damaged.'
  },
];

function FAQSection() {
  return (
    <section className="py-10 sm:py-14 bg-gray-50">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
          Koi sawaal hai? Yahan check karo ya WhatsApp pe poocho! 💬
        </p>
        <div className="space-y-3">
          {HOME_FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-gray-600 leading-relaxed text-sm">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative text-white py-10 sm:py-16 overflow-hidden hero-gradient">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-3 sm:gap-4 justify-center">
          <Link
            to="/customizer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:from-yellow-300 hover:to-yellow-400 transition-colors shadow-lg min-h-[44px]"
          >
            <span>Design Your Cover</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 transition-colors border border-white/30 min-h-[44px]"
            >
              Browse Designs
            </Link>
            <a
              href="https://wa.me/7827205492?text=Hi%20%F0%9F%91%8B%20CoverGhar%20Team%2C%0A%0AI%20want%20to%20design%20a%20custom%20mobile%20cover.%0APlease%20guide%20me%20with%20designs%2C%20price%20%26%20delivery%20details%20%F0%9F%98%8A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:from-green-400 hover:to-emerald-400 transition-colors shadow-lg min-h-[44px]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              WhatsApp pe Order Karo
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center">
          {[
            { icon: '🛡️', text: 'Premium Quality' },
            { icon: '🚚', text: 'Free Delivery' },
            { icon: '⭐', text: '4.8/5 Rating' },
            { icon: '💵', text: 'COD Available' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">{item.icon}</span>
              <span className="text-xs sm:text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PremiumHero() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CoverGhar — Custom Mobile Covers Online India",
    "description": "Design apna custom mobile cover! Premium shockproof covers with HD printing. ₹199 se start. Free delivery all India. 1000+ designs. COD available.",
    "url": "https://www.coverghar.in",
    "mainEntity": {
      "@type": "Product",
      "name": "Custom Mobile Cover",
      "brand": { "@type": "Brand", "name": "CoverGhar" },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "199",
        "highPrice": "599",
        "availability": "https://schema.org/InStock",
        "offerCount": "1000+"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      }
    }
  };

  // Advanced schemas: Organization, WebSite, LocalBusiness, Navigation, FAQ, HowTo
  const advancedSchemas = [
    ...getHomePageSchemas(),
    generateFAQSchema(HOME_FAQS.map(f => ({ question: f.question, answer: f.answer }))),
    generateHowToSchema(),
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <SEO
        title="Custom Mobile Covers Online @₹199 | Design Your Phone Case — CoverGhar"
        description="Design apna custom mobile cover! 🔥 Premium shockproof covers with HD printing. ₹199 se start. Free delivery all India. 1000+ designs. COD available. iPhone, Samsung, OnePlus, Redmi sab ke liye!"
        keywords="custom mobile cover, personalized phone case, photo phone cover, design your own phone case, mobile cover online India, CoverGhar, custom phone case India, mobile back cover, buy mobile cover, phone case printing, shockproof mobile cover, printed mobile cover online, mobile cover under 200, naam wala cover, apna photo wala cover, mobile cover COD India, couple phone cases, anime phone case India"
        url="/"
        type="website"
        schema={homeSchema}
        additionalSchemas={advancedSchemas}
        imageAlt="CoverGhar - Custom Mobile Covers Online India - Design Your Own Phone Case"
        breadcrumbs={[{ name: 'Home', url: '/' }]}
      />
      {/* HERO SECTION — renders instantly, no API dependency */}
      <section className="relative text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-block">
                <span className="hero-badge">
                  ✨ Premium Quality Guaranteed
                </span>
              </div>
              <h1 className="hero-h1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Create Custom
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                  Mobile Covers
                </span>
                <br />
                <span className="block text-yellow-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Starting at ₹199
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Apna photo, apna design — sirf tumhara cover! Premium quality printing for 500+ phone models. Free delivery across India. COD available. 🇮🇳
              </p>
              
              {/* Mobile CTA buttons */}
              <div className="flex flex-col gap-3 mt-4 lg:hidden">
                <Link
                  to="/customizer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm min-h-[44px]"
                >
                  Design Your Cover
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm border border-white/30 min-h-[44px]"
                >
                  Browse Designs
                </Link>
              </div>
            </div>
            {/* Desktop CTA */}
            <div className="hidden lg:flex flex-col gap-4 items-center justify-center">
              <Link
                to="/customizer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                Design Your Cover
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30"
              >
                Browse Designs
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
            <path d="M0 60L60 52.5C120 45 240 30 360 22.5C480 15 600 15 720 18.75C840 22.5 960 30 1080 33.75C1200 37.5 1320 37.5 1380 37.5L1440 37.5V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <PremiumCardSection />
      <TrustSignals />
      <PopularCategories />
      <CTASection />
      <FAQSection />
    </div>
  );
}

export default PremiumHero;