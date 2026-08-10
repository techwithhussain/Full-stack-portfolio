import SEOMeta from '@/components/common/SEOMeta'

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOMeta
        title="Privacy Policy · Tech With Hussain"
        description="Review the privacy policies and data collection guidelines for Tech With Hussain."
        canonical="/privacy-policy"
      />

      <div style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-text)', fontSize: 'var(--text-4xl)', marginBottom: '24px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--clr-text-muted)', marginBottom: '16px', fontSize: 'var(--text-base)' }}>
          Last updated: June 10, 2026
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--clr-text-muted)', lineHeight: '1.8' }}>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you fill out contact forms, submit project briefs, or subscribe to our newsletter. This includes your name, email address, phone number, budget range, and any files or details uploaded.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>2. How We Use Information</h2>
            <p>We use the collected information to respond to your inquiries, schedule discovery sessions, deliver services, process invoices, and send technical newsletter articles if you opted in.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>3. Data Storage & Cookies</h2>
            <p>Our server uses secure HTTP-only cookies to handle sessions. We do not store tokens or sensitive customer data inside local browser storage. We implement TLS encryption protocols on all data in transit.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>4. Third-Party Disclosures</h2>
            <p>We do not sell, rent, or trade your personal information to third parties. We use secure external hosting (Hostinger) and email servers (smtp.hostinger.com) to process inquiries.</p>
          </section>
        </div>
      </div>
    </>
  )
}