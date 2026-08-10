import SEOMeta from '@/components/common/SEOMeta'

export default function TermsPage() {
  return (
    <>
      <SEOMeta
        title="Terms of Service · Tech With Hussain"
        description="Terms and conditions for using the services and platform of Tech With Hussain."
        canonical="/terms"
      />

      <div style={{ paddingTop: '160px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '24px', paddingRight: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-text)', fontSize: 'var(--text-4xl)', marginBottom: '24px' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--clr-text-muted)', marginBottom: '16px', fontSize: 'var(--text-base)' }}>
          Last updated: June 10, 2026
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--clr-text-muted)', lineHeight: '1.8' }}>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>1. Agreement to Terms</h2>
            <p>By accessing or using the Tech With Hussain website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, do not use our services.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>2. Service Scope</h2>
            <p>Services include but are not limited to: custom web development, AI automation pipelines, SEO audits and implementation, content creation, and performance optimization. All deliverables are agreed upon in writing before project commencement.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>3. Payment Terms</h2>
            <p>A 50% deposit is required before development begins. The remaining 50% is due upon project completion and client approval of the staging environment. Invoices are issued via email and must be paid within 7 days.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>4. Intellectual Property</h2>
            <p>Upon final payment, the client receives full ownership of all custom-built deliverables. Tech With Hussain retains the right to display completed projects in the portfolio unless an NDA specifically restricts this.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>5. Limitation of Liability</h2>
            <p>Tech With Hussain is not liable for indirect, incidental, or consequential damages arising from service usage. Maximum liability is limited to the total fees paid for the specific project in question.</p>
          </section>
          <section>
            <h2 style={{ color: 'var(--clr-text)', fontSize: 'var(--text-xl)', marginBottom: '12px' }}>6. Contact</h2>
            <p>For terms-related questions, email: lonezakir124@gmail.com</p>
          </section>
        </div>
      </div>
    </>
  )
}