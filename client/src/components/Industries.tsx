import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, FlaskConical, GraduationCap, TestTube } from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      icon: Building2,
      title: 'Pharmaceutical & Biotechnology',
      description: 'Supporting drug development, quality control, and manufacturing processes with reliable analytical solutions.',
      features: ['Drug Discovery', 'Quality Control', 'Method Development', 'Regulatory Compliance']
    },
    {
      icon: FlaskConical,
      title: 'Purification & Synthesis',
      description: 'Advanced purification technologies for chemical synthesis and compound isolation in research labs.',
      features: ['Flash Chromatography', 'Preparative HPLC', 'Sample Cleanup', 'Compound Isolation']
    },
    {
      icon: GraduationCap,
      title: 'Academic & Research',
      description: 'Comprehensive analytical solutions for universities and research institutions worldwide.',
      features: ['Research Projects', 'Educational Programs', 'Method Training', 'Technical Support']
    },
    {
      icon: TestTube,
      title: 'Analytical Testing',
      description: 'Precision instruments and consumables for analytical testing laboratories and service providers.',
      features: ['Sample Analysis', 'Method Validation', 'Trace Analysis', 'Routine Testing']
    }
  ];

  const handleIndustryClick = (industry: string) => {
    console.log(`Learn more about ${industry} solutions`);
  };

  return (
    <section className="py-16 bg-muted/30" id="industries">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="industries-title">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our core customers include leading organizations across pharmaceutical, biotechnology, 
            and analytical testing sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((industry, index) => (
            <Card 
              key={index} 
              className="hover-elevate cursor-pointer transition-all duration-300"
              onClick={() => handleIndustryClick(industry.title)}
              data-testid={`industry-card-${index}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <industry.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                </div>
                <p className="text-muted-foreground">{industry.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {industry.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Types */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">Trusted by Leading Organizations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg bg-card hover-elevate" data-testid="client-type-pharma">
              <div className="text-2xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Pharmaceutical Companies</div>
            </div>
            <div className="p-6 rounded-lg bg-card hover-elevate" data-testid="client-type-biotech">
              <div className="text-2xl font-bold text-primary mb-2">30+</div>
              <div className="text-sm text-muted-foreground">Biotech Firms</div>
            </div>
            <div className="p-6 rounded-lg bg-card hover-elevate" data-testid="client-type-academic">
              <div className="text-2xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Academic Institutions</div>
            </div>
            <div className="p-6 rounded-lg bg-card hover-elevate" data-testid="client-type-testing">
              <div className="text-2xl font-bold text-primary mb-2">75+</div>
              <div className="text-sm text-muted-foreground">Testing Laboratories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}