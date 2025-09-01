import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="home" className="min-h-screen flex items-center justify-center text-center">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Company Logo/Name */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-4">
            <span className="bg-gradient-brick bg-clip-text text-transparent">
              WIN
            </span>
          </h1>
          <p className="text-sand-light text-xl md:text-2xl font-medium tracking-wide">
            Brick Enterprise
          </p>
        </div>
        
        {/* Main Headline */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-primary">Precision.</span>{" "}
            <span className="text-accent">Strength.</span>{" "}
            <span className="text-sand-light">Lasting Quality.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in wire cut machine bricks — engineered for accuracy, strength, and a flawless finish. 
            Perfect for homes, commercial projects, and landmark constructions.
          </p>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => scrollToSection('products')}
            className="px-8 py-6 text-lg"
          >
            👉 Explore Our Bricks
          </Button>
          <Button 
            variant="cta" 
            size="lg" 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-6 text-lg"
          >
            Get a Quote
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-sand-light rounded-full flex justify-center">
            <div className="w-1 h-3 bg-sand-light rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </Section>
  );
};