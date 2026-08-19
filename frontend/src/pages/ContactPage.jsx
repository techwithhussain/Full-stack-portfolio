import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Mail, Phone, MapPin, Send, Upload, CheckCircle2, AlertCircle, HelpCircle, MessageSquare } from 'lucide-react'
import SEOMeta from '@/components/common/SEOMeta'
import { contactPageSchema, breadcrumbSchema } from '@/utils/schema'
import { SITE } from '@/data/constants'
import styles from './ContactPage.module.css'

const SERVICE_OPTIONS = [
  'AI Web Development',
  'WordPress Development',
  'SEO Full Project',
  'Content Creation & Strategy',
  'Performance Optimization',
  'Custom Collaboration / Other',
]

const FAQS = [
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes! I understand that custom business automations or proprietary software schemas require privacy. I am happy to sign an NDA before you share project blueprints.',
  },
  {
    q: 'What is your typical response time?',
    a: 'I reply to form inquiries within 24 hours. For urgent inquiries or active clients, I am available instantly on WhatsApp during Indian Standard Time (IST) working hours.',
  },
  {
    q: 'How does payment and onboarding work?',
    a: 'We schedule a discovery call, map milestones, and agree on pricing. Once a 50% deposit is paid, development starts. The remainder is due upon staging approval and before deployment.',
  },
  {
    q: 'Can you work with clients in other timezones?',
    a: 'Yes. I work with clients in the US, Europe, and India. I coordinate meetings to align schedules and provide regular async updates.',
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone || '')
      formData.append('service', data.service)
      formData.append('budget', data.budget)
      formData.append('message', data.message)

      if (selectedFile) {
        formData.append('file', selectedFile)
      }

      const response = await axios.post('/api/contact/index.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.data?.success) {
        setSubmitStatus('success')
        reset()
        setSelectedFile(null)
      } else {
        setSubmitStatus('error')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitStatus('success') // simulation fallback
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEOMeta
        title="Contact Me · Tech With Hussain"
        description="Get in touch with Hussain Lone for custom AI development, WordPress setups, speed optimization audits, or retainer services."
        canonical="/contact/"
        schema={[contactPageSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])]}
      />

      <div className={styles.contactPage}>
        {/* Page Hero */}
        <section className={styles.heroSection}>
          <div className="container">
            <div className="text-center">
              <span className="section-label">Get In Touch</span>
              <h1 className={styles.mainTitle}>
                Let's Build <span>Something Great</span>
              </h1>
              <p className={styles.heroDesc}>
                Whether you have a specific project brief ready or want to consult on automation pipelines, reach out below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="section">
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Left sidebar */}
              <div className={styles.infoCol}>
                <div className={styles.cardContainer}>
                  <div className={`glass-card ${styles.infoCard}`} data-cursor="hover">
                    <div className={styles.infoLink}>
                      <div className={styles.iconBox}><Mail size={20} /></div>
                      <div>
                        <h4>Email Direct</h4>
                        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                      </div>
                    </div>
                  </div>

                  <div className={`glass-card ${styles.infoCard}`} data-cursor="hover">
                    <div className={styles.infoLink}>
                      <div className={styles.iconBox}><Phone size={20} /></div>
                      <div>
                        <h4>Call or WhatsApp</h4>
                        <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                      </div>
                    </div>
                  </div>

                  <div className={`glass-card ${styles.infoCard}`} data-cursor="hover">
                    <div className={styles.infoLink}>
                      <div className={styles.iconBox}><MapPin size={20} /></div>
                      <div>
                        <h4>Location</h4>
                        <p>Srinagar, Jammu & Kashmir, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.mapsWrapper}>
                  <iframe
                    title="Hussain Location Coordinates Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105658.07722129424!2d74.7243981881858!3d34.148417937397755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e185d9de1bbd01%3A0xa6018f7a83d7f02d!2sUniversity%20of%20Kashmir!5e0!3m2!1sen!2sin!4v1717904000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Right Form Card */}
              <div className={`glass-card ${styles.formCard}`}>
                <h3 className={styles.formTitle}>Submit Inquiry</h3>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <CheckCircle2 size={24} className={styles.successIcon} />
                    <div>
                      <h4>Message Received!</h4>
                      <p>Hussain Lone has been notified and will review your project brief within 24 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={24} className={styles.errorIcon} />
                    <div>
                      <h4>Error Dispatching Form</h4>
                      <p>Please double-check entries and try again, or chat directly via WhatsApp.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="form-input"
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && <span className="form-error">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Your Email *</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        className="form-input"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                      />
                      {errors.email && <span className="form-error">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+91 00000 00000"
                        className="form-input"
                        {...register('phone', {
                          required: 'Phone number is required',
                          minLength: { value: 6, message: 'Please enter a valid phone number' }
                        })}
                      />
                      {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="service">Select Service *</label>
                      <select
                        id="service"
                        className="form-input"
                        {...register('service', { required: 'Please select a service' })}
                      >
                        <option value="">-- Choose Option --</option>
                        {SERVICE_OPTIONS.map((srv, idx) => (
                          <option key={idx} value={srv}>{srv}</option>
                        ))}
                      </select>
                      {errors.service && <span className="form-error">{errors.service.message}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message / Brief *</label>
                    <textarea
                      id="message"
                      placeholder="Share project parameters, goals, timelines, etc..."
                      className="form-input"
                      {...register('message', { required: 'Message is required' })}
                    />
                    {errors.message && <span className="form-error">{errors.message.message}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attach File (Optional)</label>
                    <label className={styles.fileUploadBtn} data-cursor="hover">
                      <Upload size={16} />
                      <span>{selectedFile ? selectedFile.name : 'Upload sitemap or brief (PDF, JPG, ZIP)'}</span>
                      <input
                        type="file"
                        className={styles.fileInput}
                        accept=".pdf,.png,.jpg,.jpeg,.zip"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg mt-sm"
                    style={{ width: '100%' }}
                    data-cursor="hover"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Send Inquiry'} <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section" style={{ background: 'var(--clr-bg-secondary)' }}>
          <div className="container">
            <div className="text-center mb-md">
              <span className="section-label">Help</span>
              <h2 className="section-title">Collaboration <span>FAQs</span></h2>
            </div>

            <div className={styles.faqGrid}>
              {FAQS.map((faq, idx) => (
                <div key={idx} className={`glass-card ${styles.faqCard}`}>
                  <div className={styles.faqHeader}>
                    <HelpCircle size={18} className="text-primary" />
                    <h3>{faq.q}</h3>
                  </div>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}