import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { products } from "@/data/products";
import heroImage from "@assets/generated_images/Laboratory_hero_image_920b5f7e.png";
import { Eye, Send } from "lucide-react";
import { phoneNumber } from "../utils/utils";
const categories = [
  { value: "all", label: "All Products" },
  { value: "columns", label: "Columns" },
  { value: "cartridges", label: "Cartridges" },
  { value: "filters", label: "Filters" },
  { value: "consumables", label: "Consumables" },
];

export default function Products() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [queryDialogOpen, setQueryDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [queryForm, setQueryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleViewDetails = (productId: string) => {
    setLocation(`/products/${productId}`);
  };

  const handleSendQuery = (product: (typeof products)[0]) => {
    setSelectedProduct(product);
    setQueryDialogOpen(true);
  };

  const handleQuerySubmit = () => {
    // Create WhatsApp message
    const message = `Hello Utech Life team,

I am interested in learning more about: ${selectedProduct?.name}

Name: ${queryForm.name}
Email: ${queryForm.email}
Phone: ${queryForm.phone}
Message: ${queryForm.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    // Reset form and close dialog
    setQueryForm({ name: "", email: "", phone: "", message: "" });
    setQueryDialogOpen(false);
    setSelectedProduct(null);
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Banner Section */}
        <section className="relative h-[50vh] lg:h-[40vh] min-h-[400px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          <div className="relative z-10 container mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Our <span className="text-primary-foreground">Products</span>
              </h1>
              <p className="text-md md:text-xl text-gray-200 leading-relaxed">
                Discover our comprehensive range of high-performance laboratory
                equipment and consumables designed for precision and
                reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-7xl px-6">
            {/* Category Tabs */}
            <div className="mb-8">
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <TabsList className="flex flex-wrap h-auto gap-2">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="px-4 py-2"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="flex flex-col hover-elevate transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x300?text=Product+Image";
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <Badge variant="secondary" className="capitalize">
                        {getCategoryLabel(product.category)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {product.desc}
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleViewDetails(product.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleSendQuery(product)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Query
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Query Dialog */}
      <Dialog open={queryDialogOpen} onOpenChange={setQueryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Query - {selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={queryForm.name}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={queryForm.email}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 1234567890"
                value={queryForm.phone}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, phone: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message or inquiry..."
                rows={4}
                value={queryForm.message}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, message: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setQueryDialogOpen(false);
                setQueryForm({ name: "", email: "", phone: "", message: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleQuerySubmit}
              disabled={!queryForm.name || !queryForm.email || !queryForm.phone}
            >
              Send via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
