import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Beaker, Droplets, Filter } from 'lucide-react';
import chromatographyImage from '@assets/generated_images/Chromatography_equipment_product_126a938d.png';
import consumablesImage from '@assets/generated_images/Laboratory_consumables_products_1cb1d2c8.png';
import waterSystemsImage from '@assets/generated_images/Water_purification_systems_9edfe2fb.png';

export default function ProductPortfolio() {
  const productCategories = [
    {
      title: 'Chromatography Solutions',
      icon: Beaker,
      image: chromatographyImage,
      description: 'High-performance chromatography columns and separation solutions for analytical and preparative applications.',
      products: ['HPLC Columns', 'UPLC Columns', 'Flash Purification Columns', 'SPE Cartridges'],
      featured: true
    },
    {
      title: 'Laboratory Consumables',
      icon: Filter,
      image: consumablesImage,
      description: 'Essential laboratory supplies and consumables for daily analytical operations and sample preparation.',
      products: ['Syringe Filters', 'Vials', 'HPLC Tubings', 'Sample Containers'],
      featured: false
    },
    {
      title: 'Water Purification Systems',
      icon: Droplets,
      image: waterSystemsImage,
      description: 'Type I & Type II water systems for critical laboratory applications requiring ultra-pure water.',
      products: ['Type I Water Systems', 'Type II Water Systems', 'Filtration Units', 'Monitoring Systems'],
      featured: false
    }
  ];

  const handleLearnMore = (category: string) => {
    console.log(`Learn more about ${category}`);
  };

  const handleViewAll = () => {
    console.log('View all products');
  };

  return (
    <section className="py-16" id="products">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="products-title">
            Our Product Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We bring a wide range of products to cater to the evolving needs of scientists, 
            researchers, and quality professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {productCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`hover-elevate transition-all duration-300 ${category.featured ? 'ring-2 ring-primary/20' : ''}`}
              data-testid={`product-category-${index}`}
            >
              {category.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                    data-testid={`product-image-${index}`}
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                
                <div className="space-y-2 mb-6">
                  {category.products.map((product, productIndex) => (
                    <div key={productIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-sm">{product}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group"
                  onClick={() => handleLearnMore(category.title)}
                  data-testid={`button-learn-more-${index}`}
                >
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleViewAll}
            data-testid="button-view-all-products"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}