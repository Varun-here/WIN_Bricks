import { Section } from "@/components/ui/section";

export const AboutSection = () => {
  return (
    <Section id="about" className="bg-surface/50 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-primary">Who</span>{" "}
            <span className="text-sand-light">We Are</span>
          </h2>
          
          <div className="h-1 w-20 bg-gradient-brick rounded-full"></div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are trusted providers of wire cut machine bricks, designed with cutting-edge technology 
            to deliver consistency and quality. Our bricks combine durability, precision, and a refined 
            appearance, making them the choice of builders, architects, and homeowners.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            We take pride in offering materials that form the foundation of strong and lasting structures. 
            Every brick tells a story of craftsmanship and engineering excellence.
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sand-light mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Quality Assured</div>
            </div>
          </div>
        </div>
        
        {/* Visual Element */}
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className="h-8 brick-texture rounded-sm animate-fade-in"
                style={{
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-surface-elevated/90 backdrop-blur-sm rounded-lg p-6 border border-border/20">
              <div className="text-2xl font-bold text-center text-primary">WIN</div>
              <div className="text-sm text-center text-muted-foreground">Quality Bricks</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};