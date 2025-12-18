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
        imageUrl="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Smart pet collar"
        reverse={false}
      />
      <ProductShowcase />
      <FeatureSection
        title="Built for adventure."
        description="Waterproof, durable, and designed to withstand whatever your pet gets into. With up to 30 days of battery life."
        imageUrl="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Active dog wearing device"
        reverse={true}
      />
      <TechSpecs />
    </div>
  )
}
