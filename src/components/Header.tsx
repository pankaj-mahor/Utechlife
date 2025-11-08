import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../assets/logo.png";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const productCategories = [
    "HPLC Columns",
    "UPLC Columns",
    "Flash Purification Columns",
    "SPE Cartridges",
    "Syringe Filters",
    "Vials",
    "HPLC Tubings",
    "Water Purification Systems",
  ];

  const handleNavClick = (section: string) => {
    console.log(`Navigating to ${section}`);
    setIsOpen(false);
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto max-w-7xl lg:px-6 px-4">
        <div className="flex py-2 lg:py-3 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-xl font-semibold text-primary"
              data-testid="logo"
            >
              <img
                src={logo}
                alt="Utechlife logo"
                //  className="lg:w-[244px] lg:h-[72px]"
                className="lg:w-56 w-40"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium hover:text-primary transition-colors ${
                location === "/" ? "text-primary" : ""
              }`}
              data-testid="nav-home"
            >
              Home
            </Link>
            {/* <button
              onClick={() => handleNavClick("about")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About Us
            </button> */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center text-sm font-medium hover:text-primary transition-colors ${
                  location.startsWith("/products") ? "text-primary" : ""
                }`}
                data-testid="nav-products"
              >
                Products <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    setLocation("/products");
                    setIsOpen(false);
                  }}
                  data-testid="product-all"
                >
                  All Products
                </DropdownMenuItem>
                {productCategories.map((product) => (
                  <DropdownMenuItem
                    key={product}
                    onClick={() => handleNavClick(product)}
                    data-testid={`product-${product
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {product}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <button
              onClick={() => handleNavClick("industries")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-industries"
            >
              Industries
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button> */}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <a
              href="https://wa.me/919810756453?send?text=I want to know more about it"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-quote"
            >
              <Button>Get Quote</Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-mobile-menu"
              >
                <Menu
                  className="h-12 w-12"
                  style={{
                    transform: "scale(1.5)",
                  }}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/"
                  className={`text-left text-lg font-medium py-2 ${
                    location === "/" ? "text-primary" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                  data-testid="mobile-nav-home"
                >
                  Home
                </Link>
                {/* <button
                  onClick={() => handleNavClick("about")}
                  className="text-left text-lg font-medium py-2"
                  data-testid="mobile-nav-about"
                >
                  About Us
                </button> */}
                <div className="space-y-2">
                  <p className="text-lg font-medium py-2">Products</p>
                  <div className="pl-4 space-y-2">
                    <button
                      onClick={() => {
                        setLocation("/products");
                        setIsOpen(false);
                      }}
                      className={`block text-left hover:text-foreground py-1 ${
                        location.startsWith("/products")
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                      data-testid="mobile-product-all"
                    >
                      All Products
                    </button>
                    {productCategories.map((product) => (
                      <button
                        key={product}
                        onClick={() => handleNavClick(product)}
                        className="block text-left text-muted-foreground hover:text-foreground py-1"
                        data-testid={`mobile-product-${product
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
                {/* <button
                  onClick={() => handleNavClick("industries")}
                  className="text-left text-lg font-medium py-2"
                  data-testid="mobile-nav-industries"
                >
                  Industries
                </button>
                <button
                  onClick={() => handleNavClick("contact")}
                  className="text-left text-lg font-medium py-2"
                  data-testid="mobile-nav-contact"
                >
                  Contact
                </button> */}
                <div className="hidden md:flex">
                  <a
                    href="https://wa.me/919810756453"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="button-quote"
                  >
                    <Button
                      onClick={() => handleNavClick("quote")}
                      className="mt-4"
                      data-testid="mobile-button-quote"
                    >
                      Get Quote
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
