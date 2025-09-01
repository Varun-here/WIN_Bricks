import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: "📞",
      label: "Phone",
      value: "+91 8754309667",
      value: "+91 9965517595",
      value: "+91 9087214214",
      href: "tel:+918754309667"
    },
    {
      icon: "📧",
      label: "Email",
      value: "varunboom123@gmail.com",
      href: "mailto:varunboom123@gmail.com"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Palani",
      href: "#"
    }
  ];

  return (
    <Section id="contact" className="min-h-screen bg-transparent">
      <div className="text-center space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="text-primary">Build with Precision.</span><br />
            <span className="text-sand-light">Build with Strength.</span>
          </h2>
          
          <div className="h-1 w-40 bg-gradient-brick rounded-full mx-auto"></div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Get the finest wire cut machine bricks for your next project.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.href}
              className="glass-morphism p-8 rounded-2xl hover:scale-105 transition-all duration-300 group block"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              <div className="text-sm text-muted-foreground mb-2">{info.label}</div>
              <div className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {info.value}
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-6 pt-8">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => window.open('tel:+919944556060')}
            className="px-12 py-8 text-xl font-bold"
          >
            Request a Quote Today
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Ready to build something amazing? Let's discuss your project requirements.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-16 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-brick bg-clip-text text-transparent">
                WIN
              </div>
              <div className="text-sm text-muted-foreground">
                Brick Enterprise - Building Tomorrow's Foundations
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2024 WIN Brick Enterprise. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
