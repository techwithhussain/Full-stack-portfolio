import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star, Quote, MessageSquare } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import styles from './TestimonialsSection.module.css'

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Founder',
    company: 'Velo E-Commerce',
    platform: 'Upwork',
    rating: 5,
    text: "Hussain built a stunning WooCommerce store and set up an automated AI agent for our support. Our response time dropped to minutes, and sales grew by 25% in the first month. He is a genius!",
    avatar: 'SJ',
  },
  {
    name: 'Amit Sharma',
    role: 'CEO',
    company: 'WalnutWala',
    platform: 'Direct Client',
    rating: 5,
    text: "Hussain's SEO strategies are top-tier. He optimized our local search parameters and schema. Within 3 months, we ranked on the first page of Google for all target keywords. A true SEO authority.",
    avatar: 'AS',
  },
  {
    name: 'David Miller',
    role: 'Director',
    company: 'Nexus Creative Agency',
    platform: 'Fiverr',
    rating: 5,
    text: "Hussain delivered our agency portfolio ahead of schedule. The animations are clean, the page speed is flawless, and his communication was excellent throughout. Will hire again for sure.",
    avatar: 'DM',
  },
  {
    name: 'Elena Rostova',
    role: 'Marketing Lead',
    company: 'SaaSFlow',
    platform: 'LinkedIn',
    rating: 5,
    text: "We needed to automate our lead routing and sync it to our HubSpot CRM. Hussain set up custom n8n pipelines that worked flawlessly. He saved our marketing team over 15 hours a week.",
    avatar: 'ER',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-md">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            Client <span>Feedback</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Don't take my word for it. Here is what business owners and agency directors say about working with me.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, el: `.${styles.customPagination}` }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className={styles.swiperContainer}
          >
            {TESTIMONIALS.map((t, idx) => (
              <SwiperSlide key={idx} className={styles.slide}>
                <div className={`glass-card ${styles.testCard}`}>
                  <div className={styles.cardHeader}>
                    <div className={styles.ratingRow}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--clr-warning)" stroke="var(--clr-warning)" />
                      ))}
                    </div>
                    <span className={styles.platformBadge}>
                      {t.platform}
                    </span>
                  </div>

                  <Quote className={styles.quoteIcon} size={40} />
                  <p className={styles.testText}>{t.text}</p>

                  <div className={styles.cardFooter}>
                    <div className={styles.avatar}>
                      {t.avatar}
                    </div>
                    <div className={styles.meta}>
                      <h4 className={styles.clientName}>{t.name}</h4>
                      <p className={styles.clientRole}>
                        {t.role}, <span className="text-primary">{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination container */}
          <div className={styles.customPagination} />
        </div>
      </div>
    </section>
  )
}
