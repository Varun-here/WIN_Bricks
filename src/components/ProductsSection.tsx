import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const ProductsSection = () => {
  const features = [
    {
      icon: "🔨",
      title: "High Durability",
      description: "Built to withstand time and weather conditions"
    },
    {
      icon: "✨",
      title: "Smooth Finish",
      description: "Machine-cut for uniformity and elegance"
    },
    {
      icon: "🏗️",
      title: "Versatile Use",
      description: "Ideal for homes, commercial complexes, and industrial projects"
    },
    {
      icon: "🌱",
      title: "Eco-Friendly Options",
      description: "Manufactured with sustainable practices"
    }
  ];

  const benefits = [
    {
      title: "Perfect Shape & Size",
      description: "Precision cutting ensures easy construction and neat walls"
    },
    {
      title: "Stronger Bonding",
      description: "Uniform edges allow for better mortar adhesion"
    },
    {
      title: "Cost-Effective",
      description: "Faster construction saves time and labor"
    },
    {
      title: "Modern Appeal",
      description: "Smooth finish adds beauty, even without plastering"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="products" className="bg-surface-elevated/30">
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-primary">Our Wire Cut</span>{" "}
            <span className="text-sand-light">Machine Bricks</span>
          </h2>
          <div className="h-1 w-32 bg-gradient-brick rounded-full mx-auto"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Engineered for precision, designed for excellence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-morphism p-6 rounded-xl hover:scale-105 transition-transform duration-300 text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="bg-surface/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-border/20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-accent">Why Choose</span>{" "}
            <span className="text-primary">Wire Cut Machine Bricks?</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 group"
              >
                <div className="w-3 h-3 bg-gradient-brick rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">{benefit.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToContact}
              className="px-10 py-6 text-lg"
            >
              Get Your Quote Today
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};