import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Shield, Headphones, TrendingUp } from 'lucide-react';

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: CheckCircle,
      title: 'Comprehensive Portfolio',
      description: 'Complete range of high-performance chromatography consumables and analytical solutions under one roof.',
      highlight: 'All-in-One Solutions'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes and cost-effective solutions that meet international standards.',
      highlight: 'ISO Certified'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Commitment to customer support and service excellence with dedicated technical assistance.',
      highlight: '24/7 Support'
    },
    {
      icon: TrendingUp,
      title: 'Innovation Focus',
      description: 'Continuous innovation in laboratory water purification solutions and analytical technologies.',
      highlight: 'Future-Ready'
    }
  ];

  const handleContactUs = () => {
    console.log('Contact us clicked');
  };

  return (
    <section className="py-16" id="why-choose">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="why-choose-title">
            Why Utech Life
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At Utech Life, we believe in building long-term partnerships by delivering innovative 
            products, reliable solutions, and consistent technical support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {advantages.map((advantage, index) => (
            <Card key={index} className="hover-elevate text-center" data-testid={`advantage-card-${index}`}>
              <CardContent className="p-6">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                  {advantage.highlight}
                </div>
                <h3 className="font-semibold mb-3">{advantage.title}</h3>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Values */}
        <div className="bg-primary/5 rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Building Long-term Partnerships
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Innovative Products</h4>
                    <p className="text-sm text-muted-foreground">
                      Cutting-edge analytical solutions designed for modern laboratory needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Reliable Solutions</h4>
                    <p className="text-sm text-muted-foreground">
                      Proven track record of delivering consistent, high-quality products
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Technical Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Expert guidance and assistance throughout your analytical journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">99.8%</div>
                <div className="text-muted-foreground">Customer Satisfaction</div>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
              <button 
                onClick={handleContactUs}
                className="text-primary font-semibold hover:underline"
                data-testid="button-contact-partnership"
              >
                Start Your Partnership →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}