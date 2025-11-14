import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { phoneNumber } from "../utils/utils";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  const handleContactSubmit = () => {
    console.log("Contact message:", { email, message });
    setEmail("");
    setMessage("");
  };

  const productLinks = [
    "HPLC Columns",
    "UPLC Columns",
    "Flash Purification",
    "SPE Cartridges",
    "Syringe Filters",
    "Water Systems",
  ];

  const companyLinks = [
    "About Us",
    "Our Mission",
    "Quality Policy",
    "Careers",
    "News & Updates",
    "Certifications",
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-primary mb-4">
                <img
                  src={logo}
                  alt="Utech life logo"
                  // style={{
                  //   width: "150px",
                  //   height: "60px",
                  // }}
                  className="lg:w-56 w-40"
                />
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Trusted provider of advanced laboratory instruments,
                chromatography columns, and consumables for pharmaceutical and
                research institutions.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Noida, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>
                    +{phoneNumber}, <br /> +234 9093142520
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>sales@utechlife.com</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => console.log(`Navigate to ${link}`)}
                      data-testid={`footer-product-${link
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => console.log(`Navigate to ${link}`)}
                      data-testid={`footer-company-${link
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Form */}
            {/* <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-contact-email"
                    />
                    <textarea
                      placeholder="Your message"
                      className="w-full px-3 py-2 text-sm border rounded-md resize-none"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      data-testid="textarea-contact-message"
                    />
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={handleContactSubmit}
                      data-testid="button-send-message"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="py-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-1">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">Get the latest product updates and industry insights</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input 
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:w-64"
                data-testid="input-newsletter-email"
              />
              <Button onClick={handleSubscribe} data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="py-6 border-t text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Utech Life. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => console.log("Privacy Policy")}
                data-testid="link-privacy"
              >
                Privacy Policy
              </button>
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => console.log("Terms of Service")}
                data-testid="link-terms"
              >
                Terms of Service
              </button>
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => console.log("Cookie Policy")}
                data-testid="link-cookies"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
