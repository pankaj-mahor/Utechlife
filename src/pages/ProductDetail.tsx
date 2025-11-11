import { useLocation, useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { Send, ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ id: string }>("/products/:id");
  const [queryDialogOpen, setQueryDialogOpen] = useState(false);
  const [queryForm, setQueryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const productId = params?.id;
  const product = productId
    ? products.find((p) => p.id === productId)
    : undefined;

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Button onClick={() => setLocation("/products")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSendQuery = () => {
    setQueryDialogOpen(true);
  };

  const handleQuerySubmit = () => {
    const message = `Hello Utech Life team,

I am interested in learning more about: ${product.name}

Name: ${queryForm.name}
Email: ${queryForm.email}
Phone: ${queryForm.phone}
Message: ${queryForm.message}`;

    const whatsappUrl = `https://wa.me/919810756453?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    setQueryForm({ name: "", email: "", phone: "", message: "" });
    setQueryDialogOpen(false);
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      all: "All Products",
      columns: "Columns",
      cartridges: "Cartridges",
      filters: "Filters",
      consumables: "Consumables",
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="border-b bg-muted/50">
          <div className="container mx-auto max-w-7xl px-6 py-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/products")}
              className="mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/600x600?text=Product+Image";
                    }}
                  />
                </div>
                {product.extras && product.extras.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.extras.map((extra, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={extra}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/150x150?text=Image";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="capitalize">
                      {getCategoryLabel(product.category)}
                    </Badge>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handleSendQuery}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Query
                  </Button>
                  {/* {product.external && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => window.open(product.external, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View External
                    </Button>
                  )} */}
                </div>

                {/* Additional Information Card */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Product Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium capitalize">
                          {getCategoryLabel(product.category)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Product ID:
                        </span>
                        <span className="font-medium">{product.id}</span>
                      </div>
                      {product.price !== null && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">
                            {typeof product.price === "number"
                              ? `₹${product.price.toLocaleString()}`
                              : product.price}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Query Dialog */}
      <Dialog open={queryDialogOpen} onOpenChange={setQueryDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Query - {product.name}</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="detail-name">Name *</Label>
              <Input
                id="detail-name"
                placeholder="Your name"
                value={queryForm.name}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="detail-email">Email *</Label>
              <Input
                id="detail-email"
                type="email"
                placeholder="your.email@example.com"
                value={queryForm.email}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="detail-phone">Phone *</Label>
              <Input
                id="detail-phone"
                type="tel"
                placeholder="+91 1234567890"
                value={queryForm.phone}
                onChange={(e) =>
                  setQueryForm({ ...queryForm, phone: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="detail-message">Message</Label>
              <Textarea
                id="detail-message"
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
