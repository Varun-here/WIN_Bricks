import { AnimatedBackground } from "@/components/AnimatedBackground";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
