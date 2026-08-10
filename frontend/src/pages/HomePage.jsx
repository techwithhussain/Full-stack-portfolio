import SEOMeta from '@/components/common/SEOMeta'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SkillsSection from '@/components/home/SkillsSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ExperienceSection from '@/components/home/ExperienceSection'
import BlogPreview from '@/components/home/BlogPreview'
import ContactSection from '@/components/home/ContactSection'
import { personSchema, websiteSchema, localBusinessSchema } from '@/utils/schema'

export default function HomePage() {
  return (
    <>
      <SEOMeta
        title="Best Web Developer &amp; SEO Expert in J&amp;K"
        description="Top-rated web developer &amp; SEO expert in Srinagar, J&amp;K. Web development, SEO, Meta Ads &amp; digital marketing. Trusted by 30+ clients worldwide."
        canonical="/"
        schema={[personSchema(), websiteSchema(), localBusinessSchema()]}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <BlogPreview />
      <ContactSection />
    </>
  )
}
