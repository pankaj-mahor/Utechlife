import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Award, Users, Target } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: MapPin,
      title: 'Headquartered in Noida',
      description: 'Strategic location in India\'s technology hub for optimal service delivery'
    },
    {
      icon: Award,
      title: 'Quality & Reliability',
      description: 'Strong focus on quality assurance and reliable analytical solutions'
    },
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Dedicated to supporting research, development, and production needs'
    },
    {
      icon: Target,
      title: 'Industry Expertise',
      description: 'Specialized in pharmaceutical, biotechnology, and analytical laboratories'
    }
  ];

  return (
    <section className="py-16 bg-muted/30" id="about">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="about-title">
            About Utech Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Headquartered in Noida, India, Utech Life is a trusted provider of advanced Laboratory 
            Instruments, Chromatography Columns, and Laboratory Consumables.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              With a strong focus on quality, reliability, and customer-centric service, we aim to 
              support research, development, and production needs across pharmaceutical, biotechnology, 
              and analytical laboratories.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              At Utech Life, we believe in building long-term partnerships by delivering innovative 
              products, reliable solutions, and consistent technical support to our customers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate" data-testid={`feature-card-${index}`}>
                <CardContent className="p-6">
                  <feature.icon className="h-8 w-8 text-primary mb-3" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center" data-testid="stat-experience">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center" data-testid="stat-products">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Product Variants</div>
          </div>
          <div className="text-center" data-testid="stat-customers">
            <div className="text-3xl font-bold text-primary mb-2">200+</div>
            <div className="text-sm text-muted-foreground">Satisfied Customers</div>
          </div>
          <div className="text-center" data-testid="stat-countries">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Countries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
}