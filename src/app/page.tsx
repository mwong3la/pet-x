import FeatureSection from "@/components/FeatureSection"
import ProductShowcase from "@/components/ProductShowcase"
import TechSpecs from "@/components/TechSpecs"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <FeatureSection
        title="Track. Monitor. Connect."
        description="Keep your pet safe and healthy with real-time location tracking, activity monitoring, and health insights—all in one elegant device."
        imageAlt="Smart pet collar"
        reverse={false}
        preferredFolder="military"
      />
      <ProductShowcase />
      <FeatureSection
        title="Built for adventure."
        description="Waterproof, durable, and designed to withstand whatever your pet gets into. With up to 30 days of battery life."
        imageAlt="Active dog wearing device"
        reverse={true}
        preferredFolder="military"
      />
      <TechSpecs />
    </div>
  )
}
